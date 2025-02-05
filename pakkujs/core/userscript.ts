import {AnyObject, DanmuChunk, DanmuObject, DanmuObjectRepresentative, int, LocalizedConfig} from "./types";
import {Ingress} from '../protocol/interface';

// @ts-ignore
import userscript_template from "./userscript.template.js";

export interface UserscriptEnv {
    ingress: Ingress;
    segidx: int | null;
    config: LocalizedConfig;
}

type ArgType = (
    {type: 'init'}
    | {type: 'pakku_before', chunk: DanmuChunk<DanmuObject>, env: UserscriptEnv}
    | {type: 'pakku_after', chunk: DanmuChunk<DanmuObjectRepresentative>, env: UserscriptEnv}
    | {type: 'proto_view', view: AnyObject, env: UserscriptEnv}
);
type RetType = AnyObject;

const USERSCRIPT_TEMPLATE: string = userscript_template;

export class UserscriptWorker {
    script: string;
    worker: Worker;
    init_error: null | ErrorEvent = null;
    terminated: boolean;

    resolve: null | ((res: RetType)=>void);
    reject: null | ((e: any)=>void);
    queue: Array<[ArgType, ((res: RetType)=>void), ((e: any)=>void)]>;

    n_before: int;
    n_after: int;
    n_view: int;

    constructor(script: string | null) {
        this.script = script || '';
        this.worker = new Worker(URL.createObjectURL(new Blob([
            USERSCRIPT_TEMPLATE.replace('/* MAIN */', this.script+'\n'),
        ], {type: 'text/javascript'})));
        this.terminated = false;
        this.resolve = null;
        this.reject = null;
        this.queue = [];
        this.n_before = 0;
        this.n_after = 0;
        this.n_view = 0;

        this.worker.onerror = (e: ErrorEvent) => {
            console.error('pakku userscript: INIT ERROR', e);
            this.init_error = e;
            if(this.reject)
                this.reject(e);
        }
        this.worker.onmessage = (e) => {
            if(this.resolve && this.reject) {
                if(e.data.error)
                    this.reject(e.data.error);
                else
                    this.resolve(e.data.output);

                this.resolve = null;
                this.reject = null;
            } else {
                console.error('pakku userscript: BAD MESSAGE', e);
            }

            this._try_perform_work();
        };
    }

    _try_perform_work() {
        if(this.queue.length===0) {
            if(this.terminated)
                this.worker.terminate();
            return;
        }

        if(this.resolve===null) { // idle
            let [arg, resolve, reject] = this.queue.shift()!;
            if(this.init_error) {
                reject(this.init_error);
                return;
            }

            this.resolve = resolve;
            this.reject = reject;
            this.worker.postMessage(arg);
        }
    }

    exec(arg: ArgType): Promise<RetType> {
        console.log('pakku userscript: exec', arg.type);
        return new Promise((resolve: (res: RetType)=>void, reject: (e: any)=>void) => {
            this.queue.push([arg, resolve, reject]);
            this._try_perform_work();
        });
    }

    terminate() {
        if(this.terminated)
            return;

        this.terminated = true;

        if(this.queue.length===0)
            this.worker.terminate();
        // else terminate until all tasks are done in _try_perform_work
    }

    async init(): Promise<int> {
        let {n_before, n_after, n_view} = await this.exec({type: 'init'});
        this.n_before = n_before;
        this.n_after = n_after;
        this.n_view = n_view;
        return n_before + n_after + n_view;
    }

    sancheck_chunk_output(chunk: any) {
        if(
            !chunk
            || !chunk.objs
            || !chunk.extra
            || !Array.isArray(chunk.objs)
            || typeof chunk.extra !== 'object'
        ) {
            throw new Error(`userscript returned invalid value: ${JSON.stringify(chunk)}`);
        }
    }
}