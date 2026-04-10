import Permissions = chrome.permissions.Permissions;

export function is_permission_buggy(perms: Permissions) {
    let acceptable_domains = [
        '*://*.bilibili.com/*',
        '*://www.bilibili.com/*',
        'https://*.bilibili.com/*',
        'https://www.bilibili.com/*',
    ];
    return !acceptable_domains.some(d => perms.origins?.includes(d));
}

export async function do_fix_permission(already_in_options_page=false, need_break_update=false) {
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1763915
    if (!already_in_options_page && process.env.PAKKU_CHANNEL==='firefox') {
        await chrome.tabs.create({url: chrome.runtime.getURL('/page/options.html')});
        return false;
    }

    let required_origins = ['*://*.bilibili.com/*'];
    if(need_break_update)
        required_origins.push('ws://*.bilibili.com/*', 'wss://*.bilibili.com/*');

    console.log('pakku permission: asked for:', required_origins);
    let granted = await chrome.permissions.request({
        origins: required_origins,
    });
    console.log('pakku permission: fix granted:', granted);

    if (granted) {
        chrome.notifications.clear('//perm_hotfix');
        setTimeout(()=>{
            // windows may not show immediate notification, so we delay for a bit
            chrome.notifications.create('//perm_hotfix_done', {
                type: 'basic',
                iconUrl: chrome.runtime.getURL('/assets/logo.png'),
                title: '权限修复成功',
                message: '您可能需要刷新已经打开的B站页面',
            });
        }, 1000);
        void chrome.runtime.sendMessage({type: 'reset_dnr_status'});
    }
    return granted;
}