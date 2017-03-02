function id(x) {
    return document.getElementById(x);
}

chrome.runtime.getBackgroundPage(function(bgpage) {
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
            bgpage.loadconfig();
            location.reload();
        })})(key);
        
        container.appendChild(deletebtn);
        container.appendChild(code1);
        container.appendChild(spliter);
        container.appendChild(code2);
        taolus.appendChild(container);
    }
    id('remove-seek').checked=localStorage['REMOVE_SEEK']==='on';
    id('flash-notif').checked=localStorage['FLASH_NOTIF']==='on';
    
    id('newtaolu-submit').addEventListener('click',function() {
        var pattern=RegExp(id('newtaolu-pattern').value),
            key=id('newtaolu-name').value;
        cfg_taolus[key]=pattern;
        localStorage['TAOLUS']=bgpage.toholyjson(cfg_taolus);
        bgpage.loadconfig();
        location.reload();
    });
    
    function update() {
        localStorage['THRESHOLD']=parseInt(id('threshold').value)>0?parseInt(id('threshold').value):15;
        localStorage['REMOVE_SEEK']=id('remove-seek').checked?'on':'off';
        localStorage['FLASH_NOTIF']=id('flash-notif').checked?'on':'off';
        bgpage.loadconfig();
        location.reload();
    }
    
    id('threshold').addEventListener('change',update);
    id('remove-seek').addEventListener('change',update);
    id('flash-notif').addEventListener('change',update);
});