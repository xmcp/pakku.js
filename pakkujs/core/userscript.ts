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
    {type: 'init', env_base: UserscriptEnv | null}
    | {type: 'pakku_before', chunk: DanmuChunk<DanmuObject>, env: Partial<UserscriptEnv>}
    | {type: 'pakku_after', chunk: DanmuChunk<DanmuObjectRepresentative>, env: Partial<UserscriptEnv>}
    | {type: 'proto_view', view: AnyObject, env: Partial<UserscriptEnv>}
);
type RetType = AnyObject;

const USERSCRIPT_TEMPLATE: string = userscript_template;

export class UserscriptWorker {
    script: string;
    worker: Worker;
    terminated: boolean;

    queue_serial: int;
    queue_callback: Map<int, [((res: RetType)=>void), ((e: any)=>void)]>;

    n_before: int;
    n_after: int;
    n_view: int;

    constructor(script: string | null) {
        this.script = script || '';
        this.worker = new Worker(URL.createObjectURL(new Blob([
            USERSCRIPT_TEMPLATE.replace('/* MAIN */', this.script+'\n'),
        ], {type: 'text/javascript'})));
        this.terminated = false;
        this.queue_callback = new Map();
        this.queue_serial = 0;
        this.n_before = 0;
        this.n_after = 0;
        this.n_view = 0;

        this.worker.onerror = (e: ErrorEvent) => {
            console.error('pakku userscript: UNCAUGHT ERROR', e);
        }
        this.worker.onmessage = (e) => {
            let serial = e.data.serial;
            if(!this.queue_callback.has(serial)) {
                console.error('pakku userscript: BAD SERIAL', e);
                return;
            }

            let [resolve, reject] = this.queue_callback.get(serial)!;
            this.queue_callback.delete(serial);

            if(this.terminated && this.queue_callback.size===0)
                this.worker.terminate();

            if(e.data.error)
                reject(e.data.error);
            else
                resolve(e.data.output);
        };
    }

    exec(arg: ArgType): Promise<RetType> {
        console.log('pakku userscript: exec', arg.type);
        return new Promise((resolve: (res: RetType)=>void, reject: (e: any)=>void) => {
            let serial = ++this.queue_serial;
            this.worker.postMessage([serial, arg]);
            this.queue_callback.set(serial, [resolve, reject]);
        });
    }

    terminate() {
        if(this.terminated)
            return;

        this.terminated = true;

        // make sure to terminate only when all tasks are done to avoid missing view responses

        if(this.queue_callback.size===0)
            this.worker.terminate();
        // else: terminate until all tasks are done in this.worker.onmessage
    }

    async init(env_base: UserscriptEnv | null): Promise<int> {
        let {n_before, n_after, n_view} = await this.exec({type: 'init', env_base: env_base});
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