import {DanmuChunk, DanmuClusterOutput, DanmuObject, int, LocalizedConfig} from "./types";

type InitArgsType = [ArrayBuffer];
type RunArgsType = [DanmuChunk<DanmuObject>, DanmuChunk<DanmuObject>, LocalizedConfig];
type RetType = DanmuClusterOutput;
const INIT_FUNCTION_NAME = 'prepare_combine';
const RUN_FUNCTION_NAME = 'do_combine';
type PostedMessage = {cmd: typeof INIT_FUNCTION_NAME, args: InitArgsType} | {cmd: typeof RUN_FUNCTION_NAME, args: RunArgsType};

const WORKER_FOOTER = `
onmessage = async (e) => {
    console.log('pakku worker: received job ' + e.data.cmd);
    try {
        let res = await self[e.data.cmd](...e.data.args);
        console.log('pakku worker: job done');
        postMessage({error: false, output: res});
    } catch(err) {
        console.error('pakku worker: job FAILED', err);
        postMessage({error: true, exc: err});
    }
};
`;

interface WebWorkerLike {
    postMessage: (msg: PostedMessage)=>void;
    onmessage: null | ((e: {data: {error: true, exc: any} | {error: false, output: RetType}})=>void);
    terminate: ()=>void;
}

const WORKER_URL = chrome.runtime.getURL('/generated/combine_worker.js');

export class WorkerMaker {
    use_simulated: boolean;

    worker_blob_url: string | null;
    simulated_module: {[fn: string]: any} | null;
    constructor() {
        this.use_simulated = false;
        this.worker_blob_url = null;
        this.simulated_module = null;
    }

    async spawn(): Promise<WebWorkerLike> {
        if(this.use_simulated)
            return this._spawn_simulated();

        if(!this.worker_blob_url) {
            let src = await (await fetch(WORKER_URL)).text();
            // remove `export { ... };`
            src = src.replace(/\bexport\s*\{[\sa-zA-Z0-9_,]+}/, '');

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
        if(!this.simulated_module) {
            this.simulated_module = await import(WORKER_URL);
        }

        let ret = {
            onmessage: null as (null | ((e: {data: {error: true, exc: any} | {error: false, output: RetType}})=>void)),
            postMessage: async (msg: PostedMessage)=>{
                console.log('pakku worker (simulated): received job', msg.cmd);
                try {
                    let res = await this.simulated_module![msg.cmd](...msg.args);
                    console.log('pakku worker (simulated): job done');
                    ret.onmessage!({data: {error: false, output: res}});
                } catch(err) {
                    console.error('pakku worker (simulated): job FAILED', err);
                    ret.onmessage!({data: {error: true, exc: err}});
                }
            },
            terminate: ()=>{
                // xxx: this WON'T actually free up memory used by the imported module
                // https://stackoverflow.com/questions/71684556/how-to-unload-dynamic-imports-in-javascript
                this.simulated_module = null;
            },
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
    queue: [PostedMessage, (res: RetType)=>void, (e: any)=>void][];

    constructor(pool_size: int) {
        this.terminated = false;
        this.pool_size = pool_size;
        this.workers = [];
        this.queue = [];
    }

    async spawn(init_args: InitArgsType) {
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
                        config.reject(e.data.exc);
                    else {
                        let output = e.data.output || null;
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

            await new Promise((resolve, reject) => {
                config.resolve = resolve;
                config.reject = reject;
                w.postMessage({cmd: INIT_FUNCTION_NAME, args: init_args});
            });

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
                let [msg, resolve, reject] = this.queue.shift()!;
                w.resolve = resolve;
                w.reject = reject;
                w.worker.postMessage(msg);
                return;
            }
        }
        //console.log('pakku worker pool: no idle workers, queue =', this.queue.length);
    }

    _exec(msg: PostedMessage): Promise<RetType> {
        return new Promise((resolve: (res: RetType)=>void, reject: (e: any)=>void) => {
            if(this.terminated) {
                reject('worker pool: cannot accept job because terminated');
                return;
            }
            this.queue.push([msg, resolve, reject]);
            this._try_perform_work();
        });
    }

    async exec(args: RunArgsType): Promise<RetType> {
        return await this._exec({cmd: RUN_FUNCTION_NAME, args});
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