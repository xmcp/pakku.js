import {DanmuChunk, DanmuClusterOutput, DanmuObject, int, LocalizedConfig} from "./types";

type ArgsType = [DanmuChunk<DanmuObject>, DanmuChunk<DanmuObject>, LocalizedConfig];
type RetType = DanmuClusterOutput;
const FUNCTION_NAME = 'do_combine';

const WORKER_FOOTER = `
onmessage = (e) => {
    console.log('pakku worker: received job');
    try {
        let res = ${FUNCTION_NAME}(...e.data);
        console.log('pakku worker: job done');
        postMessage({error: null, output: res});
    } catch(err) {
        console.error('pakku worker: job FAILED', err);
        postMessage({error: err});
    }
};
`;

interface WebWorkerLike {
    postMessage: (msg: ArgsType)=>void;
    onmessage: null | ((e: {data: {error: Error} | {error: null, output: RetType}})=>void);
    terminate: ()=>void;
}

const WORKER_URL = chrome.runtime.getURL('/generated/combine_worker.js');

export class WorkerMaker {
    use_simulated: boolean;

    worker_blob_url: string | null;
    fallback_fn: ((...args: ArgsType)=>RetType) | null;
    constructor() {
        this.use_simulated = false;
        this.worker_blob_url = null;
        this.fallback_fn = null;
    }

    async spawn(): Promise<WebWorkerLike> {
        if(this.use_simulated)
            return this._spawn_simulated();

        if(!this.worker_blob_url) {
            let src = await (await fetch(WORKER_URL)).text();
            // remove `export { do_combine };`
            src = src.replace(/\bexport\s*\{\s*[a-zA-Z0-9_]+\s*}/, '');

            this.worker_blob_url = URL.createObjectURL(new Blob([src + WORKER_FOOTER], {
                type: "text/javascript",
            }));
        }

        try {
            return new Worker(this.worker_blob_url) as any;
        } catch(e) {
            console.error('pakku worker pool: USE SIMULATED because web worker init failed', e);
            this.use_simulated = true;
            return await this._spawn_simulated();
        }
    }

    async _spawn_simulated(): Promise<WebWorkerLike> {
        if(!this.fallback_fn) {
            let module = await import(WORKER_URL);
            this.fallback_fn = module[FUNCTION_NAME] as (...args: ArgsType)=>RetType;
        }

        let ret = {
            onmessage: null as (null | ((e: {data: {error: any} | {error: null, output: RetType}})=>void)),
            postMessage: (args: ArgsType)=>{
                console.log('pakku worker (simulated): received job');
                try {
                    let res = this.fallback_fn!(...args);
                    console.log('pakku worker (simulated): job done');
                    ret.onmessage!({data: {error: null, output: res}});
                } catch(err) {
                    console.error('pakku worker (simulated): job FAILED', err);
                    ret.onmessage!({data: {error: err}});
                }
            },
            terminate: ()=>{},
        };
        return ret;
    }
}

export class WorkerPool {
    terminated: boolean;
    pool_size: int;
    workers: {
        worker: WebWorkerLike;
        resolve: null | ((res: RetType)=>void);
        reject: null | ((e: any)=>void);
    }[];
    queue: [...ArgsType, (res: RetType)=>void, (e: any)=>void][];

    constructor(pool_size: int) {
        this.terminated = false;
        this.pool_size = pool_size;
        this.workers = [];
        this.queue = [];
    }

    async spawn() {
        console.log('pakku worker pool: spawn', this.pool_size, 'workers');

        let maker = new WorkerMaker();
        if(this.pool_size===0) {
            maker.use_simulated = true;
            this.pool_size = 1;
        }

        let spawn_single_worker = async () => {
            let w = await maker.spawn();
            let config = {
                worker: w,
                resolve: null as (null | ((res: RetType)=>void)),
                reject: null as (null | ((e: any)=>void)),
            };
            w.onmessage = (e) => {
                if(config.resolve && config.reject) {
                    if(e.data.error)
                        config.reject(e.data.error);
                    else {
                        let output = e.data.output;
                        if(process.env.PAKKU_CHANNEL==='firefox') {
                            // xxx: https://github.com/xmcp/pakku.js/issues/272
                            output = JSON.parse(JSON.stringify(output));
                        }
                        config.resolve(output);
                    }

                    config.resolve = null;
                    config.reject = null;
                } else {
                    console.error('pakku worker pool: BAD MESSAGE', e);
                }

                this._try_perform_work();
            };
            return config;
        }

        this.workers = await Promise.all(
            new Array(this.pool_size).fill(0).map(spawn_single_worker)
        );
    }

    _try_perform_work() {
        if(this.queue.length===0)
            return;

        for(let w of this.workers) {
            if(w.resolve===null) { // idle
                let [arg1, arg2, arg3, resolve, reject] = this.queue.shift()!;
                w.resolve = resolve;
                w.reject = reject;
                w.worker.postMessage([arg1, arg2, arg3]);
                return;
            }
        }
        //console.log('pakku worker pool: no idle workers, queue =', this.queue.length);
    }

    exec(args: ArgsType): Promise<RetType> {
        return new Promise((resolve: (res: RetType)=>void, reject: (e: any)=>void) => {
            if(this.terminated) {
                reject('worker pool: cannot accept job because terminated');
                return;
            }
            this.queue.push([...args, resolve, reject]);
            this._try_perform_work();
        });
    }

    terminate() {
        if(!this.terminated) {
            this.terminated = true;
            console.log('pakku worker pool: terminated');
            for(let w of this.workers) {
                w.worker.terminate();
            }
        }
    }
}