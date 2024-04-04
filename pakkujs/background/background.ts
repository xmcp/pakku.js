import {reset_dnr_status} from "./danmu_update_blocker";
import {get_config, save_config} from "./config";
import {get_state, HAS_SESSION_STORAGE, init_state, save_state} from "./state";

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

async function reset_badge() {
    // reset badge options because options during the previous launch might not be cleared away
    await chrome.action.setBadgeText({text: ''});
    if(chrome.action.setBadgeTextColor)
        await chrome.action.setBadgeTextColor({color: 'white'});
}

async function perform_init() {
    let is_init = await init_state();
    if(is_init) {
        await reset_badge();
        await check_chrome_permission_hotfix();
    }
}
void perform_init();

async function toggle_global_switch() {
    let new_switch = !(await get_state()).GLOBAL_SWITCH;
    await save_state({
        GLOBAL_SWITCH: new_switch,
    });
    await chrome.action.setBadgeText({
        text: new_switch ? '' : 'zzz',
    });

    // notify popup and content scripts
    chrome.runtime.sendMessage({type: 'reload_state'})
        .catch(()=>{});
    for(let tab of await chrome.tabs.query({})) {
        let url = tab.url;
        if(url?.includes('bilibili.com/'))
            chrome.tabs.sendMessage(tab.id!, {type: 'reload_state'})
                .catch(()=>{});
    }

    return new_switch;
}

chrome.runtime.onStartup.addListener(async ()=>{
    if(!HAS_SESSION_STORAGE) {
        console.error('pakku state: EMULATING session storage');
        await chrome.storage.local.clear();
        await perform_init();
    }
});

chrome.runtime.onInstalled.addListener(async (details)=>{
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
            text: ''+msg.text,
        });
        void chrome.action.setBadgeBackgroundColor({
            tabId: msg.tabid,
            color: msg.bgcolor,
        });
        // refresh the popup
        chrome.runtime.sendMessage({type: 'reload_state'})
            .catch(()=>{});
    }
    else if(msg.type==='toggle_switch') {
        async function perform() {
            await toggle_global_switch();
            sendResponse(null);
        }
        void perform();
        return true;
    }
});

let _clear_timeout: number | null = null;
chrome.commands.onCommand.addListener(async function(name) {
    if (name==='toggle-global-switch') {
        let new_switch = await toggle_global_switch();

        chrome.notifications.create('//switch', {
            type: 'basic',
            iconUrl: chrome.runtime.getURL('assets/logo.png'),
            title: `[ ${new_switch ? 'ON' : 'OFF'} ]`,
            message: 'Pakku is ' + (new_switch ? 'ON' : 'OFF'),
        });
        if(_clear_timeout)
            clearTimeout(_clear_timeout);
        _clear_timeout = setTimeout(function() {
            chrome.notifications.clear('//switch');
        }, 1500) as any;
    }
});