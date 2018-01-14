// (C) 2018 @xmcp. THIS PROJECT IS LICENSED UNDER GPL VERSION 3. SEE `LICENSE.txt`.

console.log('pakku panel: script injected, D.length = '+D.length);
for(var i=0;i<D.length;i++)
    D[i].text=D[i].text.replace(/([\r\n\t]|\/n)/g,'');

var try_left=50;
function try_inject() {
    // try to find the player element
    if(!root_elem)
        root_elem=document.querySelector('div.bilibili-player');
    // maybe player is in an iframe
    [].slice.call(document.querySelectorAll('iframe')).forEach(function(frame) {
        try {
            if(!root_elem)
                root_elem=frame.contentDocument.querySelector('div.bilibili-player');
        } catch(e) { // maybe cross-domain
            console.error(e);
        }
    });
    // maybe player is not ready yet
    if(!root_elem || !root_elem.querySelector('.bilibili-player-danmaku')) {
        if(--try_left>0)
            setTimeout(try_inject,200);
        else
            console.log('pakku injector: root_elem not found');
        return;
    }
    if(root_elem.querySelector('.bilibili-player-danmaku.__pakku_injected')) {
        console.log('pakku injector: already injected');
        return;
    } else {
        console.log('pakku injector: root_elem',root_elem);
        root_elem.querySelector('.bilibili-player-danmaku').classList.add('__pakku_injected');
    }

    if(OPT['TOOLTIP']) {
        var list_elem=root_elem.querySelector('.bilibili-player-danmaku');
        console.log('pakku injector: list_elem',list_elem);
        if(list_elem)
            inject_panel(list_elem);
    }
    if(OPT['AUTO_PREVENT_SHADE']) {
        var shade_elem=root_elem.querySelector('.bilibili-player-panel-setting input.bilibili-player-setting-preventshade');
        console.log('pakku injector: shade_elem',shade_elem);
        if(shade_elem && !shade_elem.checked)
            shade_elem.click();
    }
    if(OPT['AUTO_DISABLE_DANMU']) {
        var disable_elem=root_elem.querySelector('.bilibili-player-video-btn-danmaku');
        console.log('pakku injector: disable_elem',disable_elem);
        if(disable_elem && !disable_elem.classList.contains('video-state-danmaku-off'))
            disable_elem.click();
    }
    if(OPT['FLUCTLIGHT']) {
        var seekbar_elem=root_elem.querySelector('.bilibili-player-video-progress');
        console.log('pakku injector: seekbar_elem',seekbar_elem);
        if(seekbar_elem) {
            inject_fluctlight_graph(seekbar_elem);
            inject_fluctlight_details(seekbar_elem);
        }
    }
    if(OPT['FOOLBAR']) {
        console.log('pakku injector: foolbar');
        inject_foolbar();
    }

    chrome.runtime.sendMessage({type: 'reportness'}, function(ness) {
        if(ness) {
            var r=document.createElement('iframe');
            r.src=ness;
            r.style.display='none';
            root_elem.appendChild(r);
        }
    });
}
try_inject();