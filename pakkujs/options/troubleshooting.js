var channel='chrome';
/*for-firefox:
channel='firefox';
*/

var debug=document.getElementById('debug');
var error=document.getElementById('error');

window.onerror=function(msg, url, line, col, details) {
    error.textContent+='\n\n**! Exception:** `'+msg+'`';
    error.textContent+='\n\n`'+url+'` :: '+line+' :: '+col;
};

/*for-firefox:
(function() {
    var elem=document.createElement('script');
    elem.src=chrome.runtime.getURL('/assets/script_injector.js');
    document.body.appendChild(elem);
})();
*/

debug.textContent+='<summary>[Debug Info]</summary>';
debug.textContent+='\n\n**Version:** '+chrome.runtime.getManifest().version;
debug.textContent+='\n\n**Channel:** '+channel;
debug.textContent+='\n\n**User Agent:** `'+navigator.userAgent+'`';
debug.textContent+='\n\n**Incognito:** `'+chrome.extension.inIncognitoContext+'`';

debug.textContent+='\n\n**localStorage:** `'+JSON.stringify(localStorage)+'`';

chrome.runtime.getBackgroundPage(function(bgpage) {
    debug.textContent+='\n\n**Background / IS_FIREFOX:** '+bgpage.IS_FIREFOX;
    debug.textContent+='\n\n**Background / GLOBAL_SWITCH:** '+bgpage.GLOBAL_SWITCH;
    debug.textContent+='\n\n**Background / HISTORY:** `'+JSON.stringify(bgpage.HISTORY)+'`';
});

chrome.permissions.getAll(function(perms) {
    debug.textContent+='\n\n**Permissions:** `'+JSON.stringify(perms)+'`';
});

debug.textContent+='\n\n**Views:**';
chrome.extension.getViews().forEach(function(view) {
    debug.textContent+='\n\n- `'+view.location.href+'`';
});

chrome.tabs.query({},function(tabs) {
    debug.textContent+='\n\n**Tabs:**';
    tabs.forEach(function(tab) {
        debug.textContent+='\n\n- ID='+tab.id+' status='+tab.status+' `'+tab.url+'`';
    })
})

function network_test(name,url) {
    var xhr=new XMLHttpRequest;
    xhr.open('get',url);
    xhr.addEventListener('load',function() {
        debug.textContent+='\n\n**Request / '+name+':** load, status='+xhr.status+' `'+xhr.responseText+'`';
    });
    xhr.addEventListener('error',function() {
        debug.textContent+='\n\n**Request / '+name+':** error, status='+xhr.status+' `'+xhr.responseText+'`';
    });
    xhr.send();
}

setTimeout(function() {
    network_test('Normal XML','https://comment.bilibili.com/2.xml');
    network_test('XML With Param','https://comment.bilibili.com/2.xml?foo');
},300);

test_error_log();
// DO NOT PUT ANYTHING BEHIND THIS LINE