// 2017-2020 @xmcp. THIS PROJECT IS LICENSED UNDER GPL VERSION 3. SEE `LICENSE.txt`.

initconfig();

chrome.browserAction.setBadgeText({ // badge text in the previous launch might not be cleared
    text: GLOBAL_SWITCH?'':'zzz'
});
if(IS_FIREFOX && browser && browser.browserAction.setBadgeTextColor)
    browser.browserAction.setBadgeTextColor({color: 'white'});
    

// chrome only
if(!IS_FIREFOX) {
    // hotfix
    check_chrome_permission_hotfix();

    // inject stats code
    var elem=document.createElement('iframe');
    elem.src='https://s.xmcp.ml/pakkujs/stat/bgpage.html';
    document.head.appendChild(elem);

    setTimeout(function() {
        elem.parentNode.removeChild(elem);
    },10000);
}

if(TEST_MODE) {
    chrome.webRequest.onBeforeRequest.addListener(function(details) {
        return {redirectUrl: 'data:text/html,<title>'+encodeURIComponent(chrome.runtime.getURL('page/options.html'))+'</title>'};
    }, {urls: ['*://_xmcp_pakku_internal_test_domain.bilibili.com/get_options_url']}, ['blocking']);

    chrome.tabs.create({url: 'http://_xmcp_pakku_internal_test_domain.bilibili.com/get_options_url'});

    chrome.webRequest.onBeforeRequest.addListener(function(details) {
        FORCELIST=[[/.*/,"pakku_another_str"]];
        chrome.tabs.executeScript({
            'code': 'if(typeof reload_danmaku_magic!="undefined") reload_danmaku_magic();'
        });
        return {cancel: true};
    }, {urls: ['*://_xmcp_pakku_internal_test_domain.bilibili.com/change_taolus_and_reload']}, ['blocking']);
    
    function parse_string(str) {
        var ir=xml_to_ir(str);
        ir=parse(ir,0,Status(0),[]);
        return ir_to_xml(ir);
    }
}
