(()=>{

let fn_before = [];
let fn_after = [];

function tweak_before_pakku(callback, timing=0) {
    if(typeof callback !== 'function')
        throw new Error('callback to tweak_before_pakku is not a function');
    fn_before.push([timing, callback]);
}
function tweak_after_pakku(callback, timing=0) {
    if(typeof callback !== 'function')
        throw new Error('callback to tweak_after_pakku is not a function');
    fn_after.push([timing, callback]);
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

onmessage = (e) => {
    try {
        if(e.data.type==='init') {
            install_callbacks(tweak_before_pakku, tweak_after_pakku);
            fn_before = fn_before.sort((a, b) => a[0] - b[0]);
            fn_after = fn_after.sort((a, b) => a[0] - b[0]);
            postMessage({
                error: null,
                output: {
                    n_before: fn_before.length,
                    n_after: fn_after.length,
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
        else {
            postMessage({error: 'unknown type '+e.data.type});
        }
    } catch(err) {
        postMessage({error: err});
    }
};

})();

function install_callbacks(tweak_before_pakku, tweak_after_pakku) {
    /* MAIN */
}