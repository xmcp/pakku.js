// (C) 2018 @xmcp. THIS PROJECT IS LICENSED UNDER GPL VERSION 3. SEE `LICENSE.txt`.

var DANMU_URL_RE=/(.+):\/\/comment\.bilibili\.com\/(?:rc\/)?(?:dmroll,([\d\-]+),)?(\d+)(?:\.xml)?(\?debug)?$/;

function loadconfig() {
    window._ADVANCED_USER=localStorage['_ADVANCED_USER']==='on';
    // 弹幕合并
    window.THRESHOLD=parseInt(localStorage['THRESHOLD']||20);
    window.MAX_DIST=parseInt(localStorage['MAX_DIST']||5);
    window.MAX_COSINE=parseInt(localStorage['MAX_COSINE'])||60;
    window.TRIM_ENDING=localStorage['TRIM_ENDING']==='on';
    window.TRIM_SPACE=localStorage['TRIM_SPACE']==='on';
    window.TRIM_WIDTH=localStorage['TRIM_WIDTH']==='on';
    // 例外设置
    window.TAOLUS=fromholyjson(localStorage['TAOLUS'])||[];
    window.WHITELIST=fromholyjson(localStorage['WHITELIST'])||[];
    window.CROSS_MODE=localStorage['CROSS_MODE']==='on';
    window.PROC_TYPE7=localStorage['PROC_TYPE7']==='on';
    window.PROC_TYPE4=localStorage['PROC_TYPE4']==='on';
    window.PROC_POOL1=localStorage['PROC_POOL1']==='on';
    // 显示设置
    window.DANMU_MARK=localStorage['DANMU_MARK'];
    window.MARK_THRESHOLD=parseInt(localStorage['MARK_THRESHOLD']||1);
    window.DANMU_SUBSCRIPT=localStorage['DANMU_SUBSCRIPT']==='on';
    window.ENLARGE=localStorage['ENLARGE']==='on';
    window.SHRINK=localStorage['SHRINK']==='on';
    // 播放器增强
    window.TOOLTIP=localStorage['TOOLTIP']==='on';
    window.AUTO_PREVENT_SHADE=localStorage['AUTO_PREVENT_SHADE']==='on';
    window.AUTO_DISABLE_DANMU=localStorage['AUTO_DISABLE_DANMU']==='on';
    window.FLUCTLIGHT=localStorage['FLUCTLIGHT']==='on';
    window.FOOLBAR=localStorage['FOOLBAR']==='on';
    // 实验室
    window.REMOVE_SEEK=localStorage['REMOVE_SEEK']==='on';
    window.BREAK_UPDATE=localStorage['BREAK_UPDATE']==='on';
    window.BLACKLIST=fromholyjson(localStorage['BLACKLIST'])||[];
    window.HIDE_THRESHOLD=parseInt(localStorage['HIDE_THRESHOLD']||0);
    window.SCROLL_THRESHOLD=parseInt(localStorage['SCROLL_THRESHOLD']||900);
    // 其他
    window.POPUP_BADGE=localStorage['POPUP_BADGE'];
    window.FLASH_NOTIF=localStorage['FLASH_NOTIF']==='on';
    
    load_update_breaker();
    backup_settings_if_needed();
}
function initconfig() {
    if(restore_settings_if_needed()) return;

    localStorage['_ADVANCED_USER']=localStorage['_ADVANCED_USER']||'off';
    // 弹幕合并
    localStorage['THRESHOLD']=localStorage['THRESHOLD']||20;
    localStorage['MAX_DIST']=localStorage['MAX_DIST']||5;
    localStorage['MAX_COSINE']=localStorage['MAX_COSINE']||60;
    localStorage['TRIM_ENDING']=localStorage['TRIM_ENDING']||'on';
    localStorage['TRIM_SPACE']=localStorage['TRIM_SPACE']||'on';
    localStorage['TRIM_WIDTH']=localStorage['TRIM_WIDTH']||'on';
    // 例外设置
    localStorage['TAOLUS']=localStorage['TAOLUS']||'[["^23{2,}$","233..."],["^6{3,}$","666..."],["^[fF]+$","FFF..."],["^[hH]+$","hhh..."],["^[yYoO0][yYoO0\\\\s~]+$","yoo..."]]';
    localStorage['WHITELIST']=localStorage['WHITELIST']||'[]';
    localStorage['CROSS_MODE']=localStorage['CROSS_MODE']||'on';
    localStorage['PROC_TYPE7']=localStorage['PROC_TYPE7']||'on';
    localStorage['PROC_TYPE4']=localStorage['PROC_TYPE4']||'on';
    localStorage['PROC_POOL1']=localStorage['PROC_POOL1']||'off';
    // 显示设置
    localStorage['DANMU_MARK']=localStorage['DANMU_MARK']||'prefix';
    localStorage['MARK_THRESHOLD']=localStorage['MARK_THRESHOLD']||1;
    localStorage['DANMU_SUBSCRIPT']=localStorage['DANMU_SUBSCRIPT']||'on';
    localStorage['ENLARGE']=localStorage['ENLARGE']||'on';
    localStorage['SHRINK']=localStorage['SHRINK']||'off';
    // 播放器增强
    localStorage['TOOLTIP']=localStorage['TOOLTIP']||'on';
    localStorage['AUTO_PREVENT_SHADE']=localStorage['AUTO_PREVENT_SHADE']||'off';
    localStorage['AUTO_DISABLE_DANMU']=localStorage['AUTO_DISABLE_DANMU']||'off';
    localStorage['FLUCTLIGHT']=localStorage['FLUCTLIGHT']||'off';
    localStorage['FOOLBAR']=localStorage['FOOLBAR']||'off';
    // 实验室
    localStorage['REMOVE_SEEK']=localStorage['REMOVE_SEEK']||'off';
    localStorage['BREAK_UPDATE']=localStorage['BREAK_UPDATE']||'off';
    localStorage['BLACKLIST']=localStorage['BLACKLIST']||'[]';
    localStorage['HIDE_THRESHOLD']=localStorage['HIDE_THRESHOLD']||0;
    localStorage['SCROLL_THRESHOLD']=localStorage['SCROLL_THRESHOLD']||900;
    // 其他
    localStorage['POPUP_BADGE']=localStorage['POPUP_BADGE']||'percent';
    localStorage['FLASH_NOTIF']=localStorage['FLASH_NOTIF']||'on';
    loadconfig();
}
initconfig();

chrome.notifications.onButtonClicked.addListener(function(notifid,btnindex) {
    if(btnindex==0)  // goto settings
        chrome.tabs.create({url: (notifid==='http'?'http':'https') + '://www.bilibili.com/blackboard/help.html#p'},function(tab) {
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

function inject_panel(tabid,D,OPT) {
    chrome.tabs.executeScript(tabid,{
        code: 'var D='+JSON.stringify(D)+'; var OPT='+JSON.stringify(OPT),
        runAt: 'document_start'
    });
    ['utils','fluctlight','panel','foolbar'].forEach(function(name) {
        chrome.tabs.executeScript(tabid,{
            file: '/injected/'+name+'.js',
            runAt: 'document_start'
        });
    });
    setTimeout(function() {
        chrome.tabs.executeScript(tabid,{
            file: '/injected/do_inject.js',
            runAt: 'document_start'
        });
    },200);
}

chrome.runtime.onInstalled.addListener(function(details) {
    if(TEST_MODE) {
        chrome.notifications.create('//test', {
            type: 'basic',
            iconUrl: chrome.runtime.getURL('assets/logo.png'),
            title: 'pakku.js is running in test mode',
            message: 'this should not be happening. please report a bug if you see this message.',
            contextMessage: navigator.userAgent
        }, function(){});
        return;
    }
    if(details.reason=='install') {
        chrome.tabs.create({url: chrome.runtime.getURL('options/options.html')});
        chrome.notifications.create('//init', {
            type: 'basic',
            iconUrl: chrome.runtime.getURL('assets/logo.png'),
            title: '你切换到B站 HTML5 播放器了吗？',
            message: '我们不兼容B站的 Flash 播放器。请切换到B站的 HTML5 播放器来让 pakku 过滤弹幕。',
            contextMessage: '如果你不确定要选什么，选第一项就对了',
            isClickable: false,
            requireInteraction: true,
            buttons: [
                {title: '→ 切换到 HTML5 播放器'},
                {title: '我已经在用 HTML5 播放器了'}
            ]
        }, function(){});
    } else {
        migrate_legacy_taolus();
        migrate_legacy_fuzz();
    }
});

function down_danmaku(url,id,tabid) {
    chrome.browserAction.setTitle({
        title: '正在下载弹幕文件…',
        tabId: tabid
    });
    setbadge('↓',LOADING_COLOR,tabid);
    
    var xhr=new XMLHttpRequest();
    console.log('load '+url+' for CID '+id);
    
    try {
        xhr.open('get',url+'?pakku_request',false);
        xhr.send();
    } catch(e) {
        setbadge('NET!',ERROR_COLOR,tabid);
        HISTORY[tabid]=FailingStatus(id,'网络错误',e.stack);
        throw e;
    }
    
    try {
        if(xhr.status!==200) throw new Error('xhr.status = '+xhr.status);
        return xhr.response;
    } catch(e) {
        setbadge('SVR!',ERROR_COLOR,tabid);
        HISTORY[tabid]=FailingStatus(id,'B站弹幕服务器错误',e.stack);
        throw e;
    }
}

function load_danmaku(resp,id,tabid) {    
    try {
        chrome.browserAction.setTitle({
            title: '正在处理弹幕…',
            tabId: tabid
        });
        setbadge('...',LOADING_COLOR,tabid);
        var rxml=parse_xml_magic(resp);

        var S=Status(id);
        var D=[];
        
        var res=parse(rxml,tabid,S,D);
        var counter=S.total-S.onscreen;
        
        setbadge((
                POPUP_BADGE=='count' ? ''+counter :
                POPUP_BADGE=='percent' ? (S.total ? (counter*100/S.total).toFixed(0)+'%' : '0%') :
                ''
            ),SUCCESS_COLOR,tabid
        );
        chrome.browserAction.setTitle({
            title: '已过滤 '+counter+'/'+S.total+' 弹幕',
            tabId: tabid
        });
        
        inject_panel(tabid,D,{
            IS_FIREFOX: IS_FIREFOX,
            TOOLTIP: TOOLTIP,
            AUTO_PREVENT_SHADE: AUTO_PREVENT_SHADE,
            AUTO_DISABLE_DANMU: AUTO_DISABLE_DANMU,
            FLUCTLIGHT: FLUCTLIGHT,
            FOOLBAR: FOOLBAR
        });
        
        HISTORY[tabid]=S;
        chrome.runtime.sendMessage({type:'browser_action_reload'});

        return res;
    } catch(e) {
        setbadge('JS!',ERROR_COLOR,tabid);
        HISTORY[tabid]=FailingStatus(id,'弹幕处理失败',e.message+'\n\n'+e.stack);
        throw e;
    }
}

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse) {
    if (request.type==='ajax_hook') {
        if(!GLOBAL_SWITCH)
            return sendResponse({data: null});
        var tabid=sender.tab.id;
        console.log('message',request);
        var ret=DANMU_URL_RE.exec(request.url);
        if(ret) {
            var protocol=ret[1], nonce=ret[2], cid=ret[3], debug=ret[4];
            if(nonce==BOUNCE.nonce)
                return sendResponse({data: BOUNCE.result});
            var data=load_danmaku(down_danmaku(request.url,cid,tabid),cid,tabid);
            sendResponse({data: data});
        } else
            sendResponse({data: null});
    } else if(request.type==='foolbar') {
        if(!GLOBAL_SWITCH)
            set_global_switch(true,'yes do not reload');
        BOUNCE.nonce=request.nonce;
        BOUNCE.result=request.result;
        return sendResponse({error: null});
    } else if(request.type==='crack_uidhash') {
        return sendResponse(crack_uidhash(request.hash));
    } else if(request.type==='crack_uidhash_batch') {
        request.hashes.forEach(function(d) {
            d.cracked_uid=crack_uidhash(d.peers[0].attr[6])[0];
        });
        return sendResponse(request.hashes);
    } else if(request.type==='reportness') {
        return sendResponse(REPORTNESS);
    } else if(request.type==='need_ajax_hook') {
        return sendResponse(!(browser && browser.webRequest.filterResponseData));
    }
});

function hook_stream_filter(filter,id,tabid) {
    var decoder=new TextDecoder('utf-8');
    var encoder=new TextEncoder();
    var str='';

    chrome.browserAction.setTitle({
        title: '正在下载弹幕文件…',
        tabId: tabid
    });
    setbadge('↓',LOADING_COLOR,tabid);

    filter.ondata=function(event) {
        str+=decoder.decode(event.data,{stream:true});
    };
    filter.onstop=function(event) {
        if(!str) {
            setbadge('NET!',ERROR_COLOR,tabid);
            HISTORY[tabid]=FailingStatus(id,'网络错误','filter.status = '+filter.status+'\nstr = '+str);
            filter.disconnect();
        } else {
            filter.write(encoder.encode(load_danmaku(str,id,tabid)));
            filter.close();
        }
    };
    filter.onerror=function(event) {
        setbadge('NET!',ERROR_COLOR,tabid);
        HISTORY[tabid]=FailingStatus(id,'网络错误',filter.error);
        filter.disconnect();
    };
}

chrome.webRequest.onBeforeRequest.addListener(function(details) {
    if(!GLOBAL_SWITCH)
        return {cancel: false};
    
    var ret=DANMU_URL_RE.exec(details.url);
    if(ret) {
        console.log('webrequest',details);
        var protocol=ret[1], nonce=ret[2], cid=ret[3], debug=ret[4];
        if(nonce==BOUNCE.nonce)
            return {redirectUrl: 'data:text/xml;charset=utf-8,'+BOUNCE.result};
        
        /*for-firefox:

        if(browser.webRequest.filterResponseData) {
            var filter=browser.webRequest.filterResponseData(details.requestId);
            hook_stream_filter(filter,cid,details.tabId);
            return {cancel: false};
        }

        */

        if(debug || details.type==='xmlhttprequest')
            return {
                redirectUrl: 'data:text/xml;charset=utf-8,'+
                    load_danmaku(down_danmaku(details.url,cid,details.tabId),cid,details.tabId)
            };
        else {
            setbadge('FL!',ERROR_COLOR,details.tabId);
            HISTORY[details.tabId]=FailingStatus(cid,'已忽略非 HTML5 播放器的请求','details.type = '+details.type);
            if(details.type!=='main_frame' && FLASH_NOTIF)
                chrome.notifications.create(protocol||'https', {
                    type: 'basic',
                    iconUrl: chrome.runtime.getURL('assets/logo.png'),
                    title: 'pakku 没有在正常工作',
                    message: '切换到B站 HTML5 播放器来让 pakku 过滤视频中的弹幕。',
                    contextMessage: '（在 pakku 的选项中可以关闭此提醒）',
                    isClickable: false,
                    requireInteraction: true,
                    buttons: [
                        {title: '→ 点我一键切换'},
                        {title: '忽略'}
                    ]
                }, function(){});
            return {cancel: false};
        }
    }
    else
        return {cancel: false};
}, {urls: ['*://comment.bilibili.com/*']}, ['blocking']);

chrome.commands.onCommand.addListener(function(name) {
    if(name==='toggle-global-switch') {
        set_global_switch(!GLOBAL_SWITCH);
        var status=(GLOBAL_SWITCH?'ON':'OFF');
        chrome.notifications.create('//switch', {
            type: 'basic',
            iconUrl: chrome.runtime.getURL('assets/logo.png'),
            title: '[ '+status+' ]',
            message: 'Pakku is '+status
        });
        if(this._clearer)
            clearTimeout(this._clearer);
        this._clearer=setTimeout(function() {
            chrome.notifications.clear('//switch');
        },700);
    }
});

function load_update_breaker() {
    chrome.webRequest.onBeforeRequest.removeListener(req_breaker,update_filter,['blocking']);
    if(BREAK_UPDATE)
        chrome.webRequest.onBeforeRequest.addListener(req_breaker,update_filter,['blocking']);
}

if(REPORTNESS) {
    var r=document.createElement('iframe');
    r.src=REPORTNESS;
    document.head.appendChild(r);
}

if(TEST_MODE) {
    chrome.webRequest.onBeforeRequest.addListener(function(details) {
        return {redirectUrl: 'data:text/html,<title>'+encodeURIComponent(chrome.runtime.getURL('options/options.html'))+'</title>'};
    }, {urls: ['*://_xmcp_pakku_internal_test_domain.bilibili.com/get_options_url']}, ['blocking']);

    chrome.webRequest.onBeforeRequest.addListener(function(details) {
        TAOLUS=[[/.*/,"pakku_another_str"]];
        chrome.tabs.executeScript({
            'code': 'if(typeof reload_danmaku_magic!="undefined") reload_danmaku_magic();'
        });
        return {cancel: true};
    }, {urls: ['*://_xmcp_pakku_internal_test_domain.bilibili.com/change_taolus_and_reload']}, ['blocking']);
    
    function parse_string(str) {
        var parser=new DOMParser();
        var dom=parser.parseFromString(str,'text/xml');
        return parse(dom,0,Status(0),[]);
    }
}
