// (C) 2018 @xmcp. THIS PROJECT IS LICENSED UNDER GPL VERSION 3. SEE `LICENSE.txt`.

/*

[Technical Note]
Pakku tampers the danmaku request by:

- Chrome:       webRequest.onBeforeRequest listener + Data-URI  [for all requests]
                chrome.runtime.onMessageExternal listener (async) [if 9alpha is enabled]

- Firefox <52:  AJAX Hook + runtime.onMessage listener (async)  [for xhr requests]
                webRequest.onBeforeRequest listener + Data-URI  [for other requests]

- Firefox <57:  AJAX Hook + runtime.onMessage listener (async)  [for xhr requests]
                webRequest.onBeforeRequest listener (async) + Data-URI  [for other requests]

- Firefox >=57: webRequest.onBeforeRequest listener + Stream Filter (async)  [for all requests]

*/

// note: need to change the rule in xhr_hook.js too
var TRAD_DANMU_URL_RE=/(.+):\/\/comment\.bilibili\.com\/(?:rc\/)?(?:dmroll,[\d\-]+,)?(\d+)(?:\.xml)?(\?debug)?$/;
var NEW_DANMU_NORMAL_URL_RE=/(.+):\/\/api\.bilibili\.com\/x\/v1\/dm\/list.so\?oid=(\d+)(\&debug)?$/;
var NEW_DANMU_HISTORY_URL_RE=/(.+):\/\/api\.bilibili\.com\/x\/v2\/dm\/history\?type=\d+&oid=(\d+)&date=[\d\-]+(\&debug)?$/;
var DANMU_URL_FILTER=['*://comment.bilibili.com/*','*://api.bilibili.com/x/v1/dm/*','*://api.bilibili.com/x/v2/dm/*']

function parse_danmu_url(url) {
    // var protocol=ret[1], cid=ret[2], debug=ret[3], type=ret[4];
    function addtype(type,res) {
        return res ? res.concat(type) : res;
    }

    if(url.indexOf('//comment.bilibili.com/')!==-1)
        return addtype('trad',TRAD_DANMU_URL_RE.exec(url));
    else if(url.indexOf('/list.so?')!==-1)
        return addtype('list',NEW_DANMU_NORMAL_URL_RE.exec(url));
    else if(url.indexOf('/history?')!==-1) {
        return addtype('history',NEW_DANMU_HISTORY_URL_RE.exec(url));
    }
    else
        return null;
}

function load_userinfo_batch(hashes,store,final_callback,silence) {
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

    if(!silence)
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

    if(!silence)
        setTimeout(function() {
            chrome.notifications.update(notif_id,{
                message: '正在下载 0/'+jobs.length
            });
        },20);

    var completed_cnt=0;
    function progress_callback() {
        completed_cnt++;
        if(completed_cnt==jobs.length) {
            console.log('load userinfo finished, error_count =',error_count);
            if(!silence)
                setTimeout(function() {
                    chrome.notifications.clear(notif_id);
                },50); // to make sure it is correctly cleared
            final_callback(error_count);
        } else {
            if(!silence)
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

    if(jobs.length==0) {
        completed_cnt--;
        progress_callback();
    }
}

function load_update_breaker() {
    chrome.webRequest.onBeforeRequest.removeListener(req_breaker,update_filter,['blocking']);
    if(BREAK_UPDATE)
        chrome.webRequest.onBeforeRequest.addListener(req_breaker,update_filter,['blocking']);
}

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
    if(tabid<=0) {
        console.log('inject panel: tabid',tabid,'IGNORED');
        return;
    }
    chrome.tabs.executeScript(tabid,{
        code: 'var D='+JSON.stringify(D)+'; var OPT='+JSON.stringify(OPT),
        allFrames: true,
        runAt: 'document_start'
    },function() {
        if(chrome.runtime.lastError) { // possibly not having host permission
            console.log('cannot inject panel. skipping.',chrome.runtime.lastError);
            return;
        }
        if(OPT['FOOLBAR'])
            fetch_alasql(tabid);
        setTimeout(function() {
            chrome.tabs.executeScript(tabid,{
                file: '/injected/all_injected.js',
                allFrames: true,
                runAt: 'document_idle'
            });
        },200);
    });
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
        xhr.open('get',add_pakku_fingerprint(url),false);
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
            xhr.open('get',add_pakku_fingerprint(url));
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
            CID: id,
            TOOLTIP: TOOLTIP,
            AUTO_DISABLE_DANMU: AUTO_DISABLE_DANMU,
            AUTO_DANMU_LIST: AUTO_DANMU_LIST,
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
        var ret=parse_danmu_url(request.url);
        if(ret) {
            var protocol=ret[1], cid=ret[2], debug=ret[3];
            if(check_xml_bounce(cid))
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
        BOUNCE.cid=request.cid;
        BOUNCE.set_time=(+new Date());
        BOUNCE.result=request.result;
        console.log('set xml bounce for cid',request.cid);
        return sendResponse({error: null});
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
        },request.silence);
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

chrome.webRequest.onBeforeRequest.addListener(onbeforerequest=function(details) {
    if(!GLOBAL_SWITCH)
        return {cancel: false};
    
    var ret=parse_danmu_url(details.url);
    if(ret) {
        var protocol=ret[1], cid=ret[2], debug=ret[3], type=ret[4];
        
        /*for-firefox:

        if(browser.webRequest.filterResponseData) {
            if(check_xml_bounce(cid)) {
                console.log('bounce :: stream filter',cid);
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

        if(check_xml_bounce(cid)) {
            console.log('bounce :: redirect',cid);
            return {redirectUrl: make_xml_datauri(BOUNCE.result)};
        }

        if(debug || details.type==='xmlhttprequest') {
            if(type=='history') { // temporary bugfix
                console.log('webrequest :: SKIPPING history request');
                return {cancel: false};
            }

            /*for-firefox:
            
            if(FIREFOX_VERSION>=52) {
                console.log('webrequest :: async',details);
                return new Promise(function(resolve,reject) {
                    down_danmaku_async(details.url,cid,details.tabId)
                        .then(function(res) {
                            resolve({
                                redirectUrl: make_xml_datauri(load_danmaku(res,cid,details.tabId))
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
                redirectUrl: make_xml_datauri(load_danmaku(down_danmaku(details.url,cid,details.tabId),cid,details.tabId))
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
}, {urls: DANMU_URL_FILTER}, ['blocking']);

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
