import {install_dnr_rule} from "./danmu_update_blocker";
import {get_config, hotfix_on_update, save_config} from "./config";
import {get_state, HAS_SESSION_STORAGE, init_state, save_state} from "./state";
import {LocalizedConfig} from "../core/types";

async function check_fix_permission() {
    let perms = await chrome.permissions.getAll();

    if(!perms.origins?.includes('*://*.bilibili.com/*')) {
        chrome.notifications.create('//perm_hotfix', {
            type: 'basic',
            iconUrl: chrome.runtime.getURL('/assets/logo.png'),
            title: '请授予pakku权限',
            message: 'pakku目前没有修改弹幕所需的权限，无法正常工作。点击修复权限。',

            // xxx: firefox does not support requireInteraction and buttons
            ...process.env.PAKKU_CHANNEL==='firefox' ? {} : {
                requireInteraction: true,
                buttons: [
                    {title: '立即修复'},
                ],
            },
        });
    }
}

async function do_fix_permission() {
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1763915
    if(process.env.PAKKU_CHANNEL==='firefox') {
        await chrome.tabs.create({url: chrome.runtime.getURL('/page/options.html')});
        return;
    }

    let granted = await chrome.permissions.request({
        origins: ['*://*.bilibili.com/*'],
    });
    console.log('fix permission granted:', granted);

    if(granted) {
        chrome.notifications.clear('//perm_hotfix');
        chrome.notifications.create('//perm_hotfix_done', {
            type: 'basic',
            iconUrl: chrome.runtime.getURL('/assets/logo.png'),
            title: '权限修复成功',
            message: '您可能需要刷新已经打开的B站页面',
        });
    }
}

chrome.notifications.onClicked.addListener(async function(notif_id) {
    if(notif_id==='//perm_hotfix') {
        await do_fix_permission();
    }
});
chrome.notifications.onButtonClicked.addListener(async function(notif_id,btn_idx) {
    if(notif_id==='//perm_hotfix') {
        await do_fix_permission();
    }
});

const DEFAULT_BADGE_BGCOLOR = '#26c';

async function reset_badge() {
    // reset badge options because options during the previous launch might not be cleared away
    await chrome.action.setBadgeText({text: ''});
    await chrome.action.setBadgeBackgroundColor({color: DEFAULT_BADGE_BGCOLOR});
    if(chrome.action.setBadgeTextColor)
        await chrome.action.setBadgeTextColor({color: 'white'});
}

async function install_context_menu() {
    chrome.contextMenus.removeAll(()=>{
        chrome.contextMenus.create({
            id: 'toggle-global-switch',
            title: '切换工作状态',
            contexts: ['action'],
        });
        chrome.contextMenus.create({
            id: 'show-local',
            title: '处理本地弹幕',
            contexts: ['action'],
        });
    });
}

async function install_content_script() {
    let installed = await chrome.scripting.getRegisteredContentScripts({
        ids: ['pakku-ajax'],
    });
    if(installed.length>0)
        return;

    let shared_args = {
        id: 'pakku-ajax',
        allFrames: true,
        matches: ['*://*.bilibili.com/*'],
        excludeMatches: [
            'https://www.bilibili.com/robots.txt?pakku_sandbox', // no need and may cause var name conflict
            'https://message.bilibili.com/*', // no need and may reduce performance due to iframes in the player page
        ],
        css: ['/generated/injected.css'],
        runAt: 'document_start' as 'document_start',
    };

    try {
        await chrome.scripting.registerContentScripts([{
            ...shared_args,
            js: ['/generated/xhr_hook.js'],
            world: 'MAIN',
        }]);
        console.log('pakku ajax: installed content script');
    } catch(e) { // no `world` arg for firefox and chrome <102
        await chrome.scripting.registerContentScripts([{
            ...shared_args,
            js: ['/assets/xhr_hook_injector.js'],
        }]);
        console.log('pakku ajax: installed content script (FALLBACK)');
    }
}

async function perform_init() {
    let is_init = await init_state();
    if(is_init) {
        await reset_badge();
        await check_fix_permission();
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
    chrome.runtime.sendMessage({type: 'reload_popup_state', tabid: null})
        .catch(()=>{});
    for(let tab of await chrome.tabs.query({})) {
        let url = tab.url;
        if(url?.includes('bilibili.com/'))
            chrome.tabs.sendMessage(tab.id!, {type: 'reload_danmu', key: new_switch ? 2 : 1})
                .catch(()=>{});
    }

    return new_switch;
}

function install_declarative_stuff() {
    // best practice to re-install all declarative stuff on every startup
    // https://groups.google.com/a/chromium.org/g/chromium-extensions/c/ZM0Vzb_vuIs/m/Nm4gK-X0AQAJ

    void install_dnr_rule();
    void install_context_menu();
    void install_content_script();
}

chrome.runtime.onStartup.addListener(async ()=>{
    install_declarative_stuff();

    if(!HAS_SESSION_STORAGE) {
        console.error('pakku state: EMULATING session storage');
        await chrome.storage.local.clear();
        // redo the init since the state is reset
        await perform_init();
    }
});

chrome.runtime.onInstalled.addListener(async (details)=>{
    install_declarative_stuff();

    if(details.reason==='install') {
        void chrome.tabs.create({url: chrome.runtime.getURL('page/options.html')});
    }

    if(details.reason==='update') {
        console.log('pakku config: try to migrate');
        let config = await get_config();
        hotfix_on_update(config);
        await save_config(config);
    }
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if(msg.type==='get_local_config') {
        async function worker() {
            let is_pure_env = msg.is_pure_env;

            let tabid = sender.tab?.id;
            let config = await get_config();
            let state = await get_state();

            let userscript = config.USERSCRIPT;
            if(state[`USERSCRIPT_${tabid}`])
                userscript = (userscript || '') + '\n\n' + state[`USERSCRIPT_${tabid}`];

            let local_config: LocalizedConfig = {
                ...config,
                BLACKLIST: (config.READ_PLAYER_BLACKLIST && !is_pure_env) ? [[true, '']] : [],
                GLOBAL_SWITCH: state.GLOBAL_SWITCH,
                USERSCRIPT: userscript,
                SKIP_INJECT: is_pure_env,
            };

            sendResponse({
                tabid: sender.tab?.id,
                local_config: local_config,
            });
        }

        void worker();
        return true;
    }
    else if(msg.type==='update_badge') {
        if(!msg.tabid) {
            console.error('pakku background: no tabid for update_badge');
            return;
        }

        // may throw error because the tabid may be closing
        chrome.action.setBadgeText({
            tabId: msg.tabid,
            text: msg.text,
        }) // will fail in earlier chrome versions if text is null: https://issues.chromium.org/issues/40858508
            .then(()=>
                chrome.action.setBadgeBackgroundColor({
                    tabId: msg.tabid,
                    color: msg.bgcolor || DEFAULT_BADGE_BGCOLOR,
                })
            )
            .catch(()=>{});

        // refresh the popup
        chrome.runtime.sendMessage({type: 'reload_popup_state', tabid: msg.tabid})
            .catch(()=>{});
    }
    else if(msg.type==='toggle_switch') {
        let perform = async ()=>{
            await toggle_global_switch();
            sendResponse(null);
        }
        void perform();
        return true;
    }
    else if(msg.type==='reset_dnr_status') {
        void install_dnr_rule();
    }
    else if(msg.type==='xhr_proxy') {
        let perform = async ()=>{
            try {
                let res = await fetch(msg.url);
                let status = res.status;
                let text = await res.text();
                sendResponse({
                    error: null,
                    text: text,
                    status: status,
                });
            } catch(e) {
                sendResponse({
                    error: e,
                });
            }
        }
        void perform();
        return true;
    }
});

async function handle_command(name: string) {
    if(name==='toggle-global-switch') {
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
    else if(name==='show-local') {
        void chrome.tabs.create({url: chrome.runtime.getURL('/page/parse_local.html')});
    }
}

let _clear_timeout: number | null = null;
chrome.commands.onCommand.addListener(function(name) {
    void handle_command(name);
});

chrome.contextMenus.onClicked.addListener(async function(info, tab) {
    void handle_command(info.menuItemId as string);
});