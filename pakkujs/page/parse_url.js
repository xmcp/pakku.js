function id(x) {
    return document.getElementById(x);
}

chrome.runtime.getBackgroundPage(function(bgpage) {
    var params = new URLSearchParams(location.search);
    chrome.runtime.sendMessage({type: 'ajax_hook', url: params.get('url'), ret_type: params.get('ret_type')},function(resp) {
        var res=resp.data;
        id('code').textContent=res.replace(/<d /g,'\n<d ');
    });
});