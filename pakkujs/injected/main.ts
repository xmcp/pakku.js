import {url_finder} from "../protocol/urls";
import {handle_task} from "../core/scheduler";
import {Config, get_config} from "../background/config";
import {get_state, remove_state} from "../background/state";
import {BlacklistItem, int, LocalizedConfig} from "../core/types";

function get_player_blacklist(): BlacklistItem[] {
    type BpxProfileType = {
        blockList: {
            type: 0 | 1; // is_regexp
            filter: string;
            opened: boolean;
            id: int;
        }[];
    };
    try {
        let j = (JSON.parse(window.localStorage.getItem('bpx_player_profile')!) as BpxProfileType).blockList;
        let ret = (
            j
                .filter(item=>item.opened)
                .map(item=>[item.type===1, item.filter] as BlacklistItem)
        );
        console.log('pakku injected: got player blacklist', ret.length);
        return ret;
    } catch(e) {
        console.error('pakku injected: cannot get player blacklist', e);
        return [];
    }
}

let tabid: null | int = null;

async function apply_local_config(config: Config): Promise<LocalizedConfig> {
    let state = await get_state();

    let userscript = config.USERSCRIPT;

    if(!tabid) {
        tabid = await chrome.runtime.sendMessage({type: 'get_tabid'}) as int;

        // storage cleanup
        window.onunload = function() {
            void remove_state([`STATS_${tabid}`]);
        };
    }

    if(state.USERSCRIPTS[tabid])
        userscript = (userscript || '') + '\n\n' + state.USERSCRIPTS[tabid];

    return {
        ...config,
        BLACKLIST: get_player_blacklist(),
        GLOBAL_SWITCH: state.GLOBAL_SWITCH,
        USERSCRIPT: userscript,
    }
}

let local_config: null | LocalizedConfig = null;

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if(msg.type==='reload_state') {
        local_config = null; // will trigger reload later
    } else {
        console.error('pakku injected: unknown chrome message', msg);
    }
});

window.addEventListener('message',async function(event) {
    if (event.source!=window)
        return;
    if (event.data.type && event.data.type=='pakku_ajax_request') {
        console.log('pakku injected: got ajax request', event.data.url);
        let sendResponse = (resp: any) => {
            window.postMessage({
                type: 'pakku_ajax_response',
                url: event.data.url,
                resp: resp
            }, '*');
        };

        url_finder.protoapi_img_url = window.localStorage.getItem('wbi_img_url');
        url_finder.protoapi_sub_url = window.localStorage.getItem('wbi_sub_url');

        let url = url_finder.find(event.data.url);
        if(!url) {
            console.log('pakku injected: url not matched:', event.data.url);
            sendResponse(null);
            return;
        }

        if(!local_config) {
            let config = await get_config();
            local_config = await apply_local_config(config);
        }

        if(
            !local_config.GLOBAL_SWITCH &&
            !(url[0].type==='proto_seg' && url[0].is_magicreload) // still process magic reload requests to avoid HTTP 400
        ) {
            console.log('pakku injected: SKIPPED because global switch off');
            sendResponse(null);
            return;
        }

        handle_task(url[0], url[1], sendResponse, local_config, tabid as int);
    }
},false);