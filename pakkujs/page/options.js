var IS_FIREFOX=false;

var IS_EDG=navigator.userAgent.indexOf('Edg/')!==-1

/*for-firefox:

IS_FIREFOX=true;

if(chrome.permissions)
    chrome.permissions.request=function(perm,callback) {
        browser.permissions.request(perm)
            .then(function() {callback(true)})
            .catch(function() {callback(false)});
    }
else
    chrome.permissions={
        request: function(perm,callback) {
            callback(true);
        }
    };
    
*/

if(!IS_FIREFOX && navigator.userAgent.indexOf('Firefox/')!==-1 && InstallTrigger) {
    if(confirm('您正在使用 Chrome 分支的 pakku，它在 Firefox 中无法正常工作。\nFirefox 用户请卸载当前版本，然后在 Firefox 附加组件中心下载 pakku。\n\n现在前往下载吗？'))
        location.href='https://addons.mozilla.org/zh-CN/firefox/addon/pakkujs/';
}

function id(x) {
    return document.getElementById(x);
}

function try_regexp(x) {
    try {
        return new RegExp(x);
    } catch(e) {
        alert('正则表达式语法有误：\n\n'+e.message)
        throw e;
    }
}

function regexp_wrap(src) {
    if(src.indexOf('^')!==0)
        src='^.*'+src;
    if(src.indexOf('$')!==src.length-1)
        src=src+'.*$';
    return src;
}

var version='v'+chrome.runtime.getManifest().version;
var img_btns=document.querySelectorAll('[data-name]');
var CHROME_VERSION_RE=/Chrome\/(\d+)/;
id('version').textContent=version+'_'+(IS_FIREFOX?'F':'C');

function highlighter() {
    if(!location.hash) return;
    var el=document.querySelector(location.hash);
    if(!el) return;
    
    if(localStorage['_options_autofill']) {
        var val=localStorage['_options_autofill'];
        delete localStorage['_options_autofill'];
        el.value=val;
    }

    var adv_obj=el.closest('.advanced');
    if(adv_obj) adv_obj.classList.add('js-show-this');
    el=el.closest('p');
    if(!el) return;
    
    var old=document.getElementById('highlighter');
    if(old) old.parentNode.removeChild(old);
    
    var hl=document.createElement('span');
    hl.id='highlighter';
    el.appendChild(hl);
    
    el.scrollIntoView();
    setTimeout(function() {
        scrollBy(0,-100);
    },0);
}

highlighter();
window.addEventListener('hashchange',highlighter);

chrome.runtime.getBackgroundPage(function(bgpage) {
    if(!bgpage) {
    var note=document.createElement('pre');
        note.id='bgpage-null-note';
        note.textContent='无法加载设置页面。\n\n如果你正在用“隐私浏览”功能，请回到正常模式修改 pakku 的配置。\n\n如果你认为这是 bug，请点击此处来【报告问题】。';
        note.onclick=function() {
            location.href='troubleshooting.html';
        };
        document.body.textContent='';
        document.body.appendChild(note);
    }

    id('reset').addEventListener('click',function() {
        if(confirm('确定要重置所有设置吗？\n此操作不可恢复。')) {
            localStorage.clear();
            chrome.storage.sync.clear(function() {
                if(chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError);
                    alert('云端设置清空失败');
                }
                bgpage.initconfig();
                alert('重置完成');
                location.reload();
            });
        }
    });
    
    bgpage.initconfig();

    function get_ws_permission() {
        if(IS_FIREFOX) return;
        chrome.permissions.request({
            origins: ['ws://*.bilibili.com/*','wss://*.bilibili.com/*']
        }, function(granted) {
            if(granted) {
                bgpage.load_update_breaker();
            } else {
                localStorage['BREAK_UPDATE']='off';
                loadconfig();
                var chrome_version=CHROME_VERSION_RE.exec(navigator.userAgent);
                if(!chrome_version)
                    alert('您的浏览器不支持此功能');
                else if(parseInt(chrome_version[1])<58)
                    alert('此功能只支持 Chrome 58 或更高版本');
            }
        });
    }

    function backup_restore_prompt() {
        var inp=prompt('直接按回车来导出设置；将设置粘贴到此处来导入设置。');
        if(inp===null) return;
        if(!inp) { // export
            document.body.textContent=JSON.stringify(localStorage);
            alert('导出成功。\n请将屏幕上的文本妥善保存在别处。');
        } else { // import
            try {
                var dat=JSON.parse(inp);
                localStorage.clear();
                Object.assign(localStorage,dat);
                localStorage['_LAST_UPDATE_TIME']=+(new Date());
                
                bgpage.initconfig();
                bgpage.migrate_legacy();
                loadconfig();
                if(localStorage['BREAK_UPDATE']==='on')
                    get_ws_permission();
                alert('导入成功。');
            } catch(e) {
                alert('导入失败。\n\n'+e.message);
                throw e;
            }
        }
    }

    id('version').addEventListener('click',function(event) {
        if(event.altKey && event.ctrlKey)
            backup_restore_prompt();
    });
    id('backup-restore').addEventListener('click',backup_restore_prompt);
    
    function reload() {
        bgpage.loadconfig();
        id('saved-alert').classList.remove('saved-hidden');
        setTimeout(function() {
            id('saved-alert').classList.add('saved-hidden');
        },100);
        var old=document.getElementById('highlighter');
        if(old) old.parentNode.removeChild(old);
        loadconfig();
    }
    
    function loadconfig() {
        // NEW_OPTION_INSERTION_POINT

        id('show-advanced').checked=localStorage['_ADVANCED_USER']==='on';
        // 弹幕合并
        id('threshold').value=localStorage['THRESHOLD'];
        id('max-dist').value=localStorage['MAX_DIST'];
        id('max-cosine').value=localStorage['MAX_COSINE'];
        id('trim-pinyin').checked=localStorage['TRIM_PINYIN']==='on';
        id('trim-ending').checked=localStorage['TRIM_ENDING']==='on';
        id('trim-space').checked=localStorage['TRIM_SPACE']==='on';
        id('trim-width').checked=localStorage['TRIM_WIDTH']==='on';
        // 例外设置
        id('cross-mode').checked=localStorage['CROSS_MODE']==='on';
        id('ignore-type7').checked=localStorage['PROC_TYPE7']!=='on';
        id('ignore-type4').checked=localStorage['PROC_TYPE4']!=='on';
        id('ignore-pool1').checked=localStorage['PROC_POOL1']!=='on';
        // 显示设置
        id('danmu-mark').value=localStorage['DANMU_MARK'];
        id('mark-threshold').value=localStorage['MARK_THRESHOLD'];
        id('danmu-subscript').checked=localStorage['DANMU_SUBSCRIPT']==='on';
        id('enlarge').checked=localStorage['ENLARGE']==='on';
        id('shrink').checked=localStorage['SHRINK']==='on';
        id('mode-elevation').checked=localStorage['MODE_ELEVATION']==='on';
        id('representative-percent').value=localStorage['REPRESENTATIVE_PERCENT'];
        // 播放器增强
        id('tooltip').checked=localStorage['TOOLTIP']==='on';
        id('auto-disable-danmu').checked=localStorage['AUTO_DISABLE_DANMU']==='on';
        id('auto-danmu-list').checked=localStorage['AUTO_DANMU_LIST']==='on';
        id('fluctlight').checked=localStorage['FLUCTLIGHT']==='on';
        // 实验室
        id('remove-seek').checked=localStorage['REMOVE_SEEK']==='on';
        id('break-update').checked=localStorage['BREAK_UPDATE']==='on';
        id('hide-threshold').value=localStorage['HIDE_THRESHOLD'];
        id('scroll-threshold').value=localStorage['SCROLL_THRESHOLD'];
        id('cloud-sync').checked=localStorage['CLOUD_SYNC']==='on';
        // 其他
        id('popup-badge').value=localStorage['POPUP_BADGE'];
        
        // advanced options
        if(id('show-advanced').checked) document.body.classList.add('i-am-advanced');
        else document.body.classList.remove('i-am-advanced');
        // opacity stuff
        id('mark-threshold-panel').style.opacity=localStorage['DANMU_MARK']==='off'?.3:1;
        id('danmu-subscript-panel').style.opacity=localStorage['DANMU_MARK']==='off'?.3:1;
        
        // FORCELIST
        window.cfg_forcelist=bgpage.fromholyjson(localStorage['FORCELIST']);
        var forcelist=id('forcelist');
        forcelist.innerHTML='';
        for(var i in cfg_forcelist) {
            var container=document.createElement('li'),
                code1=document.createElement('code'),
                spliter=document.createElement('span'),
                code2=document.createElement('code'),
                deletebtn=document.createElement('button'),
                savebtn=document.createElement('button'),
                cancelbtn=document.createElement('button');
                
            code1.textContent=cfg_forcelist[i][0].source;
            code1.contentEditable='true';
            spliter.textContent=' → ';
            code2.textContent=cfg_forcelist[i][1];
            code2.contentEditable='true';
            
            deletebtn.textContent='删除';
            deletebtn.className='btn';
            cancelbtn.textContent='取消';
            cancelbtn.className='btn hidden';
            savebtn.textContent='保存';
            savebtn.className='btn hidden';
            
            (function(index,deletebtn,savebtn,cancelbtn,code1,code2) {
                deletebtn.addEventListener('click',function() {
                    delete cfg_forcelist[index];
                    localStorage['FORCELIST']=bgpage.toholyjson(cfg_forcelist);
                    reload();
                });
                savebtn.addEventListener('click',function() {
                    cfg_forcelist[index][0]=try_regexp(code1.textContent);
                    cfg_forcelist[index][1]=code2.textContent;
                    localStorage['FORCELIST']=bgpage.toholyjson(cfg_forcelist);
                    reload();
                });
                cancelbtn.addEventListener('click',loadconfig);
                function show_btn() {
                    deletebtn.classList.add('hidden');
                    savebtn.classList.remove('hidden');
                    cancelbtn.classList.remove('hidden');
                }
                code1.addEventListener('input',show_btn);
                code2.addEventListener('input',show_btn);
            })(i,deletebtn,savebtn,cancelbtn,code1,code2);
            
            container.appendChild(code1);
            container.appendChild(spliter);
            container.appendChild(code2);
            container.appendChild(deletebtn);
            container.appendChild(cancelbtn);
            container.appendChild(savebtn);
            forcelist.appendChild(container);
        }
        
        // WHITELIST
        window.cfg_whitelist=bgpage.fromholyjson(localStorage['WHITELIST']);
        var whitelist=id('whitelist');
        whitelist.innerHTML='';
        for(var i in cfg_whitelist) {
            var container=document.createElement('li'),
                code1=document.createElement('code'),
                deletebtn=document.createElement('button'),
                savebtn=document.createElement('button'),
                cancelbtn=document.createElement('button');
                
            code1.textContent=cfg_whitelist[i][0].source;
            code1.contentEditable='true';
            
            deletebtn.textContent='删除';
            deletebtn.className='btn';
            savebtn.textContent='保存';
            savebtn.className='btn hidden';
            cancelbtn.textContent='取消';
            cancelbtn.className='btn hidden';
            
            (function(index,savebtn,cancelbtn,code1) {
                deletebtn.addEventListener('click',function() {
                    delete cfg_whitelist[index];
                    localStorage['WHITELIST']=bgpage.toholyjson(cfg_whitelist);
                    reload();
                });
                savebtn.addEventListener('click',function() {
                    cfg_whitelist[index][0]=try_regexp(code1.textContent);
                    localStorage['WHITELIST']=bgpage.toholyjson(cfg_whitelist);
                    reload();
                });
                cancelbtn.addEventListener('click',loadconfig);
                function show_btn() {
                    savebtn.classList.remove('hidden');
                    cancelbtn.classList.remove('hidden');
                }
                code1.addEventListener('input',show_btn);
            })(i,savebtn,cancelbtn,code1);
            
            container.appendChild(code1);
            container.appendChild(deletebtn);
            container.appendChild(savebtn);
            container.appendChild(cancelbtn);
            whitelist.appendChild(container);
        }
        
        [].slice.call(img_btns).forEach(function(elem) {
            if(localStorage[elem.dataset['name']]===elem.dataset['value'])
                elem.className='img-active';
            else
                elem.className='img-inactive'
        });
    }

    id('newforcelist-form').addEventListener('submit',function(e) {
        e.preventDefault();
        cfg_forcelist.push([
            try_regexp(regexp_wrap(id('newforcelist-pattern').value)),
            id('newforcelist-name').value
        ]);
        localStorage['FORCELIST']=bgpage.toholyjson(cfg_forcelist);
        reload();
        id('newforcelist-pattern').value='';
        id('newforcelist-name').value='';
    });
    id('newwhitelist-form').addEventListener('submit',function(e) {
        e.preventDefault();
        cfg_whitelist.push([
            try_regexp(id('newwhitelist-pattern').value),
            "" // could be anything
        ]);
        localStorage['WHITELIST']=bgpage.toholyjson(cfg_whitelist);
        reload();
        id('newwhitelist-pattern').value='';
    });
    [].slice.call(img_btns).forEach(function(elem) {
        elem.addEventListener('click',function() {
            localStorage[elem.dataset['name']]=elem.dataset['value'];
            reload();
        })
    });
    
    function update() {
        // NEW_OPTION_INSERTION_POINT

        localStorage['_ADVANCED_USER']=id('show-advanced').checked?'on':'off';
        // 弹幕合并
        localStorage['THRESHOLD']=parseInt(id('threshold').value,10)>-2?parseInt(id('threshold').value,10):20;
        localStorage['MAX_DIST']=parseInt(id('max-dist').value);
        localStorage['MAX_COSINE']=parseInt(id('max-cosine').value);
        localStorage['TRIM_PINYIN']=id('trim-pinyin').checked?'on':'off';
        localStorage['TRIM_ENDING']=id('trim-ending').checked?'on':'off';
        localStorage['TRIM_SPACE']=id('trim-space').checked?'on':'off';
        localStorage['TRIM_WIDTH']=id('trim-width').checked?'on':'off';
        // 例外设置
        localStorage['CROSS_MODE']=id('cross-mode').checked?'on':'off';
        localStorage['PROC_TYPE7']=id('ignore-type7').checked?'off':'on';
        localStorage['PROC_TYPE4']=id('ignore-type4').checked?'off':'on';
        localStorage['PROC_POOL1']=id('ignore-pool1').checked?'off':'on';
        // 显示设置
        localStorage['DANMU_MARK']=id('danmu-mark').value;
        localStorage['MARK_THRESHOLD']=parseInt(id('mark-threshold').value)>0?parseInt(id('mark-threshold').value):1;
        localStorage['DANMU_SUBSCRIPT']=id('danmu-subscript').checked?'on':'off';
        localStorage['ENLARGE']=id('enlarge').checked?'on':'off';
        localStorage['SHRINK']=id('shrink').checked?'on':'off';
        localStorage['MODE_ELEVATION']=id('mode-elevation').checked?'on':'off';
        localStorage['REPRESENTATIVE_PERCENT']=id('representative-percent').value;
        // 播放器增强
        localStorage['TOOLTIP']=id('tooltip').checked?'on':'off';
        localStorage['AUTO_DISABLE_DANMU']=id('auto-disable-danmu').checked?'on':'off';
        localStorage['AUTO_DANMU_LIST']=id('auto-danmu-list').checked?'on':'off';
        localStorage['FLUCTLIGHT']=id('fluctlight').checked?'on':'off';
        // 实验室
        localStorage['REMOVE_SEEK']=id('remove-seek').checked?'on':'off';
        localStorage['BREAK_UPDATE']=id('break-update').checked?'on':'off';
        localStorage['HIDE_THRESHOLD']=parseInt(id('hide-threshold').value)>=0?parseInt(id('hide-threshold').value):0;
        localStorage['SCROLL_THRESHOLD']=parseInt(id('scroll-threshold').value)>=0?parseInt(id('scroll-threshold').value):0;
        // 其他
        localStorage['POPUP_BADGE']=id('popup-badge').value;
        localStorage['CLOUD_SYNC']=id('cloud-sync').checked?'on':'off';
        
        // fix last update time
        if(parseInt(localStorage['_LAST_UPDATE_TIME'])>(+new Date())) {
            console.log('invalid last update time');
            localStorage['_LAST_UPDATE_TIME']=(+new Date());
            chrome.storage.sync.set({'_LAST_UPDATE_TIME':-1},update);
            return;
        }
        localStorage['_LAST_UPDATE_TIME']=(+new Date());

        reload();

        if(this.id==='break-update' && this.checked)
            get_ws_permission();
    }
    
    loadconfig();
    [
        // NEW_OPTION_INSERTION_POINT

        'show-advanced',
        // 弹幕合并
        'threshold','max-dist','max-cosine','trim-pinyin','trim-ending','trim-space','trim-width',
        // 例外设置
        'cross-mode','ignore-type7','ignore-type4','ignore-pool1',
        // 显示设置
        'mark-threshold','danmu-mark','danmu-subscript','enlarge','shrink','mode-elevation','representative-percent',
        // 播放器增强
        'tooltip','auto-disable-danmu','auto-danmu-list','fluctlight',
        // 实验室
        'remove-seek','break-update','hide-threshold','scroll-threshold',
        // 其他
        'popup-badge','cloud-sync'
    ].forEach(function(elem) {
        id(elem).addEventListener('change',update);
    });

    chrome.runtime.onMessage.addListener(function(request,sender,sendResponse) {
        if(request.type==='options_page_reload') {
            console.log('reload request received');
            loadconfig();
        }
    });

    if(bgpage.TEST_MODE) {
        // speed up testing procedure by removing stat iframe
        var frame_elem=document.querySelector('iframe');
        if(frame_elem)
            frame_elem.parentNode.removeChild(frame_elem);
    }
});

[].slice.call(document.querySelectorAll('.donate')).forEach(function(elem) {
    elem.addEventListener('mouseover',function() {
        document.body.classList.add('donate-show');
    });
    elem.addEventListener('mouseout',function() {
        document.body.classList.remove('donate-show');
    });
});

if(IS_EDG)
    id('ask-review-line').style.display='none';

// version check
function ver_check() {
    if(IS_EDG) {
        console.log('version checking disabled for chromium edge');
        id('version-checker').textContent='(Edge)';
        return;
    }

    var xhr=new XMLHttpRequest();
    xhr.open('get', IS_FIREFOX ?
        'https://img.shields.io/amo/v/pakkujs.json' :
        'https://img.shields.io/chrome-web-store/v/jklfcpboamajpiikgkbjcnnnnooefbhh.json'
    );
    xhr.onload=function() {
        var latest_ver=JSON.parse(this.responseText);
        console.log('latest version ',latest_ver);
        if(latest_ver.value!=version && latest_ver.value.charAt(0)==='v') {
            var note=document.createElement('a');
            note.href='https://s.xmcp.ml/pakkujs/?src=update_banner&from_version='+encodeURIComponent(version);
            note.id='update-note';
            note.target='_blank';
            note.textContent='你正在使用 pakku '+version+'，'+latest_ver.name+' 中的最新版是 '+latest_ver.value+'。点击此处下载新版本。';
            document.body.appendChild(note);
        } else {
            id('version-checker').textContent='✓ 是最新版本';
        }
    };
    xhr.send();
}
ver_check();