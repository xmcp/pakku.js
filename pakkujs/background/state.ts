import {MessageStats, Stats, int, AnyObject} from "../core/types";

// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/session#browser_compatibility
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/StorageArea/setAccessLevel#browser_compatibility
let HAS_SESSION_STORAGE: boolean;
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

export async function init_state() {
    if(HAS_SESSION_STORAGE) {
        let {_INITIALIZED} = await chrome.storage.session.get(['_INITIALIZED']);
        if(!_INITIALIZED) {
            console.log('pakku state: init state');
            await chrome.storage.session.setAccessLevel({accessLevel: 'TRUSTED_AND_UNTRUSTED_CONTEXTS'});
            await chrome.storage.session.set(DEFAULT_STATE);
        }
    } else {
        console.log('pakku state: init state (EMULATED!)');
        await chrome.storage.local.clear();
        await chrome.storage.local.set(DEFAULT_STATE);
    }
}

export async function save_state(state: AnyObject) {
    if(HAS_SESSION_STORAGE) {
        await chrome.storage.session.set(state);
    } else {
        await chrome.storage.local.set(state);
    }
}

export async function remove_state(keys: string[]) {
    if(HAS_SESSION_STORAGE)
        await chrome.storage.session.remove(keys);
    else
        await chrome.storage.local.remove(keys);
}

export async function get_state(): Promise<State> {
    let state;
    if(HAS_SESSION_STORAGE) {
        state = await chrome.storage.session.get() as State;
    } else {
        state = await chrome.storage.local.get() as State;
    }

    if(!state._INITIALIZED)
        return DEFAULT_STATE;
    return state;
}