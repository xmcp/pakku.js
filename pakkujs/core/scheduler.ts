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
import {protoapi_get_prefetch, ProtobufIngressSeg, ProtobufPrefetchObj} from "../protocol/interface_protobuf";

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

let _throttle_timer: null | ReturnType<typeof setTimeout> = null;
let _throttle_fn: null | (()=>void) = null;
function perform_throttle(fn: ()=>void) {
    if(_throttle_timer)
        _throttle_fn = fn;
    else {
        fn();
        _throttle_timer = setTimeout(()=>{
            _throttle_timer = null;
            if(_throttle_fn) {
                _throttle_fn();
                _throttle_fn = null;
            }
        }, 100);
    }
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

    prefetch_data: ProtobufPrefetchObj | null;

    constructor(ingress: Ingress, config: LocalizedConfig, tabid: int) {
        this.ingress = ingress;
        this.egresses = [];
        this.config = config;
        this.stats = new MessageStats('message', '', '');
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
        this.prefetch_data = null;
    }

    write_failing_stats(prompt: string, e: Error, badge: string) {
        let msg = `${prompt}\n${e.message}\n\nStacktrace:\n${e.stack}\n\nIngress:\n${JSON.stringify(this.ingress)}`;
        this.stats = new MessageStats('error', badge, msg).notify(this.tabid);

        console.error('pakku scheduler: GOT EXCEPTION', e);

        this.failed = true;
        this.try_serve_egress();
    }

    write_cur_message_stats() {
        const throttled = ()=>{
            if(this.stats.type==='message') { // skip if error or done
                let status_line = this.num_chunks ? '正在处理弹幕' : '正在下载弹幕';
                let num_finished = this.chunks_out.size;
                let num_combine_started = this.combine_started.size;
                let num_downloaded = this.chunks_in.size;

                let badge = this.num_chunks ? BADGE_PROCESSING : BADGE_DOWNLOADING;
                let prompt = `${status_line}（${num_finished}/${num_combine_started}/${num_downloaded}）`;

                this.stats = new MessageStats('message', badge, prompt).notify(this.tabid);
            }
        };

        perform_throttle(throttled);
    }

    add_egress(egress: Egress, callback: (resp: AjaxResponse)=>void) {
        console.log('pakku scheduler: route ingress =', this.ingress, 'egress =', egress);
        this.egresses.push([egress, callback]);
        this.try_serve_egress();
    }

    async try_start_combine(segidx: int) {
        if(this.failed)
            return;
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
        if(this.failed)
            return;
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

        this.chunks_out.set(segidx, chunk_out);

        console.log('pakku scheduler: got chunks out', segidx, chunk_out.objs.length);
        this.write_cur_message_stats();

        this.try_serve_egress();
    }

    try_serve_egress() {
        if(this.failed) {
            for(let [egress, callback] of this.egresses) {
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
        this.write_cur_message_stats();
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
                this.write_cur_message_stats();

                void this.try_start_combine(idx-1);
                void this.try_start_combine(idx);
            }, this.prefetch_data);
        } catch(e) {
            this.write_failing_stats('下载弹幕时出错', e as Error, BADGE_ERR_NET);
            return;
        }

        this.num_chunks = this.chunks_in.size;

        this.ongoing_stats.download_time_ms = +new Date() - this.start_ts;
        console.log('pakku scheduler: download finished, total chunks =', this.num_chunks);
        this.write_cur_message_stats();

        void this.try_start_combine(this.num_chunks);

        this.clusters.set(0, {clusters: [], stats: new Stats()}); // pad a pseudo cluster before the first one for the `prev_clusters` arg
        void this.try_start_postproc(1);
    }
}
let schedulers: Array<Scheduler> = [];
export let last_scheduler: null | Scheduler = null;

function ingress_equals(a: Ingress, b: Ingress): boolean {
    // @ts-ignore
    return Object.keys(a).filter(k => k!=='is_magicreload').every(k => a[k] === b[k]);
}

export function handle_task(ingress: Ingress, egress: Egress, callback: (resp: AjaxResponse)=>void, config: LocalizedConfig, tabid: int) {
    for(let scheduler of schedulers)
        if(ingress_equals(scheduler.ingress, ingress)) {
            last_scheduler = scheduler;

            scheduler.config = config;
            scheduler.add_egress(egress, callback);

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

export function handle_proto_view(ingress: ProtobufIngressSeg, view_url: string, config: LocalizedConfig, tabid: int): Promise<ArrayBuffer> {
    for(let scheduler of schedulers)
        if(ingress_equals(scheduler.ingress, ingress)) {
            last_scheduler = scheduler;

            scheduler.config = config;

            if(!scheduler.prefetch_data)
                scheduler.prefetch_data = protoapi_get_prefetch(ingress, view_url);

            return scheduler.prefetch_data.view;
        }

    let scheduler = new Scheduler(ingress, config, tabid);
    last_scheduler = scheduler;

    scheduler.prefetch_data = protoapi_get_prefetch(ingress, view_url);
    void scheduler.start();

    schedulers.push(scheduler);
    if(schedulers.length>MAX_SCHEDULERS_PER_PAGE)
        schedulers.shift();

    return scheduler.prefetch_data.view;
}