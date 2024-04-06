import {get_config, save_config} from '../background/config';
import {get_state, save_state, remove_state} from '../background/state';
import {UserscriptWorker} from '../core/userscript';

let $save = document.querySelector('#save');
let $clear = document.querySelector('#clear');
let $editor = document.querySelector('#editor');

let tabid = parseInt(new URLSearchParams(location.search).get('tabid') || 0);

async function check_userscript(script) {
    let w = new UserscriptWorker(script);
    w.worker.onerror = (e)=>{
        alert('脚本存在错误：' + e.message);
        w.worker.terminate();
    };
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
        alert('脚本存在错误：' + e.message);
        w.worker.terminate();
        throw e;
    }
}

async function load() {
    if(tabid) {
        let state = await get_state();
        let userscript = state[`USERSCRIPT_${tabid}`];
        if(userscript)
            $editor.value = userscript;

        $save.textContent = `保存（仅对 tabid = ${tabid} 临时生效，页面将会刷新）`;
        $save.onclick = async ()=>{
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
            if(await check_userscript($editor.value)) {
                await save_config({['USERSCRIPT']: $editor.value});
                alert('保存成功');
            }
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