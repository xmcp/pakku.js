// (C) 2017 @xmcp. THIS PROJECT IS LICENSED UNDER GPL VERSION 3. SEE `LICENSE.txt`.

var GLOBAL_SWITCH=true;

function loadconfig() {
    window.THRESHOLD=parseInt(localStorage['THRESHOLD'])||20;
    window.MAX_DIST=1+(localStorage['DANMU_FUZZ']==='on')*4;
    window.TRIM_ENDING=localStorage['TRIM_ENDING']==='on';
    window.TRIM_SPACE=localStorage['TRIM_SPACE']==='on';
    window.TAOLUS=fromholyjson(localStorage['TAOLUS'])||[];
    window.WHITELIST=fromholyjson(localStorage['WHITELIST'])||[];
    window.REMOVE_SEEK=localStorage['REMOVE_SEEK']==='on';
    window.FLASH_NOTIF=localStorage['FLASH_NOTIF']==='on';
    window.DANMU_MARK=localStorage['DANMU_MARK'];
    window.POPUP_BADGE=localStorage['POPUP_BADGE'];
    window.PROC_TYPE7=localStorage['PROC_TYPE7']==='on';
    window.ENLARGE=localStorage['ENLARGE']==='on';
}
localStorage['THRESHOLD']=localStorage['THRESHOLD']||20;
localStorage['DANMU_FUZZ']=localStorage['DANMU_FUZZ']||'on';
localStorage['TRIM_ENDING']=localStorage['TRIM_ENDING']||'on';
localStorage['TRIM_SPACE']=localStorage['TRIM_SPACE']||'on';
localStorage['TAOLUS']=localStorage['TAOLUS']||'[["^23{2,}$","233..."],["^6{3,}$","666..."],["^[fF]+$","FFF..."],["^[hH]+$","hhh..."]]';
localStorage['WHITELIST']=localStorage['WHITELIST']||'[["弹\\\\s*幕\\\\s*护\\\\s*[体眼]",""]]';
localStorage['REMOVE_SEEK']=localStorage['REMOVE_SEEK']||'off';
localStorage['FLASH_NOTIF']=localStorage['FLASH_NOTIF']||'on';
localStorage['DANMU_MARK']=localStorage['DANMU_MARK']||'suffix';
localStorage['POPUP_BADGE']=localStorage['POPUP_BADGE']||'percent';
localStorage['PROC_TYPE7']=localStorage['PROC_TYPE7']||'on';
localStorage['ENLARGE']=localStorage['ENLARGE']||'off';
loadconfig();

chrome.notifications.onButtonClicked.addListener(function(notifid,btnindex) {
    if(btnindex==0) // goto settings
        chrome.tabs.create({url: 'http://www.bilibili.com/html/help.html#p'});
    else if(btnindex==1) // ignore
        ;
    else
        throw 'bad index';
    chrome.notifications.clear(notifid);
});

chrome.runtime.onInstalled.addListener(function(details) {
    if(details.reason=='install') {
        window.open(chrome.runtime.getURL('options/options.html'));
        chrome.notifications.create('//init', {
            type: 'basic',
            iconUrl: chrome.runtime.getURL('assets/logo.png'),
            title: '切换到哔哩哔哩 HTML5 播放器',
            message: '由于技术限制，pakku 不支持过滤 Flash 播放器中的弹幕。如果您仍在使用 Flash 播放器，请切换到 HTML5 版本。',
            contextMessage: 'http://www.bilibili.com/html/help.html#p',
            isClickable: false,
            buttons: [
                {title: '→ 前去设置'},
                {title: '我已经在用 HTML5 播放器了'}
            ]
        });
    } else
        migrate_legacy_taolus(); // in utils.js
});

function load_danmaku(id,tabid) {
    function base64(str) { // from https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
    }
    chrome.browserAction.setTitle({
        title: '正在下载弹幕文件…',
        tabId: tabid
    });
    setbadge('...',LOADING_COLOR,tabid);
    
    var xhr=new XMLHttpRequest();
    console.log('load http://comment.bilibili.com/'+id+'.xml');
    xhr.open('get','http://comment.bilibili.com/'+id+'.xml',false);
    try {        
        xhr.send();
    } catch(e) {
        setbadge('NET!',ERROR_COLOR,tabid);
        throw e;
    }
    if(xhr.status===200 && xhr.responseXML) {
        try {
            return 'data:text/xml;charset=utf-8;base64,'+base64(parse(xhr.responseXML,tabid));
        } catch(e) {
            setbadge('JS!',ERROR_COLOR,tabid);
            throw e;
        }
    } else {
        setbadge('SVR!',ERROR_COLOR,tabid);
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
            if(details.type!=='main_frame' && FLASH_NOTIF)
                chrome.notifications.create(details.url, {
                    type: 'basic',
                    iconUrl: chrome.runtime.getURL('assets/logo.png'),
                    title: '暂不支持 Flash 播放器',
                    message: '请切换到哔哩哔哩 HTML5 播放器来让 pakku 过滤视频中的弹幕。',
                    contextMessage: '（在 pakku 的设置中可以关闭此提醒）',
                    isClickable: false,
                    buttons: [
                        {title: '→ 切换到 HTML5 播放器'},
                        {title: '忽略'}
                    ]
                });
            return {cancel: false};
        }
    }
    else
        return {cancel: false};
}, {urls: ['*://comment.bilibili.com/*.xml']}, ['blocking']);
