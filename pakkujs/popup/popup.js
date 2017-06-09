document.getElementById('pakku-logo').href=chrome.runtime.getURL('options/options.html');

chrome.runtime.getBackgroundPage(function(bgpage) {
    var enabled=bgpage.GLOBAL_SWITCH;
    var btn=document.getElementById('switch');
    var hint_text=document.getElementById('hint-text');
    
    function loadui() {
        btn.classList.add(enabled?'on':'off');
        btn.classList.remove(enabled?'off':'on');
        btn.textContent=enabled?'工作中':'休息中';
        chrome.tabs.query( // get tooltip text of current tab
            {active:true,currentWindow: true},
            function(d) {
                var general = enabled ? '暂时没有发现B站播放器' : 'zzzzzzzzzz'
                if(d[0] && d[0].id)
                    chrome.browserAction.getTitle( // fuck chrome APIs
                        {tabId: d[0].id},
                        function(res) {
                            if(res!=='pakku')
                                hint_text.textContent=res;
                            else
                                hint_text.textContent=general;
                        }
                    );
                else
                    hint_text.textContent=general;
            }
        );
    }
    btn.addEventListener('click',function() {
        bgpage.GLOBAL_SWITCH=enabled=!enabled;
        chrome.browserAction.setBadgeText({
            text: enabled?'':'zzz'
        });
        loadui();
    });
    loadui();
});