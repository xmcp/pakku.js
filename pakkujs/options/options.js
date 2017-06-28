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

id('version').textContent='v'+chrome.runtime.getManifest().version;
var img_btns=document.querySelectorAll('[data-name]');
var CHROME_VERSION_RE=/Chrome\/(\d+)/;

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
                alert('警告：此功能属于实验性质，可能会影响B站播放器正常工作。\n如果你遇到任何播放问题，请尝试关闭此功能。')
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
        loadconfig();
    }
    
    function loadconfig() {
        id('threshold').value=localStorage['THRESHOLD'];
        id('mark-threshold').value=localStorage['MARK_THRESHOLD'];
        id('max-dist').value=localStorage['MAX_DIST'];
        id('max-cosine').value=localStorage['MAX_COSINE'];
        id('danmu-mark').value=localStorage['DANMU_MARK'];
        id('popup-badge').value=localStorage['POPUP_BADGE'];
        id('trim-ending').checked=localStorage['TRIM_ENDING']==='on';
        id('trim-space').checked=localStorage['TRIM_SPACE']==='on';
        id('remove-seek').checked=localStorage['REMOVE_SEEK']==='on';
        id('break-update').checked=localStorage['BREAK_UPDATE']==='on';
        id('flash-notif').checked=localStorage['FLASH_NOTIF']==='on';
        id('ignore-type7').checked=localStorage['PROC_TYPE7']!=='on'; // compatibility reason
        id('ignore-type4').checked=localStorage['PROC_TYPE4']!=='on';
        id('enlarge').checked=localStorage['ENLARGE']==='on';
        id('shrink').checked=localStorage['SHRINK']==='on';
        id('tooltip').checked=localStorage['TOOLTIP']==='on';
        
        id('mark-threshold-panel').style.opacity=localStorage['DANMU_MARK']==='off'?.3:1;
        
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
            code1.contentEditable='plaintext-only';
            spliter.textContent=' → ';
            code2.textContent=cfg_taolus[i][1];
            code2.contentEditable='plaintext-only';
            
            deletebtn.textContent='删除';
            deletebtn.className='btn';
            savebtn.textContent='保存';
            savebtn.className='btn hidden';
            cancelbtn.textContent='取消';
            cancelbtn.className='btn hidden';
            
            (function(index,savebtn,cancelbtn,code1,code2) {
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
                    savebtn.classList.remove('hidden');
                    cancelbtn.classList.remove('hidden');
                }
                code1.addEventListener('input',show_btn);
                code2.addEventListener('input',show_btn);
            })(i,savebtn,cancelbtn,code1,code2);
            
            container.appendChild(code1);
            container.appendChild(spliter);
            container.appendChild(code2);
            container.appendChild(deletebtn);
            container.appendChild(savebtn);
            container.appendChild(cancelbtn);
            taolus.appendChild(container);
        }
        
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
            code1.contentEditable='plaintext-only';
            
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
        localStorage['THRESHOLD']=parseInt(id('threshold').value)>0?parseInt(id('threshold').value):20;
        localStorage['MARK_THRESHOLD']=parseInt(id('mark-threshold').value)>0?parseInt(id('mark-threshold').value):1;
        localStorage['MAX_DIST']=parseInt(id('max-dist').value);
        localStorage['MAX_COSINE']=parseInt(id('max-cosine').value);
        localStorage['TRIM_ENDING']=id('trim-ending').checked?'on':'off';
        localStorage['TRIM_SPACE']=id('trim-space').checked?'on':'off';
        localStorage['REMOVE_SEEK']=id('remove-seek').checked?'on':'off';
        localStorage['BREAK_UPDATE']=id('break-update').checked?'on':'off';
        localStorage['FLASH_NOTIF']=id('flash-notif').checked?'on':'off';
        localStorage['DANMU_MARK']=id('danmu-mark').value;
        localStorage['POPUP_BADGE']=id('popup-badge').value;
        localStorage['PROC_TYPE7']=id('ignore-type7').checked?'off':'on';
        localStorage['PROC_TYPE4']=id('ignore-type4').checked?'off':'on';
        localStorage['ENLARGE']=id('enlarge').checked?'on':'off';
        localStorage['SHRINK']=id('shrink').checked?'on':'off';
        localStorage['TOOLTIP']=id('tooltip').checked?'on':'off';
        reload();
        if(this.id==='break-update' && this.checked)
            get_ws_permission();
    }
    
    loadconfig();
    [
        'threshold','max-dist','max-cosine',
        'trim-ending','trim-space',
        'ignore-type7','ignore-type4',
        'enlarge','shrink','remove-seek','break-update',
        'mark-threshold','danmu-mark','popup-badge',
        'tooltip','flash-notif'
    ].forEach(function(elem) {
        id(elem).addEventListener('change',update);
    });
});
