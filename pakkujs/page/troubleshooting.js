import {get_config} from '../background/config';
import {get_state, HAS_SESSION_STORAGE} from '../background/state';
import {WorkerMaker} from '../core/worker_pool';

let channel = process.env.PAKKU_CHANNEL;

let debug = document.getElementById('debug');
let error = document.getElementById('error');

function stringify_error(e) {
    return (e instanceof Error) ? (`${e.message} (${JSON.stringify(e.stack)})`) : JSON.stringify(e);
}

window.addEventListener('error', (e)=>{
    error.textContent += '\n\n**Exception:** `' + stringify_error(e.error) + '`';
});
window.addEventListener('unhandledrejection', (e)=>{
    error.textContent += '\n\n**Exception in Promise:** `' + stringify_error(e.reason) + '`';
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
    let maker = new WorkerMaker();
    await maker.spawn();
    debug.textContent += '\n\n**Worker is Simulated:** `' + maker.use_simulated + '`';
}
void test_worker();

(async function() {
    throw new Error('async error log is working');
})();
throw new Error('error log is working');

// DO NOT PUT ANYTHING BEYOND THIS LINE because the previous stmt will throw