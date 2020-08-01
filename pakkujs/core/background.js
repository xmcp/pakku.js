// 2017-2020 @xmcp. THIS PROJECT IS LICENSED UNDER GPL VERSION 3. SEE `LICENSE.txt`.

/*

[Technical Note]
Pakku tampers the danmaku request by:

- Firefox <57 and Chrome:  AJAX Hook + runtime.onMessage listener
- Firefox >=57: webRequest.onBeforeRequest listener + Stream Filter (async)

*/

// note: need to change the rule in xhr_hook.js too
var TRAD_DANMU_URL_RE=/(.+):\/\/comment\.bilibili\.com\/(?:rc\/)?(?:dmroll,[\d\-]+,)?(\d+)(?:\.xml)?$/;
var NEW_DANMU_NORMAL_URL_RE=/(.+):\/\/api\.bilibili\.com\/x\/v1\/dm\/list\.so\?oid=(\d+)$/;
var PROTO_DANMU_SEG_URL_RE=/(.+):\/\/api\.bilibili\.com\/x\/v2\/dm\/web\/seg\.so\?.*?oid=(\d+)&pid=(\d+).*?$/;
var NEW_DANMU_HISTORY_URL_RE=/(.+):\/\/api\.bilibili\.com\/x\/v2\/dm\/history\?type=\d+&oid=(\d+)&date=[\d\-]+$/;
var DANMU_URL_FILTER=['*://comment.bilibili.com/*','*://api.bilibili.com/x/v1/dm/*','*://api.bilibili.com/x/v2/dm/*']

// https://github.com/xmcp/pakku.js/issues/145

chrome.notifications.onButtonClicked.addListener(function(notif_id,btn_idx) {
    if(notif_id=='//perm_hotfix') {
        chrome.permissions.request({
            origins: ['*://*.bilibili.com/*'],
            permissions: ['webRequest','webRequestBlocking'],
        }, function(granted) {
            if(granted) {
                chrome.notifications.update('//perm_hotfix',{
                    title: '权限修复成功',
                    message: '您可能需要刷新已经打开的B站页面',
                    requireInteraction: false,
                    buttons: [],
                })
            }
        });
    }
});

function check_chrome_permission_hotfix(tabid,cid) {
    console.log('checking chrome permission hotfix');
    chrome.permissions.getAll(function(perms) {
        if(perms.origins.indexOf('*://*.bilibili.com/*')==-1) {
            if(cid) {
                HISTORY[tabid]=FailingStatus(cid,'权限不足','当前权限：\n'+JSON.stringify(perms));
            }

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
    })
}

function parse_danmu_url(url) { // returns {url, type, cid, pid?}
    // ret_type=(type.indexOf('proto_')==0)?'protobuf':'xml' in other code
    // so protobuf results should starts with `proto_`

    var res;

    if(url.indexOf('pakku_request')!==-1)
        return null;

    if(url.indexOf('//comment.bilibili.com/')!==-1) {
        res=TRAD_DANMU_URL_RE.exec(url);
        return {
            url: url,
            type: 'trad',
            cid: res[2],
        };
    } else if(url.indexOf('/list.so?')!==-1) {
        res=NEW_DANMU_NORMAL_URL_RE.exec(url);
        return {
            url: url,
            type: 'list',
            cid: res[2],
        };
    } else if(url.indexOf('/history?')!==-1) {
        res=NEW_DANMU_HISTORY_URL_RE.exec(url);
        return {
            url: url,
            type: 'history',
            cid: res[2],
        };
    } else if(url.indexOf('/seg.so')!==-1) {
        res=PROTO_DANMU_SEG_URL_RE.exec(url);
        if(/segment_index=1(?!\d)/.test(url))
            return {
                url: url,
                type: 'proto_seg',
                cid: res[2],
                pid: res[3],
            };
        else
            return {
                url: url,
                type: 'proto_segtrail',
                cid: res[2],
                pid: res[3],
            };
    } else
        return null;
}

function load_update_breaker() {
    chrome.webRequest.onBeforeRequest.removeListener(req_breaker,update_filter,['blocking']);
    if(BREAK_UPDATE)
        chrome.webRequest.onBeforeRequest.addListener(req_breaker,update_filter,['blocking']);
}

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
        setTimeout(function() {
            chrome.tabs.insertCSS(tabid, {
                file: '/injected/all_injected.css',
                allFrames: true,
                runAt: 'document_end'
            });
            chrome.tabs.executeScript(tabid, {
                file: '/injected/all_injected.js',
                allFrames: true,
                runAt: 'document_end'
            });
        },100);
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
        chrome.tabs.create({url: chrome.runtime.getURL('page/options.html')});
    } else if(details.reason=='update') {
        migrate_legacy();
    }
});

function down_danmaku_xml_async(url,cid,tabid) {
    return new Promise(function(resolve,reject) {
        chrome.browserAction.setTitle({
            title: '正在下载弹幕文件…',
            tabId: tabid
        });
        setbadge('↓',LOADING_COLOR,tabid);
        
        var xhr=new XMLHttpRequest();
        console.log('load (xml) '+url+' for CID '+cid);
        
        try {
            xhr.open('get',add_pakku_fingerprint(url));
            xhr.onerror=function() {
                setbadge('SVR!',ERROR_COLOR,tabid);
                HISTORY[tabid]=FailingStatus(cid,'B站弹幕服务器错误','xhr.status = '+xhr.status);
                check_chrome_permission_hotfix(tabid,cid);
                return reject(new Error('SVR!'));
            };
            xhr.onload=function() {
                return resolve(xml_to_ir(xhr.response));
            };
            xhr.send();
        } catch(e) {
            setbadge('NET!',ERROR_COLOR,tabid);
            HISTORY[tabid]=FailingStatus(cid,'网络错误',e.message+'\n\n'+e.stack);
            check_chrome_permission_hotfix(tabid,cid);
            return reject(e);
        }
    });
}

function down_danmaku_protobuf_async(cid,pid,tabid) {
    chrome.browserAction.setTitle({
        title: '正在下载弹幕文件…',
        tabId: tabid
    });
    setbadge('↓',LOADING_COLOR,tabid);
    
    console.log('load (protobuf) for CID '+cid);

    // preload first chunk to save time for short videos
    var first_chunk_req=protoapi_get_seg(cid,pid,1);

    return (
        protoapi_get_view(cid,pid)
            .then(function(pages) {
                return protoapi_get_segs(cid,pid,pages,first_chunk_req);
            })
            .then(function(dms) {
                return protobuf_to_ir(dms,cid);
            })
            .catch(function(e) {
                setbadge('NET!',ERROR_COLOR,tabid);
                HISTORY[tabid]=FailingStatus(cid,'网络错误',e.message+'\n\n'+e.stack);
                check_chrome_permission_hotfix(tabid,cid);
                throw e;
            })
    );
}

function load_danmaku(ir,id,tabid,ret_type) {
    ret_type=ret_type||'xml';
    try {
        chrome.browserAction.setTitle({
            title: '正在处理弹幕…',
            tabId: tabid
        });
        setbadge('...',LOADING_COLOR,tabid);

        var S=Status(id);
        var D=[];
        
        var new_ir=parse(ir,tabid,S,D);
        var counter=S.total-S.onscreen;
        
        if(tabid>0) {
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
        } else { // bug
            chrome.browserAction.setBadgeText({text: ''});
            chrome.browserAction.setTitle({title: 'pakku'});
        }
        
        inject_panel(tabid,D,{
            CID: id,
            TOOLTIP: TOOLTIP,
            AUTO_DISABLE_DANMU: AUTO_DISABLE_DANMU,
            AUTO_DANMU_LIST: AUTO_DANMU_LIST,
            FLUCTLIGHT: FLUCTLIGHT
        });
        
        HISTORY[tabid]=S;
        chrome.runtime.sendMessage({type:'browser_action_reload'});

        if(ret_type==='protobuf')
            return ir_to_protobuf(new_ir);
        else
            return ir_to_xml(new_ir);
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
            var cid=ret.cid;
            var url_type=ret.type;

            var ret_type=(url_type.indexOf('proto_')==0)?'protobuf':'xml';

            if(url_type=='proto_segtrail') {
                console.log('skip trailing');
                return sendResponse({
                    data: empty_danmaku_proto_seg(),
                });
            }

            if(check_ir_bounce(cid)) {
                console.log('bounce :: message to',ret_type,BOUNCE.result);

                if(ret_type=='protobuf')
                    return sendResponse({data: ir_to_protobuf(BOUNCE.result)});
                else
                    return sendResponse({data: ir_to_xml(BOUNCE.result)});
            }

            
            var got_ir_promise;
            if(ret_type==='protobuf')
                got_ir_promise=down_danmaku_protobuf_async(cid,ret.pid,tabid);
            else
                got_ir_promise=down_danmaku_xml_async(request.url,cid,tabid);

            got_ir_promise
                .then(function(ir) {
                    sendResponse({data:load_danmaku(ir,cid,tabid,request.ret_type||ret_type)});
                })
                .catch(function() {
                    sendResponse({data:null});
                });
            return true;
        } else
            return sendResponse({data: null});
    } else if(request.type==='set_ir_bounce') {
        if(!GLOBAL_SWITCH)
            set_global_switch(true,'yes do not reload');
        BOUNCE.cid=request.cid;
        BOUNCE.set_time=(+new Date());
        BOUNCE.result=request.result;
        console.log('set ir bounce for cid',request.cid);
        return sendResponse({error: null});
    } else if(request.type==='crack_uidhash') {
        return sendResponse(crack_uidhash(request.hash));
    } else if(request.type==='crack_uidhash_batch') {
        request.dinfo.forEach(function(d) {
            d.cracked_uid=crack_uidhash(d.peers[0].ir_obj.sender_hash)[0];
        });
        return sendResponse(request.dinfo);
    } else if(request.type==='need_ajax_hook') {
        //console.log('request ajax hook',request.url);

        //                  chrome     or qipa     or firefox <57
        let browser_needed=!IS_FIREFOX || !browser || !browser.webRequest.filterResponseData;
        
        // skip injecting because window.Worker is necessary on that page
        let should_skip_inject=request.url.indexOf('member.bilibili.com/studio')!==-1;

        return sendResponse(
            browser_needed && !should_skip_inject
        );
    } else if(request.type==='xhr_proxy') { //to bypass CORB in content-script
        var xhr=new XMLHttpRequest();
        xhr.open(request.method,request.url);
        xhr.onreadystatechange=function() {
            if(this.readyState!==4) return;
            sendResponse({
                status: xhr.status,
                responseText: xhr.responseText
            });
        };
        xhr.send();
        return true;
    }
});

function hook_stream_filter(filter,url_parse_ret,tabid,ret_type) {
    ret_type=ret_type||'xml';
    var encoder=new TextEncoder();

    var loaded_res_first=null;
    var onstart_first=false;

    // called when both danmaku loaded and filter.onstart fired (otherwise filter.write is invalid)
    function finish(res) {
        //console.log('!! finish',ret_type,filter.status,res);
        if(ret_type=='protobuf') { // res is Uin8Array
            filter.write(res);
            filter.close();
        } else { // xml, res is string
            filter.write(encoder.encode(res));
            filter.close();
        }
    }

    var got_ir_promise;
    if(ret_type==='protobuf')
        got_ir_promise=down_danmaku_protobuf_async(url_parse_ret.cid,url_parse_ret.pid,tabid);
    else
        got_ir_promise=down_danmaku_xml_async(url_parse_ret.url,url_parse_ret.cid,tabid);

    got_ir_promise
        .then(function(ir) {
            var res=load_danmaku(ir,url_parse_ret.cid,tabid,ret_type);
            if(onstart_first) {
                //console.log('!! onstop -> [load]');
                finish(res);
            }
            else {
                //console.log('!! [load] -> onstop');
                loaded_res_first=res;
            }
        })
        .catch(function(err) {
            console.error(err);
            console.trace(err);
            //console.log('!! disconn');
            filter.disconnect();
        });

    filter.onstop=function() {
        if(loaded_res_first) {
            //console.log('!! load -> [onstop]');
            finish(loaded_res_first);
        } else {
            //console.log('!! [onstop] -> load')
            onstart_first=true;
        }
    }
}

function firefox_onbeforerequest(details) {
    // for firefox>=57

    if(!GLOBAL_SWITCH)
        return {cancel: false};
    
    var ret=parse_danmu_url(details.url);
    if(ret) {
        var cid=ret.cid;
        var url_type=ret.type;

        var ret_type=(url_type.indexOf('proto_')==0)?'protobuf':'xml';

        // trailing
        if(url_type=='proto_segtrail') {
            console.log('webrequest :: stream filter :: trailing',details);

            var filter=browser.webRequest.filterResponseData(details.requestId);
            
            filter.onstop=function(event) {
                filter.write(empty_danmaku_proto_seg());
                filter.close();
            };
            filter.onerror=function(event) {
                console.log(event.error);
            };
            return {cancel: false};
        }

        // bounce
        if(check_ir_bounce(cid)) {
            console.log('bounce :: stream filter',cid);
            var filter=browser.webRequest.filterResponseData(details.requestId);
            
            var encoder=new TextEncoder();
            filter.onstop=function(event) {
                if(ret_type=='protobuf')
                    filter.write(encoder.encode(ir_to_prorotobuf(BOUNCE.result)));
                else
                    filter.write(encoder.encode(ir_to_xml(BOUNCE.result)));
                filter.close();
            };
            filter.onerror=function(event) {
                console.log(event.error);
            };
            return {cancel: false};
        }

        console.log('webrequest :: stream filter',details);
        var filter=browser.webRequest.filterResponseData(details.requestId);
        hook_stream_filter(filter,ret,details.tabId,ret_type);
        return {cancel: false};
    }
    else
        return {cancel: false};
}

/*for-firefox:

if(browser.webRequest.filterResponseData)
    chrome.webRequest.onBeforeRequest.addListener(firefox_onbeforerequest, {urls: DANMU_URL_FILTER}, ['blocking']);

*/

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
    } else if(name==='show-local') {
        chrome.tabs.create({url: chrome.runtime.getURL('page/parse_local.html')});
    }
});
