function id(x) {
    return document.getElementById(x);
}

var options_href=chrome.runtime.getURL('options/options.html');
id('pakku-logo').href=options_href;

[].slice.call(document.querySelectorAll('a[data-options-link]')).forEach(function(elem) {
    elem.target='_blank';
    elem.href=options_href+'#'+elem.dataset.optionsLink;
    elem.title='调整相关设置';
});

chrome.runtime.getBackgroundPage(function(bgpage) {
    var enabled=bgpage.GLOBAL_SWITCH;
    var btn=id('switch');
    var hint_text=id('hint-text');
    
    function loadui() {
        btn.classList.add(enabled?'on':'off');
        btn.classList.remove(enabled?'off':'on');
        btn.textContent=enabled?'工作中':'休息中';
        chrome.tabs.query( // get tooltip text of current tab
            {active:true,currentWindow: true},
            function(d) {
                var general = enabled ? '本页面没有发现B站播放器' : 'zzzzzzzzzz'
                if(d[0] && d[0].id)
                    chrome.browserAction.getTitle(
                        {tabId: d[0].id},
                        function(res) {
                            if(res!=='pakku' && res!=='')
                                hint_text.textContent=enabled ? res : '刷新页面才能完全生效';
                            else
                                hint_text.textContent=general;
                        }
                    );
                else
                    hint_text.textContent=general;
            }
        );
    }
    
    chrome.tabs.query(
        {active:true, currentWindow: true},
        function(d) {
            if(!d || !d[0].id || !bgpage.HISTORY[d[0].id]) return;
            var res=bgpage.HISTORY[d[0].id];
            if(res.error) {
                id('exception').classList.remove('display-none');
                id('error-cid').textContent=res.cid;
            } else {
                id('result').classList.remove('display-none');
                id('link-total').href='http://comment.bilibili.com/'+res.cid+'.xml';
                id('link-display').href='http://comment.bilibili.com/'+res.cid+'.xml?debug';
            }
            
            for(var name in res)
                if(id('status-'+name))
                    id('status-'+name).textContent=(typeof res[name]=='number') ? Math.ceil(res[name]) : res[name];
        }
    );
    
    btn.addEventListener('click',function() {
        bgpage.set_global_switch((enabled=!enabled));
        loadui();
    });
    loadui();
});