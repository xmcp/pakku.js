// (C) 2017 @xmcp. THIS PROJECT IS LICENSED UNDER GPL VERSION 3. SEE `LICENSE.txt`.

var TEST_MODE=navigator.userAgent.indexOf('xmcp_pakku_test_runner')!==-1;

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

var ERROR_COLOR='#ff4444';
var LOADING_COLOR='#4444ff';
var SUCCESS_COLOR='#33aa33';

function setbadge(text,color,tabid) {
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

function migrate_legacy_taolus() {
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
}

function migrate_legacy_fuzz() {
    if(localStorage['DANMU_FUZZ']) {
        localStorage['MAX_DIST']=localStorage['DANMU_FUZZ']==='on'?5:0;
        delete localStorage['DANMU_FUZZ'];
        loadconfig();
    }
}

var HISTORY={};

function Status(CID) {
    return {
        identical: 0, // combined
        edit_distance: 0,
        cosine_distance: 0,
        
        player_seek: 0, // deleted
        
        whitelist: 0, // ignored
        type7: 0,
        type4: 0,
        script: 0,
        
        enlarge: 0, // modified
        shrink: 0,
        
        taolu: 0, // other
        total: 0,
        onscreen: 0,
        maxcombo: 0,
        maxdispval: 0,
        
        error: null,
        cid: CID
    };
}
function FailingStatus(CID,typ,details) {
    return {
        error: typ,
        cid: CID,
        details: details
    }
}