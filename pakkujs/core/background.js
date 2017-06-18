// (C) 2017 @xmcp. THIS PROJECT IS LICENSED UNDER GPL VERSION 3. SEE `LICENSE.txt`.

var GLOBAL_SWITCH=true;

function loadconfig() {
    window.THRESHOLD=parseInt(localStorage['THRESHOLD']||20);
    window.MARK_THRESHOLD=parseInt(localStorage['MARK_THRESHOLD']||1);
    window.MAX_DIST=parseInt(localStorage['MAX_DIST']||5);
    window.MAX_COSINE=parseInt(localStorage['MAX_COSINE'])||60;
    window.TRIM_ENDING=localStorage['TRIM_ENDING']==='on';
    window.TRIM_SPACE=localStorage['TRIM_SPACE']==='on';
    window.TAOLUS=fromholyjson(localStorage['TAOLUS'])||[];
    window.WHITELIST=fromholyjson(localStorage['WHITELIST'])||[];
    window.REMOVE_SEEK=localStorage['REMOVE_SEEK']==='on';
    window.FLASH_NOTIF=localStorage['FLASH_NOTIF']==='on';
    window.DANMU_MARK=localStorage['DANMU_MARK'];
    window.POPUP_BADGE=localStorage['POPUP_BADGE'];
    window.PROC_TYPE7=localStorage['PROC_TYPE7']==='on';
    window.PROC_TYPE4=localStorage['PROC_TYPE4']==='on';
    window.ENLARGE=localStorage['ENLARGE']==='on';
    window.SHRINK=localStorage['SHRINK']==='on';
}
function initconfig() {    
    localStorage['THRESHOLD']=localStorage['THRESHOLD']||20;
    localStorage['MARK_THRESHOLD']=localStorage['MARK_THRESHOLD']||1;
    localStorage['MAX_DIST']=localStorage['MAX_DIST']||5;
    localStorage['MAX_COSINE']=localStorage['MAX_COSINE']||60;
    localStorage['TRIM_ENDING']=localStorage['TRIM_ENDING']||'on';
    localStorage['TRIM_SPACE']=localStorage['TRIM_SPACE']||'on';
    localStorage['TAOLUS']=localStorage['TAOLUS']||'[["^23{2,}$","233..."],["^6{3,}$","666..."],["^[fF]+$","FFF..."],["^[hH]+$","hhh..."]]';
    localStorage['WHITELIST']=localStorage['WHITELIST']||'[["弹\\\\s*幕\\\\s*护\\\\s*[体眼]",""]]';
    localStorage['REMOVE_SEEK']=localStorage['REMOVE_SEEK']||'off';
    localStorage['FLASH_NOTIF']=localStorage['FLASH_NOTIF']||'on';
    localStorage['DANMU_MARK']=localStorage['DANMU_MARK']||'suffix';
    localStorage['POPUP_BADGE']=localStorage['POPUP_BADGE']||'percent';
    localStorage['PROC_TYPE7']=localStorage['PROC_TYPE7']||'off';
    localStorage['PROC_TYPE4']=localStorage['PROC_TYPE4']||'on';
    localStorage['ENLARGE']=localStorage['ENLARGE']||'off';
    localStorage['SHRINK']=localStorage['SHRINK']||'off';
    loadconfig();
}
initconfig();

chrome.notifications.onButtonClicked.addListener(function(notifid,btnindex) {
    if(btnindex==0)  // goto settings
        chrome.tabs.create({url: 'http://www.bilibili.com/html/help.html#p'},function(tab) {
            console.log(tab.id);
            chrome.tabs.executeScript(tab.id,{
                file: '/assets/enable_h5_player.js',
                runAt: 'document_end'
            });
        });
    else if(btnindex==1) // ignore
        ;
    else
        throw 'bad index';
    chrome.notifications.clear(notifid);
});

chrome.runtime.onInstalled.addListener(function(details) {
    if(TEST_MODE) {
        chrome.notifications.create('//test', {
            type: 'basic',
            iconUrl: chrome.runtime.getURL('assets/logo.png'),
            title: 'pakku.js is running in test mode',
            message: 'this should not be happening. please report a bug if you see this message.',
            contextMessage: navigator.userAgent
        });
        return;
    }
    if(details.reason=='install') {
        window.open(chrome.runtime.getURL('options/options.html'));
        chrome.notifications.create('//init', {
            type: 'basic',
            iconUrl: chrome.runtime.getURL('assets/logo.png'),
            title: '你切换到B站 HTML5 播放器了吗？',
            message: '我们不兼容B站的 Flash 播放器。请切换到B站的 HTML5 播放器来让 pakku 过滤弹幕。',
            isClickable: false,
            buttons: [
                {title: '→ 切换到 HTML5 播放器'},
                {title: '我已经在用 HTML5 播放器了'}
            ]
        });
    } else {
        migrate_legacy_taolus();
        migrate_legacy_fuzz();
    }
});

function load_danmaku(id,tabid) {
    chrome.browserAction.setTitle({
        title: '正在下载弹幕文件…',
        tabId: tabid
    });
    setbadge('↓',LOADING_COLOR,tabid);
    
    var xhr=new XMLHttpRequest();
    console.log('load http://comment.bilibili.com/'+id+'.xml');
    xhr.open('get','http://comment.bilibili.com/'+id+'.xml',false);
    try {        
        xhr.send();
    } catch(e) {
        setbadge('NET!',ERROR_COLOR,tabid);
        HISTORY[tabid]=FailingStatus(id,'网络错误',e.stack);
        throw e;
    }
    if(xhr.status===200 && xhr.responseXML) {
        try {
            setbadge('...',LOADING_COLOR,tabid);
            var S=Status(id);
            var res=parse(xhr.responseXML,tabid,S);
            HISTORY[tabid]=S;
            return 'data:text/xml;charset=utf-8,'+res;
        } catch(e) {
            setbadge('JS!',ERROR_COLOR,tabid);
            HISTORY[tabid]=FailingStatus(id,'弹幕处理失败',e.stack);
            throw e;
        }
    } else {
        setbadge('SVR!',ERROR_COLOR,tabid);
        HISTORY[tabid]=FailingStatus(id,'B站弹幕服务器错误','xhr.status == '+xhr.status);
        throw 'network error!';
    }
}

chrome.webRequest.onBeforeRequest.addListener(function(details) {
    if(!GLOBAL_SWITCH)
        return {cancel: false};
    
    var ret=/:\/\/comment\.bilibili\.com\/(?:rc\/)?(\d+)(\.debug)?\.xml$/.exec(details.url);
    if(ret) {
        if(ret[2] || details.type==='xmlhttprequest')
            return {redirectUrl: load_danmaku(ret[1],details.tabId)||details.url};
        else {
            console.log(details);
            setbadge('FL!',ERROR_COLOR,details.tabId);
            HISTORY[details.tabId]=FailingStatus(ret[1],'已忽略非 HTML5 播放器的请求','details.type == '+details.type);
            if(details.type!=='main_frame' && FLASH_NOTIF)
                chrome.notifications.create(details.url, {
                    type: 'basic',
                    iconUrl: chrome.runtime.getURL('assets/logo.png'),
                    title: 'pakku 没有在正常工作',
                    message: '切换到B站 HTML5 播放器来让 pakku 过滤视频中的弹幕。',
                    contextMessage: '（在 pakku 的设置中可以关闭此提醒）',
                    isClickable: false,
                    buttons: [
                        {title: '→ 点我一键切换'},
                        {title: '忽略'}
                    ]
                });
            return {cancel: false};
        }
    }
    else
        return {cancel: false};
}, {urls: ['*://comment.bilibili.com/*.xml']}, ['blocking']);

if(TEST_MODE) {
    chrome.webRequest.onBeforeRequest.addListener(function(details) {
        return {redirectUrl: 'data:text/html,<title>'+encodeURIComponent(chrome.runtime.getURL('options/options.html'))+'</title>'};
    }, {urls: ['http://_get_pakkujs_options_page.bilibili.com/_xmcp_used_for_travis_ci']}, ['blocking']);

    function parse_string(str) {
        var parser=new DOMParser();
        var dom=parser.parseFromString(str,'text/xml');
        return parse(dom,0,Status(0));
    }
}
