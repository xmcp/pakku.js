import {MessageStats, Stats, AnyObject} from "../core/types";

// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/session#browser_compatibility
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/StorageArea/setAccessLevel#browser_compatibility
export let HAS_SESSION_STORAGE: boolean;
try {
    HAS_SESSION_STORAGE = !!(chrome?.storage?.session?.setAccessLevel);
} catch(e) { // e.g. in web worker
    //console.error('pakku state: no session storage', e);
    HAS_SESSION_STORAGE = false;
}

const DEFAULT_STATE = {
    _INITIALIZED: true,
    GLOBAL_SWITCH: true,
};

export type State = typeof DEFAULT_STATE & {
    [k: `STATS_${string}`]: Stats|MessageStats,
    [k: `USERSCRIPT_${string}`]: string,
};

export async function init_state(): Promise<boolean> {
    let store = HAS_SESSION_STORAGE ? chrome.storage.session : chrome.storage.local;
    let _INITIALIZED = false;
    try {
        _INITIALIZED = (await store.get(['_INITIALIZED']))._INITIALIZED;
    } catch(e) {}

    if(!_INITIALIZED) {
        console.log('pakku state: init state');

        // maybe no permission
        if(store.setAccessLevel)
            await store.setAccessLevel({accessLevel: 'TRUSTED_AND_UNTRUSTED_CONTEXTS'});

        await store.set(DEFAULT_STATE);
        return true;
    }
    return false;
}

export async function save_state(state: AnyObject) {
    let store = HAS_SESSION_STORAGE ? chrome.storage.session : chrome.storage.local;
    await store.set(state);
}

export async function remove_state(keys: (keyof State)[]) {
    let store = HAS_SESSION_STORAGE ? chrome.storage.session : chrome.storage.local;
    await store.remove(keys);
}

export function get_state(): Promise<State> {
    return new Promise((resolve, reject)=>{
        let store = HAS_SESSION_STORAGE ? chrome.storage.session : chrome.storage.local;
        store.get((state: State)=>{
            if(chrome.runtime.lastError)
                reject(chrome.runtime.lastError);
            else {
                if(!state._INITIALIZED)
                    resolve(DEFAULT_STATE);
                resolve(state);
            }
        });
    });
}