import {DanmuChunk, DanmuClusterOutput, int, LocalizedConfig} from "./types";
import 'remote-web-worker';

export class WorkerPool {
    terminated: boolean;
    workers: {
        worker: Worker;
        resolve: null | ((res: DanmuClusterOutput)=>void);
        reject: null | ((e: any)=>void);
    }[];
    queue: [DanmuChunk, DanmuChunk, LocalizedConfig, (res: DanmuClusterOutput)=>void, (e: any)=>void][];

    constructor(pool_size: int) {
        this.terminated = false;
        this.workers = [];
        this.queue = [];
        console.log('pakku worker pool: spawned');
        for(let i = 0; i < pool_size; i++) {
            let w = new Worker(chrome.runtime.getURL('/generated/combine_worker.js'));
            let config = {
                worker: w,
                resolve: null as (null | ((res: DanmuClusterOutput)=>void)),
                reject: null as (null | ((e: any)=>void)),
            };
            w.onmessage = (e) => {
                if(config.resolve && config.reject) {
                    if(e.data.error)
                        config.reject(e.data.error);
                    else
                        config.resolve(e.data.output);

                    config.resolve = null;
                    config.reject = null;
                } else {
                    console.error('pakku worker pool: BAD MESSAGE', e);
                }

                this._try_perform_work();
            };
            this.workers.push(config);
        }
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
        console.log('pakku worker pool: no idle workers, queue =', this.queue.length);
    }

    exec(args: [DanmuChunk, DanmuChunk, LocalizedConfig]): Promise<DanmuClusterOutput> {
        return new Promise((resolve: (res: DanmuClusterOutput)=>void, reject: (e: any)=>void) => {
            if(this.terminated) {
                reject('worker pool: cannot accept job because terminated');
                return;
            }
            this.queue.push([args[0], args[1], args[2], resolve, reject]);
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