import {WorkerPool} from "./worker_pool";
import {Egress, Ingress, perform_egress, perform_ingress} from "../protocol/interface";
import {
    AjaxResponse,
    DanmuChunk,
    DanmuClusterOutput,
    DanmuObject, DanmuObjectRepresentative,
    int,
    LocalizedConfig,
    MessageStats,
    MissingData,
    Stats
} from "./types";
import {post_combine} from "./post_combine";
import {UserscriptWorker} from "./userscript";
import {do_inject} from "../injected/do_inject";

const MAX_SCHEDULERS_PER_PAGE = 3;

const BADGE_DOWNLOADING = '↓';
const BADGE_PROCESSING = '...';
const BADGE_ERR_NET = 'NET!';
const BADGE_ERR_JS = 'JS!';

function _filter_aslongas<T>(x: Array<T>, fn: (x: T)=>boolean): Array<T> {
    let i = 0;
    while(i<x.length && fn(x[i]))
        i++;
    return x.slice(0, i);
}

class Scheduler {
    ingress: Ingress;
    egresses: Array<[Egress, (resp: AjaxResponse)=>void]>;
    config: LocalizedConfig;

    stats: Stats | MessageStats;
    ongoing_stats: Stats;
    tabid: int;
    start_ts: number;

    chunks_in: Map<int, DanmuChunk<DanmuObject>>;
    clusters: Map<int, DanmuClusterOutput>;
    chunks_out: Map<int, DanmuChunk<DanmuObjectRepresentative>>;

    num_chunks: int;
    combine_started: Set<int>;
    failed: boolean;
    pool: WorkerPool;
    userscript: UserscriptWorker | null;

    constructor(ingress: Ingress, config: LocalizedConfig, tabid: int) {
        this.ingress = ingress;
        this.egresses = [];
        this.config = config;
        this.stats = new MessageStats('message', BADGE_DOWNLOADING, '正在下载弹幕文件').notify(tabid);
        this.ongoing_stats = new Stats();
        this.tabid = tabid;
        this.start_ts = 0;
        this.chunks_in = new Map();
        this.clusters = new Map();
        this.chunks_out = new Map();
        this.num_chunks = 0;
        this.combine_started = new Set();
        this.failed = false;
        this.pool = new WorkerPool(config.COMBINE_THREADS);
        this.userscript = config.USERSCRIPT ? new UserscriptWorker(config.USERSCRIPT) : null;
    }

    write_failing_stats(prompt: string, e: Error, badge: string) {
        let msg = `${prompt}\n${e.message}\n\nStacktrace:\n${e.stack}\n\nIngress:\n${JSON.stringify(this.ingress)}`;
        this.stats = new MessageStats('error', badge, msg).notify(this.tabid);

        console.error('pakku scheduler: GOT EXCEPTION', e);

        this.failed = true;
        this.try_serve_egress();
    }

    add_egress(egress: Egress, callback: (resp: AjaxResponse)=>void) {
        console.log('pakku scheduler: route ingress =', this.ingress, 'egress =', egress);
        this.egresses.push([egress, callback]);
        this.try_serve_egress();
    }

    async try_start_combine(segidx: int) {
        if(this.combine_started.has(segidx))
            return; // working or finished

        let chunk = this.chunks_in.get(segidx);
        let next_chunk = segidx===this.num_chunks ? {objs: [], extra: {}} : this.chunks_in.get(segidx+1);
        if(!chunk || !next_chunk)
            return; // not ready

        this.combine_started.add(segidx);

        let max_next_time = chunk.objs.length ? chunk.objs[chunk.objs.length-1].time_ms + 1000 * this.config.THRESHOLD : 0;
        let next_chunk_filtered = {
            objs: _filter_aslongas(next_chunk.objs, obj => obj.time_ms < max_next_time),
            extra: next_chunk.extra,
        };

        let res: DanmuClusterOutput;
        try {
            res = await this.pool.exec([chunk as DanmuChunk<DanmuObject>, next_chunk_filtered as DanmuChunk<DanmuObject>, this.config as LocalizedConfig]);
        } catch(e) {
            this.write_failing_stats(`合并分片 ${segidx} 时出错`, e as Error, BADGE_ERR_JS);
            return;
        }

        console.log('pakku scheduler: got combine result', segidx, res.clusters.length);
        this.clusters.set(segidx, res);
        this.ongoing_stats.update_from(res.stats);

        void this.try_start_postproc(segidx);
        void this.try_start_postproc(segidx+1);
    }

    async try_start_postproc(segidx: int) {
        if(this.chunks_out.has(segidx))
            return; // finished

        let chunk = this.chunks_in.get(segidx);
        let clusters = this.clusters.get(segidx);
        let prev_clusters = this.clusters.get(segidx-1);
        if(!clusters || !prev_clusters)
            return; // not ready

        let chunk_out;
        try {
            chunk_out = post_combine(clusters, prev_clusters, chunk!, this.config, this.ongoing_stats);
        } catch(e) {
            this.write_failing_stats(`后处理分片 ${segidx} 时出错`, e as Error, BADGE_ERR_JS);
            return;
        }

        if(this.userscript && this.userscript.n_after) {
            try {
                chunk_out = await this.userscript.exec({type: 'pakku_after', chunk: chunk_out}) as any;
                this.userscript.sancheck_output(chunk_out);
            } catch(e) {
                this.write_failing_stats(`处理分片 ${segidx} 后执行用户脚本时出错`, e as Error, BADGE_ERR_JS);
                return;
            }
        }

        console.log('pakku scheduler: got chunks out', segidx, chunk_out.objs.length);
        this.chunks_out.set(segidx, chunk_out);

        this.try_serve_egress();
    }

    try_serve_egress() {
        if(this.failed) {
            for(let [efress, callback] of this.egresses) {
                callback(null);
            }
            this.egresses = [];
            return;
        }

        if(this.num_chunks && this.num_chunks===this.chunks_out.size)
            this.do_cleanup();

        this.egresses = this.egresses.filter(([egress, callback]) => {
            let res = perform_egress(egress, this.num_chunks, this.config.GLOBAL_SWITCH ? this.chunks_out : this.chunks_in);

            if(res===MissingData)
                return true; // keep in queue
            else {
                console.log('pakku scheduler: served egress', egress);
                callback({data: res});
                return false; // remove from queue
            }
        });
    }

    finish() {
        console.log('pakku scheduler: all finished');

        this.ongoing_stats.parse_time_ms = +new Date() - this.start_ts - this.ongoing_stats.download_time_ms;
        this.ongoing_stats.notify(this.tabid, this.config);
        this.stats = this.ongoing_stats;

        if(this.config.GLOBAL_SWITCH && !this.config.SKIP_INJECT) {
            setTimeout(()=>{
                do_inject(this.chunks_out, this.config);
            }, 150); // delay ui injection to improve player responsiveness
        }
    }

    do_cleanup() {
        if(this.stats.type==='message') {
            this.finish();
        }
        this.pool.terminate();
        this.clusters.clear(); // to free some RAM
    }

    async start() {
        await this.pool.spawn();

        if(this.userscript) {
            try {
                await this.userscript.init();
            } catch(e) {
                this.write_failing_stats('初始化用户脚本时出错', e as Error, BADGE_ERR_JS);
                return;
            }
        }

        this.start_ts = +new Date();
        try {
            await perform_ingress(this.ingress, async (idx, chunk) => {
                console.log('pakku scheduler: got ingress chunk', idx, chunk.objs.length);

                if(this.userscript && this.userscript.n_before) {
                    try {
                        chunk = await this.userscript.exec({type: 'pakku_before', chunk: chunk}) as any;
                        this.userscript.sancheck_output(chunk);
                    } catch(e) {
                        this.write_failing_stats(`处理分片 ${idx} 前执行用户脚本时出错`, e as Error, BADGE_ERR_JS);
                        return;
                    }
                }

                chunk.objs.sort((a, b) => a.time_ms - b.time_ms);
                this.chunks_in.set(idx, chunk);
                this.ongoing_stats.num_total_danmu += chunk.objs.length;

                void this.try_start_combine(idx-1);
                void this.try_start_combine(idx);
            });
        } catch(e) {
            this.write_failing_stats('下载弹幕时出错', e as Error, BADGE_ERR_NET);
            return;
        }

        this.num_chunks = this.chunks_in.size;

        this.ongoing_stats.download_time_ms = +new Date() - this.start_ts;
        console.log('pakku scheduler: download finished, total chunks =', this.num_chunks);
        if(this.stats.type!=='error')
            this.stats = new MessageStats('message', BADGE_PROCESSING, '正在处理弹幕').notify(this.tabid);

        void this.try_start_combine(this.num_chunks);

        this.clusters.set(0, {clusters: [], stats: new Stats()}); // pad a pseudo cluster before the first one for the `prev_clusters` arg
        void this.try_start_postproc(1);
    }
}
let schedulers: Array<Scheduler> = [];
export let last_scheduler: null | Scheduler = null;

function ingress_equals(a: Ingress, b: Ingress): boolean {
    // @ts-ignore
    return Object.keys(a).every(k => a[k] === b[k]);
}

export function handle_task(ingress: Ingress, egress: Egress, callback: (resp: AjaxResponse)=>void, config: LocalizedConfig, tabid: int) {
    for(let scheduler of schedulers)
        if(ingress_equals(scheduler.ingress, ingress)) {
            scheduler.config = config;
            scheduler.add_egress(egress, callback);

            last_scheduler = scheduler;
            return;
        }

    let scheduler = new Scheduler(ingress, config, tabid);
    last_scheduler = scheduler;

    scheduler.add_egress(egress, callback);
    void scheduler.start();

    schedulers.push(scheduler);
    if(schedulers.length>MAX_SCHEDULERS_PER_PAGE)
        schedulers.shift();
}