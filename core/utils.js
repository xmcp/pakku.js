// (C) 2017 @xmcp. THIS PROJECT IS LICENSED UNDER GPL VERSION 3. SEE `LICENSE.txt`.

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
    } catch(e) {
        localStorage['TAOLUS']=''; // this will be fixed at the next startup
        loadconfig();
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