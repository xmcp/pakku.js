import {reset_dnr_status} from "./danmu_update_blocker";
import {get_config, save_config} from "./config";
import {get_state, init_state, save_state} from "./state";

async function check_chrome_permission_hotfix() {
    let perms = await chrome.permissions.getAll();

    if(!perms.origins?.includes('*://*.bilibili.com/*')) {
        chrome.notifications.create('//perm_hotfix', {
            type: 'basic',
            iconUrl: chrome.runtime.getURL('assets/logo.png'),
            title: '请授予pakku权限',
            message: '您可能修改了权限设置，导致pakku没有修改弹幕所需的权限，无法正常工作。',
            requireInteraction: true,
            buttons: [
                {title: '立即修复'},
            ]
        });
    }
}

chrome.notifications.onButtonClicked.addListener(function(notif_id,btn_idx) {
    if(notif_id==='//perm_hotfix') {
        chrome.permissions.request({
            origins: ['*://*.bilibili.com/*'],
            permissions: ['storage', 'declarativeNetRequestWithHostAccess'],
        }, function(granted) {
            if(granted) {
                chrome.notifications.update('//perm_hotfix', {
                    title: '权限修复成功',
                    message: '您可能需要刷新已经打开的B站页面',
                    requireInteraction: false,
                    buttons: [],
                });
            }
        });
    }
});

async function perform_init() {
    await init_state();
    await check_chrome_permission_hotfix();
}

chrome.runtime.onStartup.addListener(async ()=>{
    await perform_init();
});

chrome.runtime.onInstalled.addListener(async (details)=>{
    await perform_init();
    await reset_dnr_status();

    if(details.reason==='install') {
        await chrome.tabs.create({url: chrome.runtime.getURL('page/options.html')});
    }

    if(details.reason==='update') {
        console.log('pakku config: try to migrate');
        let config = await get_config();
        await save_config(config);
    }
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if(msg.type==='get_tabid') {
        sendResponse(sender.tab?.id);
    }
    else if(msg.type==='update_badge') {
        void chrome.action.setBadgeText({
            tabId: msg.tabid,
            text: msg.text,
        });
        void chrome.action.setBadgeBackgroundColor({
            tabId: msg.tabid,
            color: msg.bgcolor,
        });
        void chrome.tabs.sendMessage(msg.tabid, {type: 'reload_state'});
    }
    else if(msg.type==='toggle_switch') {
        async function perform() {
            let state = await get_state();
            await save_state({
                GLOBAL_SWITCH: !state.GLOBAL_SWITCH,
            });

            // notify popup and content scripts
            await chrome.runtime.sendMessage({type: 'reload_state'});
            for(let tab of await chrome.tabs.query({})) {
                let url = tab.url;
                if(url?.includes('bilibili.com/'))
                    await chrome.tabs.sendMessage(tab.id!, {type: 'reload_state'});
            }

            sendResponse(null);
        }
        void perform();
        return true;
    }
});