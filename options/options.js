function id(x) {
    return document.getElementById(x);
}

id('version').textContent=chrome.runtime.getManifest().version;

chrome.runtime.getBackgroundPage(function(bgpage) {
    function reload() {
        bgpage.loadconfig();
        id('saved-alert').classList.remove('hidden');
        setTimeout(function(){location.reload();},50);
    }
    
    id('threshold').value=localStorage['THRESHOLD'];
    var cfg_taolus=bgpage.fromholyjson(localStorage['TAOLUS']);
    var taolus=id('taolus');
    for(var key in cfg_taolus) {
        var container=document.createElement('li'),
            code1=document.createElement('code'),
            spliter=document.createElement('span'),
            code2=document.createElement('code'),
            deletebtn=document.createElement('button');
            
        code1.textContent=cfg_taolus[key].source;
        spliter.textContent=' → ';
        code2.textContent=key;
        deletebtn.textContent='删除';
        (function(key) {deletebtn.addEventListener('click',function() {
            delete cfg_taolus[key];
            localStorage['TAOLUS']=bgpage.toholyjson(cfg_taolus);
            reload();
        })})(key);
        
        container.appendChild(deletebtn);
        container.appendChild(code1);
        container.appendChild(spliter);
        container.appendChild(code2);
        taolus.appendChild(container);
    }
    id('remove-seek').checked=localStorage['REMOVE_SEEK']==='on';
    id('flash-notif').checked=localStorage['FLASH_NOTIF']==='on';
    id('danmu-badge').checked=localStorage['DANMU_BADGE']==='on';
    id('popup-badge').value=localStorage['POPUP_BADGE'];
    
    id('newtaolu-form').addEventListener('submit',function(e) {
        e.preventDefault();
        var pattern=RegExp(id('newtaolu-pattern').value),
            key=id('newtaolu-name').value;
        cfg_taolus[key]=pattern;
        localStorage['TAOLUS']=bgpage.toholyjson(cfg_taolus);
        reload();
    });
    
    function update() {
        localStorage['THRESHOLD']=parseInt(id('threshold').value)>0?parseInt(id('threshold').value):15;
        localStorage['REMOVE_SEEK']=id('remove-seek').checked?'on':'off';
        localStorage['FLASH_NOTIF']=id('flash-notif').checked?'on':'off';
        localStorage['DANMU_BADGE']=id('danmu-badge').checked?'on':'off';
        localStorage['POPUP_BADGE']=id('popup-badge').value;
        reload();
    }
    
    ['threshold','remove-seek','flash-notif','danmu-badge','popup-badge'].forEach(function(elem) {
        id(elem).addEventListener('change',update);
    });
});