import {WorkerPool} from "./worker_pool";

import {Egress, Ingress, perform_egress, perform_ingress} from "../protocol/interface";
import {DanmuChunk, DanmuClusterOutput, int, MissingData, Stats} from "./types";
import {Config} from "../background/config";
import {post_combine} from "./post_combine";

const WORKER_POOL_SIZE = 3;
const MAX_SCHEDULERS_PER_PAGE = 4;

class Scheduler {
    ingress: Ingress;
    egresses: Array<[Egress, (resp: any)=>void]>;
    config: Config;

    chunks_in: Map<int, DanmuChunk>;
    clusters: Map<int, DanmuClusterOutput>;
    chunks_out: Map<int, DanmuChunk>;

    num_chunks: int;
    combine_started: Set<int>;
    finished: boolean;
    pool: WorkerPool;

    constructor(ingress: Ingress, config: Config) {
        this.ingress = ingress;
        this.egresses = [];
        this.config = config;
        this.chunks_in = new Map();
        this.clusters = new Map();
        this.chunks_out = new Map();
        this.num_chunks = 0;
        this.combine_started = new Set();
        this.finished = false;
        this.pool = new WorkerPool(WORKER_POOL_SIZE);
    }

    add_egress(egress: Egress, callback: (resp: any)=>void) {
        console.log('scheduler: route ingress =', this.ingress, 'egress =', egress);
        this.egresses.push([egress, callback]);
        this.try_serve_egress();
    }

    async try_start_combine(segidx: int) {
        if(this.combine_started.has(segidx))
            return; // working or finished

        let chunk = this.chunks_in.get(segidx);
        let next_chunk = this.chunks_in.get(segidx+1);
        if(!chunk || !next_chunk)
            return; // not ready

        this.combine_started.add(segidx);

        let max_next_time = chunk.objs.length ? chunk.objs[chunk.objs.length-1].time_ms + 1000 * this.config.THRESHOLD : 0;
        let next_chunk_filtered = {
            objs: next_chunk.objs.filter(obj => obj.time_ms < max_next_time),
            extra: next_chunk.extra,
        };

        let res: DanmuClusterOutput = await this.pool.exec([chunk as DanmuChunk, next_chunk_filtered as DanmuChunk]);

        console.log('scheduler: got combine result', segidx, res.clusters.length);
        this.clusters.set(segidx, res);

        this.try_start_postproc(segidx);
    }

    try_start_postproc(segidx: int) {
        if(this.chunks_out.has(segidx))
            return; // finished

        let clusters = this.clusters.get(segidx);
        let prev_clusters = this.clusters.get(segidx-1);
        if(!clusters || !prev_clusters)
            return; // not ready

        let res = post_combine(clusters, prev_clusters);
        console.log('scheduler: got chunks out', segidx, res.objs.length);
        this.chunks_out.set(segidx, res);

        this.try_serve_egress();
    }

    try_serve_egress() {
        this.egresses = this.egresses.filter(([egress, callback]) => {
            let res = perform_egress(egress, this.num_chunks, this.chunks_out);

            if(res===MissingData)
                return true; // keep in queue
            else {
                console.log('scheduler: served egress', egress);
                callback({data: res});
                return false; // remove from queue
            }
        });

        if(this.num_chunks && this.num_chunks===this.chunks_out.size)
            this.pool.terminate();
    }

    async start() {
        await perform_ingress(this.ingress, (idx, chunk) => {
            console.log('scheduler: got ingress chunk', idx, chunk.objs.length);
            chunk.objs.sort((a, b) => a.time_ms - b.time_ms);

            this.chunks_in.set(idx, chunk);
            this.try_start_combine(idx);
        });

        this.num_chunks = this.chunks_in.size;
        console.log('scheduler: total chunks', this.num_chunks);

        this.chunks_in.set(this.num_chunks+1, {objs: [], extra: {}}); // pad a pseudo chunk after the last one for the `next_chunk` arg
        this.try_start_combine(this.num_chunks);

        this.clusters.set(0, {clusters: [], stats: new Stats()}); // pad a pseudo cluster before the first one for the `prev_clusters` arg
        this.try_start_postproc(1);
    }
}
let schedulers: Array<Scheduler> = [];

function ingress_equals(a: Ingress, b: Ingress): boolean {
    // @ts-ignore
    return Object.keys(a).every(k => a[k] === b[k]);
}

export function handle_task(ingress: Ingress, egress: Egress, callback: (resp: any)=>void, config: Config) {
    for(let scheduler of schedulers)
        if(ingress_equals(scheduler.ingress, ingress)) {
            scheduler.add_egress(egress, callback);
            scheduler.config = config;
            return;
        }

    let scheduler = new Scheduler(ingress, config);
    scheduler.add_egress(egress, callback);
    scheduler.start();

    schedulers.push(scheduler);
    if(schedulers.length>MAX_SCHEDULERS_PER_PAGE)
        schedulers.shift();
}