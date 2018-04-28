// (C) 2018 @xmcp. THIS PROJECT IS LICENSED UNDER GPL VERSION 3. SEE `LICENSE.txt`.

/*

[Technical Note]
Pakku tampers the danmaku request by:

- Chrome:       webRequest.onBeforeRequest listener + Data-URI  [for all requests]

- Firefox <52:  AJAX Hook + runtime.onMessage listener (async)  [for xhr requests]
                webRequest.onBeforeRequest listener + Data-URI  [for other requests]

- Firefox <57:  AJAX Hook + runtime.onMessage listener (async)  [for xhr requests]
                webRequest.onBeforeRequest listener (async) + Data-URI  [for other requests]

- Firefox >=57: webRequest.onBeforeRequest listener + Stream Filter (async)  [for all requests]

*/

var DANMU_URL_RE=/(.+):\/\/comment\.bilibili\.com\/(?:rc\/)?(?:dmroll,([\d\-]+),)?(\d+)(?:\.xml)?(\?debug)?$/;

function fromholyjson_orempry(str) {
    try {
        return fromholyjson(str);
    } catch(e) {
        setbadge('RE!',ERROR_COLOR,null);
        chrome.browserAction.setTitle({
            title: '规则错误，请重置pakku设置后重启浏览器：'+e.message
        });
        console.error(e);
        return [];
    }
}

function load_userinfo_batch(hashes,store,final_callback) {
    var notif_id='load_userinfo_notif_'+Math.random();

    var error_count=0;

    function load_job_slice(joblist,callback) { // joblist: uid->hash
        var xhr=new XMLHttpRequest();
        xhr.open('get','https://account.bilibili.com/api/member/getInfoByMid?mid='+Object.keys(joblist).join(','));
        xhr.onload=function() {
            try {
                var res=JSON.parse(xhr.responseText);
            } catch(e) {
                console.trace(e);
                error_count++;
                callback();
                return;
            }
            if(res.code!==0) {
                console.error('user info: response error',res,joblist);
                error_count++;
            } else {
                for(var uid in res.cards) {
                    if(!store[joblist[uid]] && res.cards[uid].level_info && res.cards[uid].level_info.current_exp)
                        store[joblist[uid]]=res.cards[uid];
                }
            }
            callback();
        };
        xhr.onerror=function() {
            console.error('user info: load job failed',joblist);
            error_count++;
            callback();
        };
        xhr.send();
    }

    var uids={};
    var jobs=[];

    chrome.notifications.create(notif_id,{
        iconUrl: chrome.runtime.getURL('assets/logo.png'),
        type: 'progress',
        title: '正在获取用户信息',
        message: '正在获取 UID',
        progress: 0,
        requireInteraction: true
    },function(){});

    console.time('load userinfo: crack batch');
    hashes.forEach(function(hash) {
        crack_uidhash(hash).forEach(function(uid) {
            uids[uid]=hash;
        })
    });
    console.timeEnd('load userinfo: crack batch');

    var uids_arr=Object.keys(uids).sort();

    while(uids_arr.length) {
        var curjob={};
        uids_arr.splice(0,100).forEach(function(uid) {
            curjob[uid]=uids[uid];
        });
        jobs.push(curjob);
    }

    chrome.notifications.update(notif_id,{
        message: '正在下载 0/'+jobs.length
    });

    var completed_cnt=0;
    function progress_callback() {
        completed_cnt++;
        if(completed_cnt==jobs.length) {
            console.log('load userinfo finished, error_count =',error_count);
            chrome.notifications.clear(notif_id);
            final_callback(error_count);
        } else {
            chrome.notifications.update(notif_id,{
                message: '正在下载 '+completed_cnt+'/'+jobs.length,
                progress: Math.floor(100*completed_cnt/jobs.length),
                contextMessage: '错误数量：'+error_count
            });
        }
    }

    jobs.forEach(function(job) {
        load_job_slice(job,progress_callback);
    });
}

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
    window.FORCELIST=fromholyjson_orempry(localStorage['FORCELIST']||'[]');
    window.WHITELIST=fromholyjson_orempry(localStorage['WHITELIST']||'[]');
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
    window.BLACKLIST=fromholyjson_orempry(localStorage['BLACKLIST'])||[];
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
    localStorage['FORCELIST']=localStorage['FORCELIST']||'[["^23{2,}$","233..."],["^6{3,}$","666..."],["^[fF]+$","FFF..."],["^[hH]+$","hhh..."],["^[yYoO0][yYoO0\\\\s~]+$","yoo..."]]';
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
    if(OPT['FOOLBAR'])
        fetch_alasql(tabid);
    setTimeout(function() {
        chrome.tabs.executeScript(tabid,{
            file: '/injected/do_inject.js',
            runAt: 'document_idle'
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
    } else if(details.reason=='update') {
        migrate_legacy();
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
        HISTORY[tabid]=FailingStatus(id,'网络错误',e.message+'\n\n'+e.stack);
        throw e;
    }
    
    try {
        if(xhr.status!==200) throw new Error('xhr.status = '+xhr.status);
        return xhr.response;
    } catch(e) {
        setbadge('SVR!',ERROR_COLOR,tabid);
        HISTORY[tabid]=FailingStatus(id,'B站弹幕服务器错误',e.message+'\n\n'+e.stack);
        throw e;
    }
}

function down_danmaku_async(url,id,tabid) {
    return new Promise(function(resolve,reject) {
        chrome.browserAction.setTitle({
            title: '正在下载弹幕文件…',
            tabId: tabid
        });
        setbadge('↓',LOADING_COLOR,tabid);
        
        var xhr=new XMLHttpRequest();
        console.log('load '+url+' for CID '+id);
        
        try {
            xhr.open('get',url+'?pakku_request');
            xhr.onerror=function() {
                setbadge('SVR!',ERROR_COLOR,tabid);
                HISTORY[tabid]=FailingStatus(id,'B站弹幕服务器错误','xhr.status = '+xhr.status);
                return reject(new Error('SVR!'));
            };
            xhr.onload=function() {
                return resolve(xhr.response);
            };
            xhr.send();
        } catch(e) {
            setbadge('NET!',ERROR_COLOR,tabid);
            HISTORY[tabid]=FailingStatus(id,'网络错误',e.message+'\n\n'+e.stack);
            return reject(e);
        }
    });
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
            
            down_danmaku_async(request.url,cid,tabid)
                .then(function(res) {
                    sendResponse({data:load_danmaku(res,cid,tabid)});
                })
                .catch(function() {
                    sendResponse({data:null});
                });
            return true;
        } else
            return sendResponse({data: null});
    } else if(request.type==='set_xml_bounce') {
        if(!GLOBAL_SWITCH)
            set_global_switch(true,'yes do not reload');
        BOUNCE.nonce='99'+~~(1+Math.random()*100000);;
        BOUNCE.result=request.result;
        return sendResponse({error: null, nonce: BOUNCE.nonce});
    } else if(request.type==='crack_uidhash') {
        return sendResponse(crack_uidhash(request.hash));
    } else if(request.type==='crack_uidhash_batch') {
        request.dinfo.forEach(function(d) {
            d.cracked_uid=crack_uidhash(d.peers[0].attr[6])[0];
        });
        return sendResponse(request.dinfo);
    } else if(request.type==='load_userinfo_batch') {
        var toload=[];
        request.dinfo.forEach(function(d) {
            toload.push(d.peers[0].attr[6]);
        });
        var store={};
        load_userinfo_batch(toload,store,function() {
            request.dinfo.forEach(function(d) {
                var info=store[d.peers[0].attr[6]];
                d.sender_info=info;
                d.cracked_uid=parseInt(info ? info.mid : null);
            });
            return sendResponse(request.dinfo);
        });
        return true;
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
        var protocol=ret[1], nonce=ret[2], cid=ret[3], debug=ret[4];
        
        /*for-firefox:

        if(browser.webRequest.filterResponseData) {
            if(nonce==BOUNCE.nonce) {
                console.log('bounce :: stream filter',nonce);
                var filter=browser.webRequest.filterResponseData(details.requestId);
                
                var encoder=new TextEncoder();
                filter.onstart=function(event) {
                    filter.write(encoder.encode(BOUNCE.result));
                    filter.close();
                };
                filter.onerror=function(event) {
                    console.log(event.error);
                };
                return {cancel: false};
            }

            console.log('webrequest :: stream filter',details);
            var filter=browser.webRequest.filterResponseData(details.requestId);
            hook_stream_filter(filter,cid,details.tabId);
            return {cancel: false};
        }

        */

        if(nonce==BOUNCE.nonce) {
            console.log('bounce :: redirect',nonce);
            return {redirectUrl: 'data:text/xml;charset=utf-8,'+BOUNCE.result};
        }

        if(debug || details.type==='xmlhttprequest') {
            /*for-firefox:
            
            if(FIREFOX_VERSION>=52) {
                console.log('webrequest :: async',details);
                return new Promise(function(resolve,reject) {
                    down_danmaku_async(details.url,cid,details.tabId)
                        .then(function(res) {
                            resolve({
                                redirectUrl: 'data:text/xml;charset=utf-8,'+
                                    load_danmaku(res,cid,details.tabId)
                            });
                        })
                        .catch(function() {
                            resolve({cancel: false});
                        });
                });
            }
            
            */

            console.log('webrequest :: sync',details);
            return {
                redirectUrl: 'data:text/xml;charset=utf-8,'+
                    load_danmaku(down_danmaku(details.url,cid,details.tabId),cid,details.tabId)
            };
        }
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
        FORCELIST=[[/.*/,"pakku_another_str"]];
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
