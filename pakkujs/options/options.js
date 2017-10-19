/*for-firefox:

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

var version='v'+chrome.runtime.getManifest().version;
var img_btns=document.querySelectorAll('[data-name]');
var CHROME_VERSION_RE=/Chrome\/(\d+)/;
id('version').textContent=version;

function highlighter() {
    if(!location.hash) return;
    var el=document.querySelector(location.hash);
    if(!el) return;
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
    },0)
}

highlighter();
window.addEventListener('hashchange',highlighter);

chrome.runtime.getBackgroundPage(function(bgpage) {
    id('restore').addEventListener('click',function() {
        if(confirm('确定要重置所有设置吗？\n此操作不可恢复。')) {
            localStorage.clear();
            bgpage.initconfig();
            location.reload();
        }
    });
    
    function get_ws_permission() {
        chrome.permissions.request({
            origins: ['ws://*.bilibili.com/*','wss://*.bilibili.com/*']
        }, function(granted) {
            if(granted) {
                bgpage.load_update_breaker();
            } else {
                localStorage['BREAK_UPDATE']=false;
                loadconfig();
                var chrome_version=CHROME_VERSION_RE.exec(navigator.userAgent);
                if(!chrome_version)
                    alert('您的浏览器不支持此功能');
                else if(parseInt(chrome_version[1])<58)
                    alert('此功能只支持 Chrome 58 或更高版本');
            }
        });
    }
    
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
        // 弹幕合并
        id('threshold').value=localStorage['THRESHOLD'];
        id('max-dist').value=localStorage['MAX_DIST'];
        id('max-cosine').value=localStorage['MAX_COSINE'];
        // 弹幕套路
        id('trim-ending').checked=localStorage['TRIM_ENDING']==='on';
        id('trim-space').checked=localStorage['TRIM_SPACE']==='on';
        id('trim-width').checked=localStorage['TRIM_WIDTH']==='on';
        // 例外项
        id('ignore-type7').checked=localStorage['PROC_TYPE7']!=='on';
        id('ignore-type4').checked=localStorage['PROC_TYPE4']!=='on';
        // 显示设置
        id('danmu-mark').value=localStorage['DANMU_MARK'];
        id('mark-threshold').value=localStorage['MARK_THRESHOLD'];
        id('danmu-subscript').checked=localStorage['DANMU_SUBSCRIPT']==='on';
        id('popup-badge').value=localStorage['POPUP_BADGE'];
        // 实验室
        id('enlarge').checked=localStorage['ENLARGE']==='on';
        id('shrink').checked=localStorage['SHRINK']==='on';
        id('remove-seek').checked=localStorage['REMOVE_SEEK']==='on';
        id('break-update').checked=localStorage['BREAK_UPDATE']==='on';
        id('auto-prevent-shade').checked=localStorage['AUTO_PREVENT_SHADE']==='on';
        id('auto-disable-danmu').checked=localStorage['AUTO_DISABLE_DANMU']==='on';
        // 其他
        id('flash-notif').checked=localStorage['FLASH_NOTIF']==='on';
        id('tooltip').checked=localStorage['TOOLTIP']==='on';
        
        id('mark-threshold-panel').style.opacity=localStorage['DANMU_MARK']==='off'?.3:1;
        id('danmu-subscript-panel').style.opacity=localStorage['DANMU_MARK']==='off'?.3:1;
        
        // TAOLUS
        window.cfg_taolus=bgpage.fromholyjson(localStorage['TAOLUS']);
        var taolus=id('taolus');
        taolus.innerHTML='';
        for(var i in cfg_taolus) {
            var container=document.createElement('li'),
                code1=document.createElement('code'),
                spliter=document.createElement('span'),
                code2=document.createElement('code'),
                deletebtn=document.createElement('button'),
                savebtn=document.createElement('button'),
                cancelbtn=document.createElement('button');
                
            code1.textContent=cfg_taolus[i][0].source;
            code1.contentEditable='true';
            spliter.textContent=' → ';
            code2.textContent=cfg_taolus[i][1];
            code2.contentEditable='true';
            
            deletebtn.textContent='删除';
            deletebtn.className='btn';
            cancelbtn.textContent='取消';
            cancelbtn.className='btn hidden';
            savebtn.textContent='保存';
            savebtn.className='btn hidden';
            
            (function(index,deletebtn,savebtn,cancelbtn,code1,code2) {
                deletebtn.addEventListener('click',function() {
                    delete cfg_taolus[index];
                    localStorage['TAOLUS']=bgpage.toholyjson(cfg_taolus);
                    reload();
                });
                savebtn.addEventListener('click',function() {
                    cfg_taolus[index][0]=try_regexp(code1.textContent);
                    cfg_taolus[index][1]=code2.textContent;
                    localStorage['TAOLUS']=bgpage.toholyjson(cfg_taolus);
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
            taolus.appendChild(container);
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

    id('newtaolu-form').addEventListener('submit',function(e) {
        e.preventDefault();
        cfg_taolus.push([
            try_regexp(id('newtaolu-pattern').value),
            id('newtaolu-name').value
        ]);
        localStorage['TAOLUS']=bgpage.toholyjson(cfg_taolus);
        reload();
        id('newtaolu-pattern').value='';
        id('newtaolu-name').value='';
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
        // 弹幕合并
        localStorage['THRESHOLD']=parseInt(id('threshold').value)>0?parseInt(id('threshold').value):20;
        localStorage['MAX_DIST']=parseInt(id('max-dist').value);
        localStorage['MAX_COSINE']=parseInt(id('max-cosine').value);
        // 弹幕套路
        localStorage['TRIM_ENDING']=id('trim-ending').checked?'on':'off';
        localStorage['TRIM_SPACE']=id('trim-space').checked?'on':'off';
        localStorage['TRIM_WIDTH']=id('trim-width').checked?'on':'off';
        // 例外项
        localStorage['PROC_TYPE7']=id('ignore-type7').checked?'off':'on';
        localStorage['PROC_TYPE4']=id('ignore-type4').checked?'off':'on';
        // 显示设置
        localStorage['DANMU_MARK']=id('danmu-mark').value;
        localStorage['MARK_THRESHOLD']=parseInt(id('mark-threshold').value)>0?parseInt(id('mark-threshold').value):1;
        localStorage['DANMU_SUBSCRIPT']=id('danmu-subscript').checked?'on':'off';
        localStorage['POPUP_BADGE']=id('popup-badge').value;
        // 实验室
        localStorage['ENLARGE']=id('enlarge').checked?'on':'off';
        localStorage['SHRINK']=id('shrink').checked?'on':'off';
        localStorage['REMOVE_SEEK']=id('remove-seek').checked?'on':'off';
        localStorage['BREAK_UPDATE']=id('break-update').checked?'on':'off';
        localStorage['AUTO_PREVENT_SHADE']=id('auto-prevent-shade').checked?'on':'off';
        localStorage['AUTO_DISABLE_DANMU']=id('auto-disable-danmu').checked?'on':'off';
        // 其他
        localStorage['FLASH_NOTIF']=id('flash-notif').checked?'on':'off';
        localStorage['TOOLTIP']=id('tooltip').checked?'on':'off';
        
        reload();
        if(this.id==='break-update' && this.checked)
            get_ws_permission();
    }
    
    loadconfig();
    [
        // 弹幕合并
        'threshold','max-dist','max-cosine',
        // 弹幕套路
        'trim-ending','trim-space','trim-width',
        // 例外项
        'ignore-type7','ignore-type4',
        // 显示设置
        'mark-threshold','danmu-mark','danmu-subscript','popup-badge',
        // 实验室
        'enlarge','shrink','remove-seek','break-update','auto-prevent-shade','auto-disable-danmu',
        // 其他
        'tooltip','flash-notif',
    ].forEach(function(elem) {
        id(elem).addEventListener('change',update);
    });
});

// version check
var xhr=new XMLHttpRequest();
/*for-firefox: xhr.open('get','https://img.shields.io/amo/v/pakkujs.json'); // */ xhr.open('get','https://img.shields.io/chrome-web-store/v/jklfcpboamajpiikgkbjcnnnnooefbhh.json');
xhr.onload=function() {
    var latest_ver=JSON.parse(this.responseText);
    console.log('latest version ',latest_ver);
    if(latest_ver.value!=version) {
        var note=document.createElement('a');
        note.href='http://s.xmcp.ml/pakkujs/?src=update_banner';
        note.id='update-note';
        note.target='_blank';
        note.textContent='你正在使用 pakku '+version+'，'+latest_ver.name+' 中的最新版是 '+latest_ver.value+'。点击此处下载新版本。';
        document.body.appendChild(note);
    }
};
xhr.send();