import {MessageStats, Stats, int, AnyObject} from "../core/types";

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
    USERSCRIPTS: {} as {[tabid: int]: string},
};

export type State = typeof DEFAULT_STATE & {
    [k: `STATS_${string}`]: {[tabid: int]: Stats|MessageStats},
};

export async function init_state(): Promise<boolean> {
    let store = HAS_SESSION_STORAGE ? chrome.storage.session : chrome.storage.local;
    let {_INITIALIZED} = await store.get(['_INITIALIZED']);
    if(!_INITIALIZED) {
        console.log('pakku state: init state');
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

export async function remove_state(keys: string[]) {
    let store = HAS_SESSION_STORAGE ? chrome.storage.session : chrome.storage.local;
    await store.remove(keys);
}

export async function get_state(): Promise<State> {
    let store = HAS_SESSION_STORAGE ? chrome.storage.session : chrome.storage.local;
    let state = await store.get() as State;

    if(!state._INITIALIZED)
        return DEFAULT_STATE;
    return state;
}