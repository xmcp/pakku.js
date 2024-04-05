import {get_config} from '../background/config';
import {get_state, HAS_SESSION_STORAGE} from '../background/state';
import {WorkerMaker} from '../core/worker_pool';

let channel = process.env.PAKKU_CHANNEL;

let debug = document.getElementById('debug');
let error = document.getElementById('error');

window.addEventListener('error', (e)=>{
    error.textContent += '\n\n**! Exception:** `' + e.message + '`';
    error.textContent+='\n\n`' + e.filename + '` :: ' + e.lineno + ' :: ' + e.colno;
});
window.addEventListener('onunhandledrejection', (e)=>{
    error.textContent += '\n\n**! Exception (in Promise):** `' + JSON.stringify(e.reason) + '`';
});

debug.textContent += '<summary>[Debug Info]</summary>';
debug.textContent += '\n\n**Version:** ' + chrome.runtime.getManifest().version;
debug.textContent += '\n\n**Channel:** ' + channel;
debug.textContent += '\n\n**User Agent:** `' + navigator.userAgent + '`';
debug.textContent += '\n\n**Incognito:** `' + chrome.extension.inIncognitoContext + '`';
debug.textContent += '\n\n**Has Session Storage:** `' + JSON.stringify(HAS_SESSION_STORAGE) + '`';

chrome.permissions.getAll(function(perms) {
    debug.textContent += '\n\n**Permissions:** `' + JSON.stringify(perms) + '`';
});

debug.textContent += '\n\n**localStorage:** `' + JSON.stringify(localStorage) + '`';
get_config().then((config)=>{
    debug.textContent += '\n\n**Config:** `' + JSON.stringify(config) + '`';
});
get_state().then((state)=>{
    debug.textContent += '\n\n**State:** `' + JSON.stringify(state) + '`';
});

debug.textContent += '\n\n**Views:**';
for(let view of chrome.extension.getViews()) {
    debug.textContent += '\n\n- `' + view.location.href + '`';
}

chrome.tabs.query({}, function(tabs) {
    debug.textContent += '\n\n**Tabs:**';
    for(let tab of tabs) {
        debug.textContent += '\n\n- ID=' + tab.id + ' status=' + tab.status + ' `' + tab.url + '`';
    }
});

async function test_worker() {
    let maker = new WorkerMaker(chrome.runtime.getURL('/generated/combine_worker.js'));
    await maker.spawn();
    debug.textContent += '\n\n**Worker is Simulated:** `' + maker.use_simulated + '`';
}
void test_worker();

window.test_error_log_is_working();

// DO NOT PUT ANYTHING BEHIND THIS LINE because the previous stmt will throw