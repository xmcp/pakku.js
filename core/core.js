var GLOBAL_SWITCH=true;
var trim_ending_re=/^(.+?)[\.。,，/\?？!！~～@\^、+=\-_♂♀ ]*$/;

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
    window.THRESHOLD=parseInt(localStorage['THRESHOLD'])||15;
    window.MAX_DIST=1+(localStorage['DANMU_FUZZ']==='on')*4;
    window.TRIM_ENDING=localStorage['TRIM_ENDING']==='on';
    window.TAOLUS=fromholyjson(localStorage['TAOLUS'])||{};
    window.REMOVE_SEEK=localStorage['REMOVE_SEEK']==='on';
    window.FLASH_NOTIF=localStorage['FLASH_NOTIF']==='on';
    window.DANMU_BADGE=localStorage['DANMU_BADGE']==='on';
    window.POPUP_BADGE=localStorage['POPUP_BADGE'];
    window.PROC_TYPE7=localStorage['PROC_TYPE7']==='on';
}
localStorage['THRESHOLD']=localStorage['THRESHOLD']||15;
localStorage['DANMU_FUZZ']=localStorage['DANMU_FUZZ']||'on';
localStorage['TRIM_ENDING']=localStorage['TRIM_ENDING']||'on';
localStorage['TAOLUS']=localStorage['TAOLUS']||'{"233...":"^23{2,}$","666...":"^6{3,}$","FFF...":"^[fF]+$","hhh...":"^[hH]+$"}';
localStorage['REMOVE_SEEK']=localStorage['REMOVE_SEEK']||'on';
localStorage['FLASH_NOTIF']=localStorage['FLASH_NOTIF']||'on';
localStorage['DANMU_BADGE']=localStorage['DANMU_BADGE']||'on';
localStorage['POPUP_BADGE']=localStorage['POPUP_BADGE']||'percent';
localStorage['PROC_TYPE7']=localStorage['PROC_TYPE7']||'on';
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

function parse(dom,tabid) {
    console.time('parse');
    
    function detaolu(text) {
        for(var name in TAOLUS)
            if(TAOLUS[name].test(text))
                return name;
        return TRIM_ENDING ? text.replace(trim_ending_re,'$1') : text;
    }
    function ext_special_danmu(text) {
        try {
            return JSON.parse(text)[4];
        } catch(e) {
            return text;
        }
    }
    function build_text(elem,text,count) {
        var dumped=null;
        if(elem.mode=='7') // special danmu, need more parsing
            try {
                dumped=JSON.parse(elem.orig_str);
            } catch(e) {}
        
        if(dumped) {
            dumped[4]=(count==1 || !DANMU_BADGE) ?
                text :
                text+' [x'+count.toString()+']';
            return JSON.stringify(dumped);
        } else // normal case
            return (count==1 || !DANMU_BADGE) ?
                text :
                text+' [x'+count.toString()+']';
    }

    var parser=new DOMParser();
    var new_dom=parser.parseFromString('<i></i>','text/xml');
    var i_elem=new_dom.childNodes[0];

    var danmus=[];
    [].slice.call(dom.childNodes[0].children).forEach(function(elem) {
        if(elem.tagName=='d') {
            var attr=elem.attributes['p'].value.split(',');
            var str=elem.childNodes[0] ? elem.childNodes[0].data : '';

            if(!PROC_TYPE7 && attr[1]=='7')
                i_elem.appendChild(elem);
            else
                danmus.push({
                    attr: attr, // thus we can build it into new_dom again
                    str: attr[1]=='7' ? ext_special_danmu(str) :
                        (REMOVE_SEEK && attr[1]=='8' && str.indexOf('Player.seek(')!=-1) ? '/* player.seek filtered by pakku */' :
                        detaolu(str),
                    time: parseFloat(attr[0]),
                    orig_str: str,
                    mode: attr[1]
                });
        } else
            i_elem.appendChild(elem);
    });
    danmus.sort(function(x,y) {return x.time-y.time;});

    var danmu_hist=new Map();
    var bk=new BKTree(), bk_buf=new BKTree(); // double buffer
    var last_time=0;

    danmus.forEach(function(dm) {
        var time=dm.time;
        var str=dm.str;

        if (time-last_time>THRESHOLD) { // swap buffer
            bk=bk_buf;
            bk_buf=new BKTree();
            last_time=time;
        }

        var res=bk.find(str,time-THRESHOLD);

        if (res==null) {
            var node=bk.insert(str,time);
            danmu_hist.set(node,[dm]);
            var node_buf=bk_buf.insert(str,time);
            danmu_hist.set(node_buf,[]);
        } else {
            danmu_hist.get(res).push(dm);

            var res_buf=bk_buf.find(str,time-THRESHOLD);

            if (res_buf==null) {
                var node=bk_buf.insert(str,time);
                danmu_hist.set(node,[]);
            }
        }
    });

    var counter=0;

    danmu_hist.forEach(function(value,key) {
        if (!value.length) return; // dummy node

        var len=1, last_time=value[0].time;
        for (var i=1; i<value.length; i++)
            if(value[i].time-last_time<THRESHOLD)
                len++;
            else {
                counter+=len-1;
                var d=new_dom.createElement('d');
                var tn=new_dom.createTextNode(build_text(value[i-1],key.val,len));

                d.appendChild(tn);
                d.setAttribute('p',value[i-1].attr.join(','));
                i_elem.appendChild(d);

                last_time=value[i].time;
                len=0;
            }

        counter+=len-1;
        var d=new_dom.createElement('d');
        var tn=new_dom.createTextNode(build_text(value[i-1],key.val,len));

        d.appendChild(tn);
        d.setAttribute('p',value[i-1].attr.join(','));
        i_elem.appendChild(d);
    });

    chrome.browserAction.setBadgeText({
        text:
            POPUP_BADGE=='count' ? ''+counter :
            POPUP_BADGE=='percent' ? (counter*100/danmus.length).toFixed(0)+'%' :
            '',
        tabId: tabid
    });
    chrome.browserAction.setTitle({
        title: '已过滤 '+counter+'/'+danmus.length+' 弹幕',
        tabId: tabid
    });
    var serializer=new XMLSerializer();
    console.timeEnd('parse');
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
    console.log('load http://comment.bilibili.com/'+id+'.xml');
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
    
    var ret=/:\/\/comment\.bilibili\.com\/(\d+)(\.debug)?\.xml$/.exec(details.url);
    if(ret) {
        if(ret[2] || details.type==='xmlhttprequest')
            return {redirectUrl: load_danmaku(ret[1],details.tabId)||details.url};
        else {
            console.log(details);
            chrome.browserAction.setBadgeText({
                text: 'FL!',
                tabId: details.tabId
            });
            if(FLASH_NOTIF)
                chrome.notifications.create(details.url, {
                    type: 'basic',
                    iconUrl: chrome.runtime.getURL('assets/logo.png'),
                    title: '暂不支持 Flash 播放器',
                    message: '请切换到哔哩哔哩 HTML5 播放器来让 pakku 过滤视频中的弹幕。',
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
}, {urls: ['*://comment.bilibili.com/*.xml']}, ['blocking']);
