(()=>{
let fn_before = [];
let fn_after = [];
let fn_view = [];

function reg_tweak_fn(list) {
    return (callback, timing=0) => {
        if(typeof callback !== 'function')
            throw new Error('callback argument is not a function');
        list.push([timing, callback]);
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

onmessage = (e) => {
    try {
        if(e.data.type==='init') {
            install_callbacks(tweak_before_pakku, tweak_after_pakku, tweak_proto_view);
            fn_before = fn_before.sort((a, b) => a[0] - b[0]);
            fn_after = fn_after.sort((a, b) => a[0] - b[0]);
            fn_view = fn_view.sort((a, b) => a[0] - b[0]);
            postMessage({
                error: null,
                output: {
                    n_before: fn_before.length,
                    n_after: fn_after.length,
                    n_view: fn_view.length,
                },
            });
        }
        else if(e.data.type==='pakku_before') {
            let chunk = e.data.chunk;
            for(let [timing, fn] of fn_before)
                fn(chunk);
            postMessage({error: null, output: chunk});
        }
        else if(e.data.type==='pakku_after') {
            let chunk = e.data.chunk;
            for(let [timing, fn] of fn_after)
                fn(chunk);
            fix_dispstr(chunk);
            postMessage({error: null, output: chunk});
        }
        else if(e.data.type==='proto_view') {
            let view = e.data.view;
            for(let [timing, fn] of fn_view)
                fn(view);
            postMessage({error: null, output: view});
        }
        else {
            postMessage({error: 'unknown type '+e.data.type});
        }
    } catch(err) {
        postMessage({error: err});
    }
};
})();

function install_callbacks(tweak_before_pakku, tweak_after_pakku, tweak_proto_view) {
    /* MAIN */
}