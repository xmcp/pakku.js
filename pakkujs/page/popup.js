function id(x) {
    return document.getElementById(x);
}
function try_regexp(x) {
    if(x==='') {
        throw 1;
    }
    try {
        return new RegExp(x);
    } catch(e) {
        alert('正则表达式语法有误：\n\n'+e.message)
        throw e;
    }
}

var options_href=chrome.runtime.getURL('page/options.html');
id('pakku-logo').href=options_href;
id('version').textContent=chrome.runtime.getManifest().version;

[].slice.call(document.querySelectorAll('a[data-options-link]')).forEach(function(elem) {
    elem.target='_blank';
    elem.href=options_href+'#'+elem.dataset.optionsLink;
    elem.title='调整相关设置';
});

chrome.runtime.getBackgroundPage(function(bgpage) {
    var btn=id('switch');
    var details_btn=id('details-btn');
    var temprules=id('temprules');
    var hint_text=id('hint-text');

    if(!bgpage) {
        hint_text.textContent='“隐私浏览”模式下本页面无效';
        return;
    }
    
    function add_filling_event(elem,id) {
        elem.addEventListener('click',function() {
            localStorage['_options_autofill']=elem.textContent;
            chrome.tabs.create({url: options_href+'#'+id});
        });
    }

    function loadui() {
        var enabled=bgpage.GLOBAL_SWITCH;
        btn.classList.add(enabled?'on':'off');
        btn.classList.remove(enabled?'off':'on');
        btn.textContent=enabled?'工作中':'休息中';
        chrome.tabs.query(
            {active: true, currentWindow: true},
            function(d) {
                var general = enabled ? '本页面没有发现B站播放器' : 'zzzzzzzzzz'
                if(d[0] && d[0].id) {
                    var tabid=d[0].id;

                    chrome.browserAction.getTitle(
                        {tabId: tabid},
                        function(res) {
                            if(res!='pakku' && res!='')
                                hint_text.textContent=res;
                            else
                                hint_text.textContent=general;
                        }
                    );

                    var res=bgpage.HISTORY[tabid];
                    if(res) {
                        id('pakku-title').style.display='none';
                        if(res.error) {
                            id('exception').classList.remove('display-none');
                            id('error-cid').textContent=res.cid;
                            if(res.error=='权限不足') {
                                id('error-fix-btn').classList.remove('display-none');
                                id('error-fix-btn').addEventListener('click',function() {
                                    alert('接下来将弹窗申请权限，请点击允许，然后刷新页面');
                                    chrome.permissions.request({
                                        origins: ['*://*.bilibili.com/*'],
                                        permissions: ['webRequest','webRequestBlocking'],
                                    });
                                });
                            }
                        } else {
                            id('result').classList.remove('display-none');
                            id('link-total').href='http://comment.bilibili.com/'+res.cid+'.xml';
                            id('link-display').href=chrome.runtime.getURL('/page/parse_url.html')+'?ret_type=xml&url='+encodeURIComponent('http://comment.bilibili.com/'+res.cid+'.xml');
                        }
                        for(var name in res)
                            if(id('status-'+name)) {
                                var r=res[name];
                                var elem=id('status-'+name);
                                var row=elem.closest('tr');
                                if(row) {
                                    if(r==='')
                                        row.classList.add('display-none');
                                    else
                                        row.classList.remove('display-none');
                                }
                                elem.textContent=(typeof r=='number') ? Math.ceil(r) : r;
                            }
                        ['combined','deleted','ignored','modified','info'].forEach(function(category) {
                            var rows=[].slice.call(document.querySelectorAll('.status-header-'+category+':not(.display-none)'));
                            rows.forEach(function(row) {
                                row.classList.remove('first-item');
                            });
                            if(rows.length)
                                rows[0].classList.add('first-item');
                        });
                    }
                    
                    temprules.textContent='';
                    if(bgpage.TEMPRULES[tabid]) {
                        bgpage.TEMPRULES[tabid].WHITELIST.forEach(function(whitelist) {
                            var elem=document.createElement('li');
                            elem.textContent=whitelist;
                            elem.className='temprule-whitelist';
                            temprules.appendChild(elem);
                            add_filling_event(elem,'newwhitelist-pattern');
                        });
                        bgpage.TEMPRULES[tabid].FORCELIST.forEach(function(forcelist) {
                            var elem=document.createElement('li');
                            elem.textContent=forcelist;
                            elem.className='temprule-forcelist';
                            temprules.appendChild(elem);
                            add_filling_event(elem,'newforcelist-pattern');
                        });
                    }
                }
                else
                    hint_text.textContent=general;
            }
        );
    }
    
    chrome.tabs.query(
        {active: true, currentWindow: true},
        function(d) {
            if(!d || !d[0].id || !bgpage.HISTORY[d[0].id]) return;
            var tabid=d[0].id;
            
            id('temprule-pattern').addEventListener('keypress',function(event) {
                if(event.code=='Enter') {
                    bgpage.TEMPRULES[tabid]=bgpage.TEMPRULES[tabid]||bgpage.TempRules();
                    if(!event.shiftKey && !event.ctrlKey && !event.altKey) { // Enter
                        var exp=try_regexp(event.target.value);
                        bgpage.TEMPRULES[tabid].FORCELIST.unshift(exp.source);
                        event.target.value='';
                    } else if(event.shiftKey && !event.ctrlKey && !event.altKey) { // Shift+Enter
                        var exp=try_regexp(event.target.value);
                        bgpage.TEMPRULES[tabid].WHITELIST.unshift(exp.source);
                        event.target.value='';
                    } else if(!event.shiftKey && event.ctrlKey && !event.altKey) { // Ctrl+Enter
                        bgpage.TEMPRULES[tabid].FORCELIST=[];
                        bgpage.TEMPRULES[tabid].WHITELIST=[];
                    }
                    bgpage.reload_danmaku();
                    loadui();
                }
            });
        }
    );
    
    btn.addEventListener('click',function() {
        bgpage.set_global_switch(!bgpage.GLOBAL_SWITCH);
        loadui();
    });

    if(bgpage._ADVANCED_USER) {
        details_btn.dataset['details']='off';
    } else {
        details_btn.dataset['details']='on';
        details_btn.disabled=true;
    }

    function update_details_btn() {
        if(details_btn.dataset['details']==='on') {
            id('details-on').classList.remove('display-none');
            id('details-off').classList.add('display-none');
        } else {
            id('details-on').classList.add('display-none');
            id('details-off').classList.remove('display-none');
        }
    }
    update_details_btn();

    details_btn.addEventListener('click',function() {
        details_btn.dataset['details']=(details_btn.dataset['details']==='on')?'off':'on';
        update_details_btn();
    });

    loadui();
    chrome.runtime.onMessage.addListener(function(request,sender,sendResponse) {
        if(request.type==='browser_action_reload') {
            console.log('reload request received');
            loadui();
        }
    });
});

chrome.commands.getAll(function(cmds) {
    cmds.forEach(function(cmd) {
        var elem=id('command-'+cmd.name);
        if(elem)
            elem.textContent=cmd.shortcut;
    });
})