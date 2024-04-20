import {get_config} from "./config";
import Rule = chrome.declarativeNetRequest.Rule;

const RULE = {
    id: 1001,
    action: {
        type: 'block',
    },
    condition: {
        requestDomains: [
            'chat.bilibili.com'
        ],
        excludedInitiatorDomains: [
            'live.bilibili.com'
        ],
        resourceTypes: [
            'websocket'
        ],
    },
} as Rule;

export async function install_dnr_rule() {
    let config = await get_config();
    let enabled = (await chrome.declarativeNetRequest.getDynamicRules()).some(r => r.id===RULE.id);

    if(config.BREAK_UPDATE && !enabled) {
        await chrome.declarativeNetRequest.updateDynamicRules({
            addRules: [RULE],
        });
        console.log('pakku update blocker: add dnr ruleset');
    } else if(!config.BREAK_UPDATE && enabled) {
        await chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: [RULE.id],
        });
        console.log('pakku update blocker: remove dnr ruleset');
    }
}