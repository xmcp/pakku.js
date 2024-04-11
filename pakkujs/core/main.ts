import {url_finder} from "../protocol/urls";
import {handle_task, last_scheduler} from "./scheduler";
import {Config, get_config} from "../background/config";
import {get_state, remove_state} from "../background/state";
import {AjaxResponse, BlacklistItem, DumpResult, int, LocalizedConfig} from "./types";
import {Egress, Ingress} from "../protocol/interface";

function get_player_blacklist(): BlacklistItem[] {
    type BpxProfileType = {
        blockList: {
            type: 0 | 1; // is_regexp
            filter: string;
            opened: boolean;
            id: int;
        }[];
        dmSetting: {
            status: boolean;
        };
    };
    try {
        let j = JSON.parse(window.localStorage.getItem('bpx_player_profile')!) as BpxProfileType;
        if(!j.dmSetting.status) // blacklist disabled
            return [];

        let ret = (
            j.blockList
                .filter(item=>item.opened && [0, 1].includes(item.type))
                .map(item=>[item.type===1, item.filter] as BlacklistItem)
        );
        console.log('pakku injected: got player blacklist', ret);
        return ret;
    } catch(e) {
        console.error('pakku injected: cannot get player blacklist', e);
        return [];
    }
}

let tabid: null | int = null;
let unreg_userscript = true;

async function apply_local_config(config: Config, is_pure_env: boolean = false): Promise<LocalizedConfig> {
    let state = await get_state();

    let userscript = config.USERSCRIPT;

    if(!tabid) {
        tabid = await chrome.runtime.sendMessage({type: 'get_tabid'}) as int;

        // storage cleanup
        window.onunload = function() {
            if(unreg_userscript)
                void remove_state([`STATS_${tabid}`, `USERSCRIPT_${tabid}`]);
            else
                void remove_state([`STATS_${tabid}`]);
        };
    }

    if(state[`USERSCRIPT_${tabid}`])
        userscript = (userscript || '') + '\n\n' + state[`USERSCRIPT_${tabid}`];

    return {
        ...config,
        BLACKLIST: is_pure_env ? [] : get_player_blacklist(),
        GLOBAL_SWITCH: state.GLOBAL_SWITCH,
        USERSCRIPT: userscript,
        SKIP_INJECT: is_pure_env,
    };
}

let local_config: null | LocalizedConfig = null;

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if(msg.type==='reload_state') {
        local_config = null; // will trigger reload later
    }
    else if(msg.type==='refresh') {
        unreg_userscript = false;
        window.location.reload();
    }
    else if(msg.type==='dump_result') {
        let s = last_scheduler;
        if(!s) {
            sendResponse({
                error: '当前标签没有弹幕处理结果',
            });
        } else {
            sendResponse({
                error: null,
                ingress: s.ingress,
                num_chunks: s.num_chunks,
                chunks_in: Object.fromEntries(s.chunks_in),
                chunks_out: Object.fromEntries(s.chunks_out),
            } as DumpResult);
        }
    }
    else if(msg.type==='reload_danmu') {
        local_config = null;
        if(window.reload_danmu_magic)
            window.reload_danmu_magic();
    }
    else {
        console.log('pakku injected: unknown chrome message', msg.type);
    }
});

function is_bilibili(origin: string): boolean {
    return origin.endsWith('.bilibili.com') || origin.endsWith('//bilibili.com');
}

declare global {
    interface Window { pakku_process_local: any; }
}

window.pakku_process_local = async function(ingress: Ingress, egress: Egress) {
    console.log('pakku: process local', ingress.type, egress);
    let config = await apply_local_config(await get_config(), true);
    let perform = function() {
        return new Promise((resolve) => {
            handle_task(ingress, egress, resolve, config, tabid as int);
        });
    };
    return await perform();
};

window.addEventListener('message', async function(event) {
    if(is_bilibili(event.origin) && event.data.type && event.data.type=='pakku_ajax_request') {
        console.log('pakku injected: got ajax request', event.data.url);
        let sendResponse = (resp: AjaxResponse) => {
            event.source!.postMessage({
                type: 'pakku_ajax_response',
                url: event.data.url,
                resp: resp
            }, event.origin as any);
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