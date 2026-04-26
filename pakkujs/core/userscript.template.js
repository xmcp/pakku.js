(()=>{
let fn_before = [];
let fn_after = [];
let fn_view = [];
let fn_welldone = [];

let is_callback_installing = false;

function reg_callback_fn(list) {
    return (callback, timing=0) => {
        if(typeof callback !== 'function')
            throw new Error('callback argument is not a function');
        if(!is_callback_installing)
            throw new Error('callback must be registered synchronously');

        list.push([timing, async (chunk, env) => {
            let ret = callback(chunk, env);
            if(ret instanceof Promise)
                ret = await ret;
            return ret;
        }]);
    };
}
const tweak_before_pakku = reg_callback_fn(fn_before);
const tweak_after_pakku = reg_callback_fn(fn_after);
const tweak_proto_view = reg_callback_fn(fn_view);
const on_pakku_welldone = reg_callback_fn(fn_welldone);

function emit_dom_event(name, detail={}) {
    postMessage({
        type: 'emit_dom_event',
        event_name: name,
        event_detail: detail,
    });
}

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
    function reply(obj) {
        postMessage({
            type: 'reply',
            serial: serial,
            error: null,
            ...obj,
        });
    }

    try {
        if(payload.type==='init') {
            is_callback_installing = true;
            install_callbacks(
                payload.pakku_version,
                tweak_before_pakku, tweak_after_pakku, tweak_proto_view, on_pakku_welldone, emit_dom_event,
            );
            is_callback_installing = false;
            for(let cont of [fn_before, fn_after, fn_view, fn_welldone])
                cont.sort((a, b) => a[0] - b[0]);
            if(payload.env_base)
                env_base = payload.env_base;
            reply({output: {
                n_before: fn_before.length,
                n_after: fn_after.length,
                n_view: fn_view.length,
                n_welldone: fn_welldone.length,
            }});
        }
        else if(payload.type==='pakku_before') {
            let env = {...env_base, ...payload.env};
            for(let [timing, fn] of fn_before)
                await fn(payload.chunk, env);
            reply({output: payload.chunk});
        }
        else if(payload.type==='pakku_after') {
            let env = {...env_base, ...payload.env};
            for(let [timing, fn] of fn_after)
                await fn(payload.chunk, env);
            fix_dispstr(payload.chunk);
            reply({output: payload.chunk});
        }
        else if(payload.type==='proto_view') {
            let env = {...env_base, ...payload.env};
            for(let [timing, fn] of fn_view)
                await fn(payload.view, env);
            reply({output: payload.view});
        }
        else if(payload.type==='welldone') {
            let env = {...env_base, ...payload.env};
            for(let [timing, fn] of fn_welldone)
                await fn(env);
            reply({});
        }
        else {
            reply({error: 'unknown type '+payload.type});
        }
    } catch(err) {
        reply({error: err});
    }
};
})();

function install_callbacks(
    pakku_version,
    tweak_before_pakku, tweak_after_pakku, tweak_proto_view, on_pakku_welldone, emit_dom_event,
) {
    /* MAIN */
}