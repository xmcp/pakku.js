function id(x) {
    return document.getElementById(x);
}

id('version').textContent='v'+chrome.runtime.getManifest().version;
var img_btns=document.querySelectorAll('[data-name]');

chrome.runtime.getBackgroundPage(function(bgpage) {
    id('restore').addEventListener('click',function() {
        if(confirm('确定要重置所有设置吗？\n此操作不可恢复。')) {
            localStorage.clear();
            bgpage.initconfig();
            location.reload();
        }
    });
    
    function reload() {
        bgpage.loadconfig();
        id('saved-alert').classList.remove('hidden');
        setTimeout(function() {
            id('saved-alert').classList.add('hidden');
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
        id('flash-notif').checked=localStorage['FLASH_NOTIF']==='on';
        id('ignore-type7').checked=localStorage['PROC_TYPE7']!=='on'; // compatibility reason
        id('ignore-type4').checked=localStorage['PROC_TYPE4']!=='on';
        id('enlarge').checked=localStorage['ENLARGE']==='on';
        id('shrink').checked=localStorage['SHRINK']==='on';
        
        window.cfg_taolus=bgpage.fromholyjson(localStorage['TAOLUS']);
        var taolus=id('taolus');
        taolus.innerHTML='';
        for(var i in cfg_taolus) {
            var container=document.createElement('li'),
                code1=document.createElement('code'),
                spliter=document.createElement('span'),
                code2=document.createElement('code'),
                deletebtn=document.createElement('button');
                
            code1.textContent=cfg_taolus[i][0].source;
            spliter.textContent=' → ';
            code2.textContent=cfg_taolus[i][1];
            deletebtn.textContent='删除';
            (function(expr) {deletebtn.addEventListener('click',function() {
                for(var i in cfg_taolus)
                    if(cfg_taolus[i][0].source==expr) {
                        delete cfg_taolus[i];
                        localStorage['TAOLUS']=bgpage.toholyjson(cfg_taolus);
                        reload();
                        break;
                    }
            })})(cfg_taolus[i][0].source);
            
            container.appendChild(deletebtn);
            container.appendChild(code1);
            container.appendChild(spliter);
            container.appendChild(code2);
            taolus.appendChild(container);
        }
        
        window.cfg_whitelist=bgpage.fromholyjson(localStorage['WHITELIST']);
        var whitelist=id('whitelist');
        whitelist.innerHTML='';
        for(var i in cfg_whitelist) {
            var container=document.createElement('li'),
                code1=document.createElement('code'),
                deletebtn=document.createElement('button');
                
            code1.textContent=cfg_whitelist[i][0].source;
            deletebtn.textContent='删除';
            (function(expr) {deletebtn.addEventListener('click',function() {
                for(var i in cfg_whitelist)
                    if(cfg_whitelist[i][0].source==expr) {
                        delete cfg_whitelist[i];
                        localStorage['WHITELIST']=bgpage.toholyjson(cfg_whitelist);
                        reload();
                        break;
                    }
            })})(cfg_whitelist[i][0].source);
            
            container.appendChild(deletebtn);
            container.appendChild(code1);
            whitelist.appendChild(container);
        }
        
        Array.from(img_btns).forEach(function(elem) {
            if(localStorage[elem.dataset['name']]===elem.dataset['value'])
                elem.className='img-active';
            else
                elem.className='img-inactive'
        });
    }

    id('newtaolu-form').addEventListener('submit',function(e) {
        e.preventDefault();
        cfg_taolus.push([
            new RegExp(id('newtaolu-pattern').value),
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
            new RegExp(id('newwhitelist-pattern').value),
            "" // could be anything
        ]);
        localStorage['WHITELIST']=bgpage.toholyjson(cfg_whitelist);
        reload();
        id('newwhitelist-pattern').value='';
    });
    Array.from(img_btns).forEach(function(elem) {
        elem.addEventListener('click',function() {
            localStorage[elem.dataset['name']]=elem.dataset['value'];
            reload();
        })
    });
    
    function update() {
        localStorage['THRESHOLD']=parseInt(id('threshold').value)>0?parseInt(id('threshold').value):15;
        localStorage['MARK_THRESHOLD']=parseInt(id('mark-threshold').value)>0?parseInt(id('mark-threshold').value):1;
        localStorage['MAX_DIST']=parseInt(id('max-dist').value);
        localStorage['MAX_COSINE']=parseInt(id('max-cosine').value);
        localStorage['TRIM_ENDING']=id('trim-ending').checked?'on':'off';
        localStorage['TRIM_SPACE']=id('trim-space').checked?'on':'off';
        localStorage['REMOVE_SEEK']=id('remove-seek').checked?'on':'off';
        localStorage['FLASH_NOTIF']=id('flash-notif').checked?'on':'off';
        localStorage['DANMU_MARK']=id('danmu-mark').value;
        localStorage['POPUP_BADGE']=id('popup-badge').value;
        localStorage['PROC_TYPE7']=id('ignore-type7').checked?'off':'on';
        localStorage['PROC_TYPE4']=id('ignore-type4').checked?'off':'on';
        localStorage['ENLARGE']=id('enlarge').checked?'on':'off';
        localStorage['SHRINK']=id('shrink').checked?'on':'off';
        reload();
    }
    
    loadconfig();
    [
        'threshold','max-dist','max-cosine','mark-threshold',
        'trim-ending','trim-space','ignore-type7','ignore-type4',
        'remove-seek','flash-notif','danmu-mark','popup-badge','enlarge','shrink'
    ].forEach(function(elem) {
        id(elem).addEventListener('change',update);
    });
});
