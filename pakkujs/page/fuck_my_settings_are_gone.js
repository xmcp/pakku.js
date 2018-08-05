var container=document.querySelector('#config-list');

document.querySelector('#force-clear').addEventListener('click',function() {
    localStorage['_LAST_UPDATE_TIME']=(+new Date());
    chrome.storage.sync.clear(function() {
        if(chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
        } else {
            alert('云端设置重置成功。');
            location.reload();
        }
    });
});

document.querySelector('#clear-list').addEventListener('click',function() {
    chrome.storage.local.remove('dropped_config',function() {
        if(chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
        } else {
            alert('列表清空成功。');
            location.reload();
        }
    })
})

container.textContent='';

chrome.storage.local.get(['dropped_config'], function(res) {
    (res['dropped_config']||[]).reverse().forEach(function(dropped) {
        var elem=document.createElement('div');
        var title=document.createElement('p');
        title.textContent=new Date(dropped[0]).toLocaleString();
        var content=document.createElement('textarea');
        content.textContent=dropped[1];

        elem.appendChild(title);
        elem.appendChild(content);
        container.appendChild(elem);
    });
});

chrome.storage.sync.get(['_LAST_UPDATE_TIME'], function(res) {
    var t=res['_LAST_UPDATE_TIME'];
    document.querySelector('#cloud-timestamp').textContent=t?(new Date(parseInt(t)).toLocaleString()):'null';
})