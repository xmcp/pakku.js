import {WorkerPool} from "./worker_pool";
import {Egress, Ingress, perform_egress, perform_ingress} from "../protocol/interface";
import {
    AjaxResponse, AnyObject,
    DanmuChunk, DanmuCluster,
    DanmuClusterOutput,
    DanmuObject, DanmuObjectDeleted, DanmuObjectRepresentative,
    int,
    LocalizedConfig,
    MessageStats,
    MissingData,
    Stats,
} from "./types";
import {post_combine} from "./post_combine";
import {UserscriptWorker} from "./userscript";
import {do_inject} from "../injected/do_inject";
import {
    protoapi_encode_view,
    protoapi_get_prefetch,
    protoapi_get_view,
    ProtobufIngressSeg,
    ProtobufPrefetchObj
} from "../protocol/interface_protobuf";

const BADGE_DOWNLOADING = '↓';
const BADGE_PROCESSING = '...';
const BADGE_ERR_NET = 'NET!';
export const BADGE_ERR_JS = 'JS!';

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

// https://stackoverflow.com/questions/37228285/uint8array-to-arraybuffer
function u8array_to_arraybuffer(array: Uint8Array): ArrayBuffer {
    return array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset) as ArrayBuffer
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
    clusters: Map<int, DanmuCluster[]>;
    chunks_out: Map<int, DanmuChunk<DanmuObjectRepresentative>>;
    chunks_deleted: Map<int, DanmuChunk<DanmuObjectDeleted>>;

    num_chunks: int;
    combine_started: Set<int>;
    failed: boolean;
    cleaned_up: boolean;
    pool: WorkerPool;
    userscript: UserscriptWorker | null;
    userscript_init: Promise<void> | null;

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
        this.chunks_deleted = new Map();
        this.num_chunks = 0;
        this.combine_started = new Set();
        this.failed = false;
        this.cleaned_up = false;
        this.pool = new WorkerPool(config.COMBINE_THREADS);
        this.userscript = config.USERSCRIPT ? new UserscriptWorker(config.USERSCRIPT) : null;
        this.userscript_init = null;
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
        if(this.cleaned_up)
            egress.wait_finished = false;

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
            if(chunk.objs.length) {
                res = await this.pool.exec([chunk, next_chunk_filtered, this.config]);
                console.log('pakku scheduler: got combine result', segidx, res.clusters.length);
            } else {
                res = {
                    clusters: [],
                    stats: new Stats(),
                    deleted_chunk: [],
                };
                console.log('pakku scheduler: got combine result', segidx, '(skipped)');
            }
        } catch(e) {
            this.write_failing_stats(`合并分片 ${segidx} 时出错`, e as Error, BADGE_ERR_JS);
            return;
        }

        this.clusters.set(segidx, res.clusters.map(c => ({
            peers: c.peers_ptr.map(([idx, reason]) => ({
                ...chunk.objs[idx],
                pakku: {
                    sim_reason: reason,
                },
            })),
            desc: c.desc,
            chosen_str: c.chosen_str,
        })));
        this.ongoing_stats.update_from(res.stats);

        this.chunks_deleted.set(segidx, {
            objs: res.deleted_chunk,
            extra: {},
        });

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

        let deleted_danmus_output = this.chunks_deleted.get(segidx)!.objs;

        let chunk_out;
        try {
            chunk_out = post_combine(clusters, prev_clusters, chunk!, this.config, this.ongoing_stats, deleted_danmus_output);
        } catch(e) {
            this.write_failing_stats(`后处理分片 ${segidx} 时出错`, e as Error, BADGE_ERR_JS);
            return;
        }

        if(this.userscript && this.userscript.n_after) {
            try {
                let t1 = +new Date();

                chunk_out = await this.userscript.exec({type: 'pakku_after', chunk: chunk_out, env: {segidx: segidx}}) as any;
                this.userscript.sancheck_chunk_output(chunk_out);

                let t2 = +new Date();
                this.ongoing_stats.userscript_time_ms += Math.ceil(t2 - t1);
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
            for(let [_egress, callback] of this.egresses) {
                callback(null);
            }
            this.egresses = [];
            return;
        }

        if(!this.cleaned_up && this.num_chunks && this.num_chunks===this.chunks_out.size)
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

    dump_result(step: ('input' | 'output' | 'deleted'), egress: Egress): AjaxResponse {
        let chunks = {input: this.chunks_in, output: this.chunks_out, deleted: this.chunks_deleted}[step];
        if(!chunks)
            return null;

        let res = perform_egress(egress, this.num_chunks, chunks);
        if(res===MissingData)
            return null;
        else {
            return {data: res};
        }
    }

    finish() {
        console.log('pakku scheduler: all finished');

        this.ongoing_stats.parse_time_ms = +new Date() - this.start_ts - this.ongoing_stats.download_time_ms;
        this.ongoing_stats.notify(this.tabid, this.config);
        this.stats = this.ongoing_stats;

        setTimeout(()=>{
            if(this.config.GLOBAL_SWITCH && !this.config.SKIP_INJECT) {
                do_inject(this.chunks_out, this.chunks_deleted, this.config);
            }
        }, 300); // delay ui injection to improve player responsiveness
    }

    do_cleanup() {
        this.cleaned_up = true;

        if(this.stats.type==='message') {
            this.finish();
        }

        for(let e of this.egresses) {
            // in unusual cases (e.g., when we guessed the number of chunks wrong), the player may request chunks we don't have
            // since we are finished, there is no chance to wait for them, so we should serve an empty response instead of hanging forever
            e[0].wait_finished = false;
        }

        this.clusters.clear(); // to free some RAM

        setTimeout(()=>{
            this.pool.terminate();
            if(this.userscript)
                this.userscript.terminate();
        }, 1500); // delay destroying web workers to fix view req race and improve performance
    }

    async init_worker_pool() {
        let wasm_resp = await fetch(chrome.runtime.getURL('/assets/similarity-gen.wasm'));
        let wasm_mod = await wasm_resp.arrayBuffer();
        await this.pool.spawn([wasm_mod]);
    }

    async init_userscript() {
        if(!this.userscript)
            return;

        let fn = async () => {
            try {
                await this.userscript!.init({
                    ingress: this.ingress,
                    segidx: null,
                    config: this.config,
                });
            } catch(e) {
                this.write_failing_stats('初始化用户脚本时出错', e as Error, BADGE_ERR_JS);
                return;
            }
        };

        if(!this.userscript_init)
            this.userscript_init = fn();

        return this.userscript_init;
    }

    async start() {
        this.write_cur_message_stats();

        if(this.prefetch_data && this.prefetch_data.guessed_chunks && this.prefetch_data.guessed_chunks<this.pool.pool_size)
            this.pool.pool_size = this.prefetch_data.guessed_chunks;

        await Promise.all([
            this.init_worker_pool(),
            this.init_userscript(),
        ]);

        this.start_ts = +new Date();
        try {
            await perform_ingress(this.ingress, async (idx, chunk) => {
                console.log('pakku scheduler: got ingress chunk', idx, chunk.objs.length);

                if(this.userscript && this.userscript.n_before) {
                    try {
                        let t1 = +new Date();

                        chunk = await this.userscript.exec({type: 'pakku_before', chunk: chunk, env: {segidx: idx}}) as any;
                        this.userscript.sancheck_chunk_output(chunk);

                        let t2 = +new Date();
                        this.ongoing_stats.userscript_time_ms += Math.ceil(t2 - t1)
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

        this.clusters.set(0, []); // pad a pseudo cluster before the first one for the `prev_clusters` arg
        void this.try_start_postproc(1);
    }

    async modify_proto_view(): Promise<ArrayBuffer> {
        await this.init_userscript();

        let view_req = this.prefetch_data!.view;

        if(this.userscript && this.userscript.n_view) {
            let view: AnyObject;

            try {
                view = await protoapi_get_view(view_req);
            } catch(e) {
                this.write_failing_stats('下载 view 时出错', e as Error, BADGE_ERR_NET);
                return view_req;
            }

            if(this.userscript.terminated) { // normally shouldn't happen, but possible when network is too slow
                console.log('pakku userscript: worker terminated, skip proto_view');
                return view_req;
            }

            try {
                let t1 = +new Date();

                view = await this.userscript.exec({type: 'proto_view', view: view, env: {}});
                let view_ab = u8array_to_arraybuffer(protoapi_encode_view(view));

                let t2 = +new Date();
                this.ongoing_stats.userscript_time_ms += Math.ceil(t2 - t1)

                // cache the result so it will be available even if this.userscript has been cleaned up
                this.prefetch_data!.view = new Promise((resolve) => resolve(view_ab));
                this.userscript.n_view = 0;

                return view_ab;
            } catch(e) {
                this.write_failing_stats(`执行 view 用户脚本时出错`, e as Error, BADGE_ERR_JS);
                return view_req;
            }
        } else {
            return view_req;
        }
    }
}
export let scheduler: null | Scheduler = null;

function ingress_equals(a: Ingress, b: Ingress): boolean {
    // @ts-ignore
    return Object.keys(a).filter(k => k!=='is_magicreload').every(k => a[k] === b[k]);
}

export function handle_task(ingress: Ingress, egress: Egress, callback: (resp: AjaxResponse)=>void, config: LocalizedConfig, tabid: int) {
    if(scheduler && ingress_equals(scheduler.ingress, ingress)) {
        scheduler.config = config;
        scheduler.add_egress(egress, callback);
    } else {
        scheduler = new Scheduler(ingress, config, tabid);
        scheduler.add_egress(egress, callback);
        void scheduler.start();
    }
}

export function handle_proto_view(ingress: ProtobufIngressSeg, view_url: string, config: LocalizedConfig, tabid: int): Promise<ArrayBuffer> {
    if(scheduler && ingress_equals(scheduler.ingress, ingress)) {
        scheduler.config = config;
        if(!scheduler.prefetch_data)
            scheduler.prefetch_data = protoapi_get_prefetch(ingress, view_url);
    } else {
        scheduler = new Scheduler(ingress, config, tabid);
        scheduler.prefetch_data = protoapi_get_prefetch(ingress, view_url);
        void scheduler.start();
    }

    return scheduler.modify_proto_view();
}