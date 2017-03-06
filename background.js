var GLOBAL_SWITCH=true;

function fromholyjson(txt) {
    var item=JSON.parse(txt);
    for(var key in item)
        item[key]=RegExp(item[key]);
    return item;
}
function toholyjson(obj) {
    var item={};
    for(var key in obj)
        item[key]=obj[key].source;
    return JSON.stringify(item);
}

function loadconfig() {
    window.TAOLUS=fromholyjson(localStorage['TAOLUS'])||{};
    window.THRESHOLD=parseInt(localStorage['THRESHOLD'])||15;
    window.REMOVE_SEEK=localStorage['REMOVE_SEEK']==='on';
    window.FLASH_NOTIF=localStorage['FLASH_NOTIF']==='on';
    window.MAX_DIST = parseInt(localStorage['MAX_DIST'])||5;
    window.DANMU_BADGE=localStorage['DANMU_BADGE']==='on';
    window.POPUP_BADGE=localStorage['POPUP_BADGE'];
}
localStorage['TAOLUS']=localStorage['TAOLUS']||'{"233...":"^23{2,}$","666...":"^6{3,}$","FFF...":"^[fF]+$","hhh...":"^[hH]+$"}';
localStorage['THRESHOLD']=localStorage['THRESHOLD']||15;
localStorage['MAX_DIST']=localStorage['MAX_DIST']||5;
localStorage['REMOVE_SEEK']=localStorage['REMOVE_SEEK']||'on';
localStorage['FLASH_NOTIF']=localStorage['FLASH_NOTIF']||'on';
localStorage['DANMU_BADGE']=localStorage['DANMU_BADGE']||'on';
localStorage['POPUP_BADGE']=localStorage['POPUP_BADGE']||'count';
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
    if(details.reason=='install')
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
});

var counts = new Int16Array (0x10ffff);

function edit_distance (P, Q) {
    'use strict';

    // TODO: Make this less hacky
    if (P.length + Q.length < 7)
        return (MAX_DIST + 1) * +(P != Q);

    for (var i = 0; i < P.length; i ++) counts [P.charCodeAt (i)] ++;
    for (var i = 0; i < Q.length; i ++) counts [Q.charCodeAt (i)] --;

    var ans = 0;

    for (var i = 0; i < P.length; i ++) {
        ans += Math.abs (counts[P.charCodeAt (i)]);
        counts[P.charCodeAt (i)] = 0;
    }

    for (var i = 0; i < Q.length; i ++) {
        ans += Math.abs (counts[Q.charCodeAt (i)]);
        counts[Q.charCodeAt (i)] = 0;
    }

    return ans;
}

function BKTree () {
    this.root = null;
    this.count = 0;
}

BKTree.prototype.insert = function (new_str, time) {
    'use strict';

    this.count ++;
    

    var new_node = { val: new_str, time: time, children: new Map () };

    if (this.root == null)
        this.root = new_node;
    else {
        var node = this.root;
        var dist = edit_distance (node.val, new_str);
        while (node.children.has (dist)) {
            node = node.children.get (dist);
            dist = edit_distance (node.val, new_str);
        }
        node.children.set (dist, new_node);
    }

    return new_node;
};

function time_str (time) { return Math.round(time).toString (); }

BKTree.prototype.find = function (str, time_lim) {
    'use strict';

    var best_time, best_str = null;

    if (this.root != null) {
        var queue = [this.root];

        while (queue.length) {
            var u = queue.pop ();
            var dist = edit_distance (u.val, str);
            
            if (dist < MAX_DIST && u.time > time_lim)
                return u;

            u.children.forEach (function (value, key) {
                if (dist - MAX_DIST <= key && key <= dist + MAX_DIST)
                    queue.push (value);
            });
        }
    }

    return null;
}

function parse(dom,tabid) {
    console.time ('parse');
    function detaolu(text) {
        for(var name in TAOLUS)
            if(TAOLUS[name].test(text))
                return name;
        return text;
    }

    var parser = new DOMParser ();
    var new_dom = parser.parseFromString ('<i></i>', 'text/xml');
    var i_elem = new_dom.getRootNode ().children[0];

    var danmus = [];

    function get_danmus_worker (elem) {
        if (elem.tagName == 'd') {
            var attr = elem.attributes['p'].value;
            var time = parseFloat (attr.split (',')[0]);
            var str = elem.childNodes[0] ? elem.childNodes[0].data : '';
            if (REMOVE_SEEK && attr.split (',')[1] == '8' && str.indexOf ('Player.seek') != -1)
                str = '/* player.seek filtered by pakku */';
            danmus.push ({ attr: attr, str: detaolu (str), time: time });
        } else
            i_elem.appendChild (elem);
    }

    [].slice.call (dom.getRootNode ().children[0].children).forEach (get_danmus_worker);

    danmus.sort (function (x, y) { return x.time - y.time; });

    var danmu_hist = new Map ();

    var bk = new BKTree (), bk_buf = new BKTree ();
    var last_time = 0;

    function process_hist (dm) {
        var time = dm.time;
        var str = dm.str;

        if (time - last_time > THRESHOLD) {
            bk = bk_buf;
            bk_buf = new BKTree ();
            last_time = time;
        }

        var res = bk.find (str, time - THRESHOLD);

        if (res == null) {
            var node = bk.insert (str, time);
            danmu_hist.set (node, [dm]);
            var node_buf = bk_buf.insert (str, time);
            danmu_hist.set (node_buf, []);
        } else {
            danmu_hist.get (res).push (dm);

            var res_buf = bk_buf.find (str, time - THRESHOLD);

            if (res_buf == null) {
                var node = bk_buf.insert (str, time);
                danmu_hist.set (node, []);
            }
        }
    }

    danmus.forEach (process_hist);

    var counter = 0;

    function gen_new_dom (value, key) {
        if (! value.length) return; // Dummy node

        var len = 1, last_time = value[0].time;
        for (var i = 1; i < value.length; i ++)
            if (value[i].time - last_time < THRESHOLD) len ++;
            else {
                counter += len - 1;

                var proc =
                    (len == 1 || ! DANMU_BADGE)
                    ? key.val
                    : key.val + " [x" + len.toString () + "]";
                
                var d = new_dom.createElement ('d');
                var tn = new_dom.createTextNode (proc);

                d.appendChild (tn);
                d.setAttribute('p', value[i - 1].attr)

                i_elem.appendChild (d);

                last_time = value[i].time;
                len = 0;
            }

        counter += len - 1;

        var proc =
            (len == 1 || ! DANMU_BADGE)
            ? key.val
            : key.val + " [x" + len.toString () + "]";
        
        var d = new_dom.createElement ('d');
        var tn = new_dom.createTextNode (proc);

        d.appendChild (tn);
        d.setAttribute('p', value[value.length - 1].attr)

        i_elem.appendChild (d);
    }

    danmu_hist.forEach (gen_new_dom);

    chrome.browserAction.setBadgeText({
        text:
            POPUP_BADGE=='count' ? ''+counter :
            POPUP_BADGE=='percent' ? (counter*100/danmus.length).toFixed(0)+'%' :
            '',
        tabId: tabid
    });
    var serializer=new XMLSerializer();
    console.timeEnd ('parse');
    return serializer.serializeToString(new_dom);
}

function load_danmaku(id,tabid) {
    function base64(str) { // from https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
    }
    
    chrome.browserAction.setBadgeText({
        text: '...',
        tabId: tabid
    });
    
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
    if(!GLOBAL_SWITCH)
        return {cancel: false};
    
    var ret=/:\/\/comment\.bilibili\.com\/(\d+)\.xml$/.exec(details.url);
    if(ret) {
        if(details.type==='xmlhttprequest')
            return {redirectUrl: load_danmaku(ret[1],details.tabId)||details.url};
        else {
            console.log(details);
            if(FLASH_NOTIF)
                chrome.notifications.create(details.url, {
                    type: 'basic',
                    iconUrl: chrome.runtime.getURL('assets/logo.png'),
                    title: '暂不支持 Flash 播放器',
                    message: '请切换到 HTML5 播放器来让 pakku 过滤 AV'+ret[1]+' 中的弹幕。',
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
}, {urls: ["*://comment.bilibili.com/*.xml"]}, ["blocking"]);
