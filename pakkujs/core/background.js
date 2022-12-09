// 2017-2022 @xmcp. THIS PROJECT IS LICENSED UNDER GPL VERSION 3. SEE `LICENSE.txt`.

// note: need to change the rule in xhr_hook.js too
var TRAD_DANMU_URL_RE=/(.+):\/\/comment\.bilibili\.com\/(?:rc\/)?(?:dmroll,[\d\-]+,)?(\d+)(?:\.xml)?$/;
var NEW_DANMU_NORMAL_URL_RE=/(.+):\/\/api\.bilibili\.com\/x\/v1\/dm\/list\.so\?oid=(\d+)$/;
var PROTO_DANMU_SEG_URL_RE=/(.+):\/\/api\.bilibili\.com\/x\/v2\/dm\/web\/seg\.so\?.*?oid=(\d+)&pid=(\d+).*?$/;
var PROTO_DANMU_HISTORY_URL_RE=/(.+):\/\/api\.bilibili\.com\/x\/v2\/dm\/web\/history\/seg\.so\?type=\d+&oid=(\d+)&date=([\d\-]+)$/;

var UID_MAX_DIGIT=10;
var UID_MAX_DIGIT_BATCH=9; // because 10 digit is too slow

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

var _CID_TO_PID={};

function parse_danmu_url(url) { // returns {url, type, filtering, cid, pid?}
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
            filtering: function(_ir) {return true;},
            cid: res[2],
        };
    } else if(url.indexOf('/list.so?')!==-1) {
        res=NEW_DANMU_NORMAL_URL_RE.exec(url);
        return {
            url: url,
            type: 'list',
            filtering: function(_ir) {return true;},
            cid: res[2],
        };
    } else if(url.indexOf('/history/seg.so?')!==-1) {
        res=PROTO_DANMU_HISTORY_URL_RE.exec(url);
        var date=res[3];
        if(date.indexOf('197')===0) // magic reload use timestamp near 0
            return {
                url: url,
                type: 'proto_magicreload',
                filtering: function(_ir) {return true;},
                cid: res[2],
                pid: _CID_TO_PID[res[2]]||0,
            };
        else // real history
            return {
                url: url,
                type: 'proto_history',
                filtering: function(_ir) {return true;},
                cid: res[2],
                pid: _CID_TO_PID[res[2]]||0,
            };
    } else if(url.indexOf('/seg.so')!==-1) {
        res=PROTO_DANMU_SEG_URL_RE.exec(url);
        _CID_TO_PID[res[2]]=res[3];
        var url_param=new URLSearchParams(url.split('?')[1]);

        var segidx=parseInt(url_param.get('segment_index')||'1');
        var ps=parseInt(url_param.get('ps')||'0');
        var pe=parseInt(url_param.get('pe')||'999999999999');
        
        return {
            url: url,
            type: 'proto_seg',
            filtering: function(ir) {
                return ir.extra.proto_segidx==segidx && ps<=ir.time_ms && ir.time_ms<pe;
            },
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

function down_danmaku_protobuf_url_async(cid,url,tabid) {
    chrome.browserAction.setTitle({
        title: '正在下载弹幕文件…',
        tabId: tabid
    });
    setbadge('↓',LOADING_COLOR,tabid);
    
    console.log('load (protobuf) URL '+url+' for CID '+cid);

    return (
        protobuf_get_url(url)
            .then(function(dms) {
                return protobuf_to_ir([[1, dms]],cid);
            })
            .catch(function(e) {
                setbadge('NET!',ERROR_COLOR,tabid);
                HISTORY[tabid]=FailingStatus(cid,'网络错误',e.message+'\n\n'+e.stack);
                check_chrome_permission_hotfix(tabid,cid);
                throw e;
            })
    );
}

var _IR_CACHE={}; // tabid -> {cid, data}

function load_danmaku(ir,id,tabid,ret_type,filter_fn) {
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
            FLUCTLIGHT: FLUCTLIGHT,
            TOOLTIP_KEYBINDING: TOOLTIP_KEYBINDING,
        });
        
        HISTORY[tabid]=S;
        chrome.runtime.sendMessage({type: 'browser_action_reload'});

        var ir_cache_data={cid: id, data: new_ir, time_protection: +new Date()};;
        _IR_CACHE[tabid]=ir_cache_data;
        console.log('ir cache :: set', tabid, ir_cache_data);

        if(ret_type==='protobuf')
            return ir_to_protobuf(new_ir,filter_fn);
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
        var tabid=sender.tab.id;
        console.log('message',request);
        var ret=parse_danmu_url(request.url);
        if(ret) {
            var cid=ret.cid;
            var url_type=ret.type;
            if(!GLOBAL_SWITCH && url_type!='proto_magicreload') // tamper magic reload even if switch is off: avoid HTTP 400
                return sendResponse({data: null});

            var ret_type=(url_type.indexOf('proto_')==0)?'protobuf':'xml';

            if(check_ir_bounce(cid)) {
                console.log('bounce :: message to',ret_type,BOUNCE.result);

                if(ret_type=='protobuf')
                    return sendResponse({data: ir_to_protobuf(BOUNCE.result)});
                else
                    return sendResponse({data: ir_to_xml(BOUNCE.result)});
            }

            function get_ir_promise() {
                var got_ir_promise;
                if(url_type=='proto_history')
                    got_ir_promise=down_danmaku_protobuf_url_async(cid,request.url,tabid);
                else if(ret_type==='protobuf')
                    got_ir_promise=down_danmaku_protobuf_async(cid,ret.pid,tabid);
                else
                    got_ir_promise=down_danmaku_xml_async(request.url,cid,tabid);
                return got_ir_promise;
            }

            if(!GLOBAL_SWITCH && url_type=='proto_magicreload') { // return unmodified ir obj if switch is off
                get_ir_promise()
                    .then(function(ir) {
                        setbadge('',SUCCESS_COLOR,tabid);
                        sendResponse({data:ir_to_protobuf(ir)});
                    })
                    .catch(function() {
                        sendResponse({data:null});
                    });
                return true;
            }

            if(_IR_CACHE[tabid]) {
                if(_IR_CACHE[tabid].cid==cid) {
                    var new_ir=_IR_CACHE[tabid].data;
                    console.log('ir cached', cid, 'for tabid', tabid);

                    if((request.ret_type||ret_type)==='protobuf') {
                        sendResponse({data: ir_to_protobuf(new_ir,ret.filtering)});
                    }
                    else
                        sendResponse({data: ir_to_xml(new_ir)});
                    
                    return true;
                } else {
                    console.log('ir cache :: flushed', tabid,  'because cid mismatch', cid);
                    delete _IR_CACHE[tabid];
                }
            }

            get_ir_promise()
                .then(function(ir) {
                    sendResponse({data:load_danmaku(ir,cid,tabid,request.ret_type||ret_type,ret.filtering)});
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
        return sendResponse(crack_uidhash(request.hash,UID_MAX_DIGIT));
    } else if(request.type==='crack_uidhash_batch') {
        request.dinfo.forEach(function(d) {
            var res=crack_uidhash(d.peers[0].ir_obj.sender_hash,UID_MAX_DIGIT_BATCH);
            d.cracked_uid=res[0]||null;
        });
        return sendResponse(request.dinfo);
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
        },1000);
    } else if(name==='show-local') {
        chrome.tabs.create({url: chrome.runtime.getURL('page/parse_local.html')});
    }
});

chrome.tabs.onRemoved.addListener(function(tabId) {
    console.log('ir cache :: flushed', tabId, 'because tab removed');
    if(_IR_CACHE[tabId])
        delete _IR_CACHE[tabId];
});

chrome.tabs.onReplaced.addListener(function(addedTabId, removedTabId) {
    // https://stackoverflow.com/questions/23995642/when-will-the-tabid-change
    console.log('ir cache :: flushed', removedTabId, 'because tab replaced with', addedTabId);
    if(_IR_CACHE[removedTabId])
        delete _IR_CACHE[removedTabId];
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
    if(changeInfo.status) { // flush the cache if the page is refreshed
        if(changeInfo.status==='complete' && _IR_CACHE[tabId] && _IR_CACHE[tabId].time_protection+3000>(+new Date())) {
            // race: when ir cache is set first, and then the page is fully loaded
            _IR_CACHE[tabId].time_protection = -3000;
            return;
        }

        console.log('ir cache :: flushed', tabId, 'because tab updated', changeInfo);
        if(_IR_CACHE[tabId])
            delete _IR_CACHE[tabId];
    }
});