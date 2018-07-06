// (C) 2018 @xmcp. THIS PROJECT IS LICENSED UNDER GPL VERSION 3. SEE `LICENSE.txt`.

console.log('pakku panel: script injected, D.length = '+D.length);
for(var i=0;i<D.length;i++) {
    D[i].text=D[i].text.replace(/([\r\n\t]|\/n)/g,'');
    D[i].trimmed_text=D[i].text.trim();
}

var try_left=50;
function try_inject() {
    // firstly, f**k firefox
    try {
        // https://blog.mozilla.org/addons/2012/09/12/what-does-cant-access-dead-object-mean/
        root_elem.querySelector('#_okay_i_admit_that_firefox_did_the_right_thing_to_prevent_memory_leak');
    } catch(e) {
        // `Error: can't access dead object`, if the root_elem is destroyed
        root_elem=null;
    }
    // try to find the player element
    if(!root_elem)
        root_elem=document.querySelector('div.bilibili-player');
    /*
    // <del>maybe player is in an iframe</del>
    // already set `allFrames: true` in `inject_panel` so don't need to care about iframes here anymore
    [].slice.call(document.querySelectorAll('iframe')).forEach(function(frame) {
        try {
            if(!root_elem)
                root_elem=frame.contentDocument.querySelector('div.bilibili-player');
        } catch(e) { // maybe cross-domain
            console.error(e);
        }
    });
    */
    // detect new player style
    if(root_elem.closest('.stardust-player')) {
        root_elem=root_elem.closest('body');
        isstardust=true;
        console.log('pakku injector: stardust detected');
    }
    // maybe player is not ready yet
    if(!root_elem || !root_elem.querySelector('.bilibili-player-danmaku')) {
        if(--try_left>0) {
            root_elem=null;
            setTimeout(try_inject,200);
        } else
            console.log('pakku injector: root_elem not found');
        return;
    }
    root_document=root_elem.ownerDocument;

    // 3rd-party scripts can use this for convenience
    window.postMessage({
        type: 'pakku_event_danmaku_loaded',
        pakku_version: chrome.runtime.getManifest().version
    },'*');

    if(root_elem.querySelector('.bilibili-player-danmaku.__pakku_injected')) {
        console.log('pakku injector: already injected');
        return;
    } else {
        console.log('pakku injector: root_elem',root_elem);
        root_elem.querySelector('.bilibili-player-danmaku').classList.add('__pakku_injected');
    }

    if(OPT['TOOLTIP']) {
        var list_elem=root_elem.querySelector('.bilibili-player-danmaku');
        var player_elem=root_elem.querySelector('.bilibili-player-area');
        console.log('pakku injector: list_elem',list_elem,'player_elem',player_elem);
        if(list_elem && player_elem)
            inject_panel(list_elem,player_elem);
    }
    if(OPT['AUTO_PREVENT_SHADE']) {
        var pre_shade_elem=root_elem.querySelector('.bilibili-player-video-btn.bilibili-player-video-btn-danmaku');
        if(pre_shade_elem) {
            trigger_mouse_event(pre_shade_elem,'mouseover');
            trigger_mouse_event(pre_shade_elem,'mouseout');
            var shade_elem=isstardust ?
                root_elem.querySelector('.bilibili-player-video-danmaku-setting-left-preventshade-box input') :
                root_elem.querySelector('.bilibili-player-panel-setting input.bilibili-player-setting-preventshade');
            console.log('pakku injector: pre_shade_elem',pre_shade_elem,'shade_elem',shade_elem);
            if(shade_elem && !shade_elem.checked)
                shade_elem.click();
        } else {
            console.log('pakku injector: pre_shade_elem not found');
        }
    }
    if(OPT['AUTO_DISABLE_DANMU']) {
        var disable_elem=root_elem.querySelector('.bilibili-player-video-btn-danmaku');
        console.log('pakku injector: disable_elem',disable_elem);
        if(disable_elem && !disable_elem.classList.contains('video-state-danmaku-off'))
            disable_elem.click();
    }
    if(OPT['AUTO_DANMU_LIST']) {
        var list_switch_elem=isstardust ?
            root_elem.querySelector('.danmaku-wrap .bui-collapse-header') :
            root_elem.querySelector('.bilibili-player-filter-btn-list');
        console.log('pakku injector: list_switch_elem',list_switch_elem);
        if(list_switch_elem) {
            list_switch_elem.click();
        }
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

    // 3rd-party scripts can use this for convenience
    window.addEventListener('message',function(event) {
        if (event.source!=window)
            return;
        if (event.data.type && event.data.type=='pakku_get_danmaku')
            return window.postMessage({
                type: 'pakku_return_danmaku',
                flag: null,
                resp: D
            },'*');
        else if (event.data.type && event.data.type=='pakku_set_xml_bounce')
            return chrome.runtime.sendMessage({
                type: 'set_xml_bounce',
                result: event.data.xml.toString()
            }, {}, function(resp) {
                if(resp.error===null)
                    reload_danmaku_magic();
            });
        else if(event.data.type && event.data.type=='pakku_get_danmaku_with_uid')
            return chrome.runtime.sendMessage({
                type: 'crack_uidhash_batch',
                dinfo: D
            }, function(D) {
                return window.postMessage({
                    type: 'pakku_return_danmaku',
                    flag: 'uid',
                    resp: D
                },'*');
            });
        else if(event.data.type && event.data.type=='pakku_get_danmaku_with_info')
            return chrome.runtime.sendMessage({
                type: 'load_userinfo_batch',
                dinfo: D,
                silence: !!event.data.silence
            }, function(D) {
                return window.postMessage({
                    type: 'pakku_return_danmaku',
                    flag: 'info',
                    resp: D
                },'*');
            });
    },false);

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