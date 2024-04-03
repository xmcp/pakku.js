import {MessageStats, Stats, int, AnyObject} from "../core/types";

const DEFAULT_STATE = {
    _INITIALIZED: true,

    GLOBAL_SWITCH: true,
    USERSCRIPTS: {} as {[tabid: int]: string},
};

export type State = typeof DEFAULT_STATE & {
    [k: `STATS_${string}`]: {[tabid: int]: Stats|MessageStats},
};

export async function init_state() {
    let {_INITIALIZED} = await chrome.storage.session.get(['_INITIALIZED']);
    if(!_INITIALIZED) {
        console.log('pakku state: init');
        await chrome.storage.session.setAccessLevel({accessLevel: 'TRUSTED_AND_UNTRUSTED_CONTEXTS'});
        await chrome.storage.session.set(DEFAULT_STATE);
    }
}

export async function save_state(state: AnyObject) {
    await chrome.storage.session.set(state);
}

export async function get_state(): Promise<State> {
    let state = await chrome.storage.session.get() as State;
    if(!state._INITIALIZED)
        return DEFAULT_STATE;
    return state;
}