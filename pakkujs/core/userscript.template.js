(()=>{
let fn_before = [];
let fn_after = [];
let fn_view = [];

function reg_tweak_fn(list) {
    return (callback, timing=0) => {
        if(typeof callback !== 'function')
            throw new Error('callback argument is not a function');
        list.push([timing, async (chunk, env) => {
            let ret = callback(chunk, env);
            if(ret instanceof Promise)
                ret = await ret;
            return ret;
        }]);
    };
}
const tweak_before_pakku = reg_tweak_fn(fn_before);
const tweak_after_pakku = reg_tweak_fn(fn_after);
const tweak_proto_view = reg_tweak_fn(fn_view);

function fix_dispstr(chunk) {
    for(let obj of chunk.objs) {
        let text = obj.content;
        if(obj.mode===7 && obj.content[0]==='[') {
            try {
                text = JSON.parse(obj.content)[4];
            } catch(e) {}
        }
        obj.pakku.disp_str = text.replace(/([\r\n\t])/g,'').trim();
    }
}

let env_base = {};
onmessage = async (e) => {
    let [serial, payload] = e.data;
    try {
        if(payload.type==='init') {
            install_callbacks(tweak_before_pakku, tweak_after_pakku, tweak_proto_view);
            fn_before = fn_before.sort((a, b) => a[0] - b[0]);
            fn_after = fn_after.sort((a, b) => a[0] - b[0]);
            fn_view = fn_view.sort((a, b) => a[0] - b[0]);
            if(payload.env_base)
                env_base = payload.env_base;
            postMessage({serial: serial, error: null, output: {
                n_before: fn_before.length,
                n_after: fn_after.length,
                n_view: fn_view.length,
            }});
        }
        else if(payload.type==='pakku_before') {
            let env = {...env_base, ...payload.env};
            for(let [timing, fn] of fn_before)
                await fn(payload.chunk, env);
            postMessage({serial: serial, error: null, output: payload.chunk});
        }
        else if(payload.type==='pakku_after') {
            let env = {...env_base, ...payload.env};
            for(let [timing, fn] of fn_after)
                await fn(payload.chunk, env);
            fix_dispstr(payload.chunk);
            postMessage({serial: serial, error: null, output: payload.chunk});
        }
        else if(payload.type==='proto_view') {
            let env = {...env_base, ...payload.env};
            for(let [timing, fn] of fn_view)
                await fn(payload.view, env);
            postMessage({serial: serial, error: null, output: payload.view});
        }
        else {
            postMessage({serial: serial, error: 'unknown type '+payload.type});
        }
    } catch(err) {
        postMessage({serial: serial, error: err});
    }
};
})();

function install_callbacks(tweak_before_pakku, tweak_after_pakku, tweak_proto_view) {
    /* MAIN */
}