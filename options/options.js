function id(x) {
    return document.getElementById(x);
}

id('version').textContent='v'+chrome.runtime.getManifest().version;

chrome.runtime.getBackgroundPage(function(bgpage) {
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
        id('danmu-fuzz').checked=localStorage['DANMU_FUZZ']==='on';
        id('trim-ending').checked=localStorage['TRIM_ENDING']==='on';
        id('trim-space').checked=localStorage['TRIM_SPACE']==='on';
        id('remove-seek').checked=localStorage['REMOVE_SEEK']==='on';
        id('flash-notif').checked=localStorage['FLASH_NOTIF']==='on';
        id('danmu-mark').value=localStorage['DANMU_MARK'];
        id('popup-badge').value=localStorage['POPUP_BADGE'];
        id('proc-type7').checked=localStorage['PROC_TYPE7']==='on';
        id('enlarge').checked=localStorage['ENLARGE']==='on';
        
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
    
    function update() {
        localStorage['THRESHOLD']=parseInt(id('threshold').value)>0?parseInt(id('threshold').value):15;
        localStorage['TRIM_ENDING']=id('trim-ending').checked?'on':'off';
        localStorage['TRIM_SPACE']=id('trim-space').checked?'on':'off';
        localStorage['DANMU_FUZZ']=id('danmu-fuzz').checked?'on':'off';
        localStorage['REMOVE_SEEK']=id('remove-seek').checked?'on':'off';
        localStorage['FLASH_NOTIF']=id('flash-notif').checked?'on':'off';
        localStorage['DANMU_MARK']=id('danmu-mark').value;
        localStorage['POPUP_BADGE']=id('popup-badge').value;
        localStorage['PROC_TYPE7']=id('proc-type7').checked?'on':'off';
        localStorage['ENLARGE']=id('enlarge').checked?'on':'off';
        reload();
    }
    
    loadconfig();
    ['threshold','danmu-fuzz','trim-ending','trim-space','remove-seek','flash-notif','danmu-mark','popup-badge','proc-type7','enlarge']
            .forEach(function(elem) {
        id(elem).addEventListener('change',update);
    });
});
