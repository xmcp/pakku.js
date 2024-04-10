import {UserscriptWorker} from "../core/userscript";

(()=>{ // wrap in iife to avoid name conflict with content_script.js

    if(window !== window.parent) {
        console.log('pakku sandbox: injected');
        let ext_domain = chrome.runtime.getURL('');
        if(ext_domain.endsWith('/'))
            ext_domain = ext_domain.slice(0, -1);

        window.onmessage = (e) => {
            if(e.origin !== ext_domain) {
                console.error('pakku sandbox: origin', e.origin, 'does not match', ext_domain);
                return;
            }

            console.log('pakku sandbox: received request', e.data);

            if(e.data.type==='pakku_sandbox_request') {
                (async ()=>{
                    let w = null;
                    try {
                        w = new UserscriptWorker(e.data.script);
                        let res = await w.init();
                        window.parent.postMessage({type: 'pakku_sandbox_result', error: null, total: res[0]+res[1]}, ext_domain);
                    } catch(e) {
                        window.parent.postMessage({type: 'pakku_sandbox_result', error: `${(e as Error).message || '未知错误'}\n\n${(e as Error).stack}`}, ext_domain);
                    }
                    if(w)
                        w.worker.terminate();
                })();
            }
        };
    }
})();