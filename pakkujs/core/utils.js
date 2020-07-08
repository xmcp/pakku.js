// 2017-2020 @xmcp. THIS PROJECT IS LICENSED UNDER GPL VERSION 3. SEE `LICENSE.txt`.

var TEST_MODE=navigator.userAgent.indexOf('xmcp_pakku_test_runner')!==-1;
var IS_FIREFOX=false;
var NOT_OVERRIDABLE_CONFIGS=[
    'CLOUD_SYNC'
];
var MATH_LOG5=Math.log(5);

var GLOBAL_SWITCH=true;
var HISTORY={};
var BOUNCE={
    cid: -1,
    set_time: -1,
    result: ''
};
var TEMPRULES={}; // id -> {FORCELIST: [], WHITELIST: []}

function check_ir_bounce(cid) {
    var res=cid==BOUNCE.cid && (+new Date())-BOUNCE.set_time<5000;
    if(res) {
        BOUNCE.set_time=-1;
    }
    return res;
}

/*for-firefox:

var _firefox_notif_mem={};

IS_FIREFOX=true;
chrome.notifications.create=function(txt,obj,callback) {
    if(obj['contextMessage']) {
        obj['message']+='\n'+obj['contextMessage'];
        delete obj['contextMessage'];
    }
    delete obj['isClickable'];
    delete obj['requireInteraction'];
    delete obj['buttons'];
    delete obj['progress'];
    browser.notifications.create(txt,obj).then(callback);
    _firefox_notif_mem[txt]={
        config: obj,
        time: +new Date(),
        pending: null
    };
}
chrome.notifications.update=function(txt,obj) {
    var mem=_firefox_notif_mem[txt];
    var new_obj=Object.assign(mem.config,obj);
    var delay=Math.max(mem.time+1000-(+new Date()),0);
    if(mem.pending)
        clearTimeout(mem.pending);
    mem.pending=setTimeout(function() {
        if(!_firefox_notif_mem[txt])
            return;
        browser.notifications.clear(txt);
        chrome.notifications.create(txt,new_obj,function(){});
    },delay);
}
chrome.notifications.clear=function(txt) {
    if(txt)
        delete _firefox_notif_mem[txt];
    browser.notifications.clear(txt);
}

var FIREFOX_VERSION=(function() {
    var ff_version=/Firefox\/([\d]+)/.exec(navigator.userAgent);
    if(ff_version) {
        var ver=parseInt(ff_version[1]);
        return isNaN(ver)?null:ver;
    }
    return null;
})();

*/

function fromholyjson(txt) {
    var item=JSON.parse(txt);
    for(var i in item)
        item[i][0]=RegExp(item[i][0]);
    return item;
}
function toholyjson(obj) {
    var item=[];
    for(var i in obj)
        item.push([obj[i][0].source,obj[i][1]]);
    return JSON.stringify(item);
}

function reload_danmaku() {
    chrome.tabs.executeScript({
        code: 'if(typeof reload_danmaku_magic!="undefined") reload_danmaku_magic();',
        allFrames: true
    });
}
function set_global_switch(sw,_do_no_reload) {
    GLOBAL_SWITCH=sw;
    chrome.browserAction.setBadgeText({
        text: GLOBAL_SWITCH?'':'zzz'
    });
    chrome.runtime.sendMessage({type:'browser_action_reload'});
    if(!_do_no_reload)
        reload_danmaku();
}

var ERROR_COLOR='#ff4444';
var LOADING_COLOR='#4444ff';
var SUCCESS_COLOR='#33aa33';

function setbadge(text,color,tabid) {
    if(tabid<=0 && text=='FL!') return;
    chrome.browserAction.setBadgeText({
        text: text,
        tabId: tabid
    });
    if(color)
        chrome.browserAction.setBadgeBackgroundColor({
            color: color,
            tabId: tabid
        });
}

function Status(CID) {
    return {
        identical: 0, // combined
        edit_distance: 0,
        pinyin_distance: 0,
        cosine_distance: 0,
        
        player_seek: 0, // deleted
        blacklist: 0,
        count_hide: 0,
        
        whitelist: 0, // ignored
        batch_ignore: 0,
        script: 0,
        
        enlarge: 0, // modified
        shrink: 0,
        scroll: 0,
        
        taolu: 0, // other
        total: 0,
        onscreen: 0,
        maxcombo: 0,
        maxdispval: 0,
        
        error: null,
        cid: CID,
        parse_time_ms: -1,
    };
}
function FailingStatus(CID,typ,details) {
    return {
        error: typ,
        cid: CID,
        details: details
    }
}
function TempRules() {
    return {'FORCELIST':[], 'WHITELIST':[]};
}

function req_breaker(details) {
    return {cancel: true/*GLOBAL_SWITCH*/};
}
var update_filter={urls: [
    'ws://chat.bilibili.com/*','wss://chat.bilibili.com/*',
    'ws://broadcast.chat.bilibili.com/sub','wss://broadcast.chat.bilibili.com/sub'
]};

function gen_set(st) {
    var obj={};
    for(var i=0;i<st.length;i++) {
        obj[st[i]]=true;
    }
    return obj;
}

function to_subscript(x) {
    // \u2080 is subscript_number_0
    return x ? to_subscript((x/10)|0)+String.fromCharCode(0x2080+x%10) : '';
}

// extracted from bilibiliPlayer.min.js
function parse_xml_magic(k) {
	try {
		k = k.replace(/[\x00-\x08\x0b-\x0c\x0e-\x1f\x7f]/g, "");
	} catch (c) {}
	return (new window.DOMParser).parseFromString(k, "text/xml");
}

function migrate_legacy() {
    (function migrate_legacy_taolus() {
        try {
            var taolus=JSON.parse(localStorage['TAOLUS']);
        } catch(e) { // something happened
            localStorage['TAOLUS']='';
            initconfig();
            return;
        }
        if(taolus.length==undefined) { // should migrate
            var right=[]; // [[expr,text], ...]
            for(var text in taolus) // text -> expr
                right.push([RegExp(taolus[text]),text]);
            localStorage['TAOLUS']=toholyjson(right);
            loadconfig();
        }
    })();
    
    (function migrate_legacy_fuzz() {
        if(localStorage['DANMU_FUZZ']) {
            localStorage['MAX_DIST']=localStorage['DANMU_FUZZ']==='on'?5:0;
            delete localStorage['DANMU_FUZZ'];
            loadconfig();
        }
    })();

    (function migrate_legacy_taolus_2() { // v8.6.6
        if(localStorage['TAOLUS']) {
            var taolus=fromholyjson(localStorage['TAOLUS']);
            var forcelist=[];
            taolus.forEach(function(taolu) {
                var src=taolu[0].source;
                if(src.indexOf('^')!==0)
                    src='^.*'+src;
                if(src.indexOf('$')!==src.length-1)
                    src=src+'.*$';
                forcelist.push([new RegExp(src),taolu[1]]);
            });
            localStorage['FORCELIST']=toholyjson(forcelist);
            delete localStorage['TAOLUS'];
            loadconfig();
        }
    })();

    (function migrate_last_update() {
        if(!localStorage['_LAST_UPDATE_TIME'])
            localStorage['_LAST_UPDATE_TIME']=(+new Date());
    })();
}

function add_pakku_fingerprint(url) {
    return url + (url.indexOf('?')===-1 ? '?' : '&') + 'pakku_request'
}

function make_xml_datauri(txt) {
    return 'data:text/xml;charset=utf-8,'+encodeURIComponent(txt);
}