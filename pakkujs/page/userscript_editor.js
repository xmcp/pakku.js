import {get_config, save_config} from '../background/config';
import {get_state, save_state, remove_state} from '../background/state';
import {UserscriptWorker} from '../core/userscript';

let $save = document.querySelector('#save');
let $clear = document.querySelector('#clear');
let $editor = document.querySelector('#editor');
let $sandbox = document.querySelector('#sandbox');

let tabid = parseInt(new URLSearchParams(location.search).get('tabid') || 0);

let use_sandbox = false;
(()=>{
    function do_use_sandbox(e) {
        $sandbox.src = 'https://www.bilibili.com/robots.txt?pakku_sandbox';
        use_sandbox = true;
        console.log('using sandbox because cannot create worker', e);
    }

    try {
        let w = new Worker(URL.createObjectURL(new Blob([''], {type: 'text/javascript'})));
        w.onerror = (e)=>{
            do_use_sandbox(e);
        };
    } catch(e) {
        do_use_sandbox(e);
    }
})();

function check_userscript_sandboxed(script) {
    return new Promise((resolve) => {
        window.onmessage = (e)=>{
            if(e.data.type==='pakku_sandbox_result') {
                if(e.data.error) {
                    alert('脚本存在错误：\n' + e.data.error);
                    resolve(false);
                } else if(e.data.total===0) {
                    alert('没有注册任何函数，请使用 tweak_before_pakku 和 tweak_after_pakku 注册处理函数');
                    resolve(false);
                } else {
                    resolve(true);
                }
            }
        };
        $sandbox.contentWindow.postMessage({type: 'pakku_sandbox_request', script: script}, '*');
    });
}

async function check_userscript_direct(script) {
    let w = new UserscriptWorker(script);
    try {
        let [n_before, n_after] = await w.init();
        let tot = n_before + n_after;
        w.worker.terminate();
        if(tot===0) {
            alert('没有注册任何函数，请使用 tweak_before_pakku 和 tweak_after_pakku 注册处理函数');
            return false;
        }
        return true;
    } catch(e) {
        alert('脚本存在错误：\n' + e.message + '\n\n' + e.stack);
        w.worker.terminate();
    }
}

async function check_userscript(script) {
    return await (use_sandbox ? check_userscript_sandboxed :check_userscript_direct)(script);
}

async function load() {
    if(tabid) {
        let state = await get_state();
        let userscript = state[`USERSCRIPT_${tabid}`];
        if(userscript)
            $editor.value = userscript;

        $save.textContent = `保存（仅对 tabid = ${tabid} 临时生效，页面将会刷新）`;
        $save.onclick = async ()=>{
            $save.disabled = true;
            if(await check_userscript($editor.value)) {
                try {
                    await chrome.tabs.sendMessage(tabid, {type: 'reload_state'}); // make sure the tab (still) exists
                    await save_state({[`USERSCRIPT_${tabid}`]: $editor.value});
                    await chrome.tabs.sendMessage(tabid, {type: 'refresh'});
                    alert('保存成功');
                } catch(e) {
                    alert('保存失败：' + e.message);
                }
            }
            $save.disabled = false;
        };

        $clear.onclick = async ()=>{
            if(confirm(`清除 tabid = ${tabid} 的临时用户脚本？`)) {
                await remove_state([`USERSCRIPT_${tabid}`]);
                try {
                    await chrome.tabs.sendMessage(tabid, {type: 'refresh'});
                } catch(e) {}
                alert('清除成功');
                location.reload();
            }
        };
    } else {
        let config = await get_config();
        let userscript = config['USERSCRIPT'];
        if(userscript)
            $editor.value = userscript;

        $save.textContent = '保存全局用户脚本（对所有视频生效）';
        $save.onclick = async ()=>{
            $save.disabled = true;
            if(await check_userscript($editor.value)) {
                await save_config({['USERSCRIPT']: $editor.value});
                alert('保存成功');
            }
            $save.disabled = false;
        };

        $clear.onclick = async ()=>{
            if(confirm(`清除全局用户脚本？`)) {
                await save_config({USERSCRIPT: null});
                alert('清除成功');
                location.reload();
            }
        };
    }
}
void load();