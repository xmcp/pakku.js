// (C) 2018 @xmcp. THIS PROJECT IS LICENSED UNDER GPL VERSION 3. SEE `LICENSE.txt`.

initconfig();

chrome.browserAction.setBadgeText({ // badge text in the previous launch might not be cleared
    text: GLOBAL_SWITCH?'':'zzz'
});

// https://github.com/xmcp/9alpha integration
if(localStorage['_9ALPHA']) {
    var ID_9ALPHA=localStorage['_9ALPHA'];

    setTimeout(function() { // after 9alpha is initialized
        chrome.runtime.sendMessage(ID_9ALPHA,{
            api_version: '1',
            match_pattern_filters: DANMU_URL_FILTER,
            match_pattern_re: [
                TRAD_DANMU_URL_RE.source,
                NEW_DANMU_NORMAL_URL_RE.source,
                NEW_DANMU_HISTORY_URL_RE.source
            ].join('|')
        },{},function(res) {
            function b64EncodeUnicode(str) {
                return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
                    function toSolidBytes(match, p1) {
                        return String.fromCharCode('0x' + p1);
                }));
            }

            if(!res || res.error)
                console.error(res);
            else {
                console.log('9alpha connected');
                chrome.browserAction.setTitle({title: 'pakku ↔ 9α'});

                chrome.runtime.onMessageExternal.addListener(function(msg,sender,sendResponse) {
                    function respond(headers,data) {
                        if(data)
                            sendResponse({
                                encoded: b64EncodeUnicode(
                                    'HTTP/1.1 200 OKAY\r\n'+
                                    headers.join('\r\n')+'\r\n\r\n'+
                                    data
                                )
                            });
                        else
                            sendResponse({});
                    }

                    if(sender.id==ID_9ALPHA && msg.type=='9ALPHA_CALL') {
                        console.log('9alpha callback',msg);
                        var ret=parse_danmu_url(msg.details.url);
                        var tabid=msg.details.tabId;
                        if(ret) {
                            var protocol=ret[1], cid=ret[2], debug=ret[3], type=ret[4];
                            var headers=[
                                'Content-Type: text/xml; charset=utf-8',
                                type=='history' ? 'Access-Control-Allow-Origin: https://www.bilibili.com' : 'Access-Control-Allow-Origin: *',
                                'Access-Control-Allow-Credentials: true',
                                'Access-Control-Allow-Headers: Origin,No-Cache,X-Requested-With,If-Modified-Since,Pragma,Last-Modified,Cache-Control,Expires,Content-Type,Access-Control-Allow-Credentials',
                            ];

                            if(check_xml_bounce(cid))
                                return respond(headers,BOUNCE.result);
                            
                            down_danmaku_async(msg.details.url,cid,tabid)
                                .then(function(res) {
                                    respond(headers,load_danmaku(res,cid,tabid));
                                })
                                .catch(function() {
                                    respond(headers,null);
                                });
                            return true;
                        } else
                            return respond(headers,null);
                    }
                });
                chrome.webRequest.onBeforeRequest.removeListener(onbeforerequest, {urls: DANMU_URL_FILTER}, ['blocking']);
            }
        });
    },500);
}

if(TEST_MODE) {
    chrome.webRequest.onBeforeRequest.addListener(function(details) {
        return {redirectUrl: 'data:text/html,<title>'+encodeURIComponent(chrome.runtime.getURL('page/options.html'))+'</title>'};
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
