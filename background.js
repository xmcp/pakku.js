var taolus={
    '233...': /^23{2,}$/,
    '666...': /^6{3,}$/,
    'FFF...': /^[fF]+$/,
    'hhh...': /^[hH]+$/,
};
var THRESHOLD=15;

function parse(dom,tabid) {
    function detaolu(text) {
        for(var name in taolus)
            if(taolus[name].test(text))
                return name;
        return text;
    }
    
    function parse_single_danmu(elem) {
        var attr=elem.attributes['p'].value.split(',');
        return {
            text: detaolu(elem.childNodes[0].data),
            elem: elem,
            time: parseFloat(attr[0])
        }
    }
    
    var danmus=[].slice
        .call(dom.getElementsByTagName('d'))
        .filter(function(elem) {return elem.childNodes.length;})
        .map(parse_single_danmu)
        .sort(function(a,b) {return a.time-b.time;});

    var self,counter=0,hist={}; // text : time, count, danmu
    function iterate(elem) {
        if(hist[elem.text] && elem.time-hist[elem.text].time>THRESHOLD) // outdated
            delete hist[elem.text];
            
        if((self=hist[elem.text])) {
            self.count++;
            self.danmu.elem.childNodes[0].data=self.danmu.text+' [x'+self.count+']';
            return true;
        } else {
            hist[elem.text]={
                count: 1,
                time: elem.time,
                danmu: elem
            };
            return false;
        }
    }
        
    danmus.forEach(function(danmu) {
        if(iterate(danmu)) { // delete same danmu
            danmu.elem.parentNode.removeChild(danmu.elem);
            counter++;
        }
    });
    
    chrome.browserAction.setBadgeText({
        text: ''+counter,
        tabId: tabid
    });
    var serializer=new XMLSerializer();
    return serializer.serializeToString(dom);
}

function load_danmaku(id,tabid) {
    function base64(str) { // from https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
    }
    
    var xhr=new XMLHttpRequest();
    xhr.open('get','http://comment.bilibili.com/'+id+'.xml',false);
    xhr.send();
    if(xhr.status===200 && xhr.responseXML) {
        return 'data:text/xml;charset=utf-8;base64,'+base64(parse(xhr.responseXML,tabid));
    } else {
        return null;
    }
}

chrome.webRequest.onBeforeRequest.addListener(function(details) {
    var ret=/:\/\/comment\.bilibili\.com\/(\d+)\.xml$/.exec(details.url);
    if(ret) {
        if(details.type==='xmlhttprequest')
            return {redirectUrl: load_danmaku(ret[1],details.tabId)||details.url};
        else {
            console.log(details);
            chrome.notifications.create(details.url, {
                type: 'basic',
                iconUrl: chrome.runtime.getURL('logo.png'),
                title: '无法过滤 Flash 播放器中的弹幕',
                message: '请在播放器右上角的下拉菜单中选择“HTML5 播放器”。',
                contextMessage: 'pakku working with AV'+ret[1],
                isClickable: false
            });
        }
    }
    else
        return {cancel: false};
}, {urls: ["*://comment.bilibili.com/*.xml"]}, ["blocking"]);