import {AnyObject, DanmuChunk, DanmuObject, DanmuObjectRepresentative, int} from "./types";

type ArgType = (
    {type: 'init'}
    | {type: 'pakku_before', chunk: DanmuChunk<DanmuObject>}
    | {type: 'pakku_after', chunk: DanmuChunk<DanmuObjectRepresentative>}
);
type RetType = AnyObject;

const USERSCRIPT_TEMPLATE = `
(()=>{
    let callbacks_before = [];
    let callbacks_after = [];
    function tweak_before_pakku(callback, timing=0) {
        callbacks_before.push([timing, callback]);
    }
    function tweak_after_pakku(callback, timing=0) {
        callbacks_after.push([timing, callback]);
    }
    function fix_dispstr(chunk) {
        for(let obj of chunk.objs) {
            let text = obj.content;
            if(obj.mode===7) {
                try {
                    text = JSON.parse(obj.content)[4];
                } catch(e) {}
            }
            obj.pakku.disp_str = text;
        }
    }
    onmessage = (e) => {
        try {
            if(e.data.type==='init') {
                install_callbacks(tweak_before_pakku, tweak_after_pakku);
                callbacks_before = callbacks_before.sort((a, b) => a[0] - b[0]);
                callbacks_after = callbacks_after.sort((a, b) => a[0] - b[0]);
                postMessage({
                    error: null,
                    output: {
                        n_before: callbacks_before.length,
                        n_after: callbacks_after.length,
                    },
                });
            } if(e.data.type==='pakku_before') {
                let chunk = e.data.chunk;
                for(let [timing, callback] of callbacks_before)
                    callback(chunk);
                postMessage({error: null, output: chunk});
            } else if(e.data.type==='pakku_after') {
                let chunk = e.data.chunk;
                for(let [timing, callback] of callbacks_after)
                    callback(chunk);
                fix_dispstr(chunk);
                postMessage({error: null, output: chunk});
            }
        } catch(err) {
            postMessage({error: err});
        }
    };
})();
function install_callbacks(tweak_before_pakku, tweak_after_pakku) {
    /* MAIN */
}
`;

export class UserscriptWorker {
    script: string;
    worker: Worker;

    resolve: null | ((res: RetType)=>void);
    reject: null | ((e: any)=>void);
    queue: Array<[ArgType, typeof this.resolve, typeof this.reject]>;

    n_before: int;
    n_after: int;

    constructor(script: string | null) {
        this.script = script || '';
        this.worker = new Worker(URL.createObjectURL(new Blob([
            USERSCRIPT_TEMPLATE.replace('/* MAIN */', this.script),
        ], {type: 'text/javascript'})));
        this.resolve = null;
        this.reject = null;
        this.queue = [];
        this.n_before = 0;
        this.n_after = 0;

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
        if(this.queue.length===0)
            return;

        if(this.resolve===null) { // idle
            let [arg, resolve, reject] = this.queue.shift()!;
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

    async init(): Promise<[int, int]> {
        let {n_before, n_after} = await this.exec({type: 'init'});
        this.n_before = n_before;
        this.n_after = n_after;
        return [n_before, n_after];
    }

    sancheck_output(chunk: any) {
        if(
            !chunk
            || !chunk.objs
            || !chunk.extra
            || !Array.isArray(chunk.objs)
        ) {
            throw new Error(`userscript returned invalid value: ${JSON.stringify(chunk)}`);
        }
    }
}