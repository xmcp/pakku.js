// 2017-2020 @xmcp. THIS PROJECT IS LICENSED UNDER GPL VERSION 3. SEE `LICENSE.txt`.

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
    var pakku_tag_elem=root_elem;
    // detect new player style
    if(root_elem && !root_elem.querySelector('.bilibili-player-auxiliary-area')) {
        root_elem=root_elem.closest('body');
        isstardust=true;
        console.log('pakku injector: stardust detected');
    }
    // maybe player is not ready yet
    if(root_elem) {
        try_left=Math.min(try_left,15); // don't wait too long for list_elem
        var list_elem=root_elem.querySelector('.bilibili-player-danmaku, .player-auxiliary-danmaku-wrap');
    }
    if(!root_elem || !list_elem) {
        if(--try_left>0) {
            root_elem=null;
            setTimeout(try_inject,200);
            return;
        } else if(!root_elem) {
            console.log('pakku injector: root_elem not found');
            return;
        }
        // else root_elem && !list_elem
        //   maybe an embedded player, just continue
    }

    // 3rd-party scripts can use this for convenience
    window.postMessage({
        type: 'pakku_event_danmaku_loaded',
        pakku_version: chrome.runtime.getManifest().version,
        cid: OPT.CID,
    },'*');

    if(pakku_tag_elem.classList.contains('.__pakku_injected')) {
        console.log('pakku injector: already injected');
        return;
    } else {
        console.log('pakku injector: root_elem',root_elem);
        pakku_tag_elem.classList.add('__pakku_injected');
    }

    if(OPT['TOOLTIP']) {
        var player_elem=root_elem.querySelector('.bilibili-player-area');
        console.log('pakku injector: list_elem',list_elem,'player_elem',player_elem);
        if(player_elem)
            inject_panel(list_elem||document.createElement('div'),player_elem);
    }
    if(OPT['AUTO_DISABLE_DANMU']) {
        var danmu_switch=root_elem.querySelector('.bilibili-player-video-danmaku-switch input[type=checkbox]');
        if(danmu_switch) {
            console.log('pakku injector: danmu_switch',danmu_switch);
            if(danmu_switch.checked)
                danmu_switch.click();
        } else { // legacy
            var disable_elem=root_elem.querySelector('.bilibili-player-video-btn-danmaku');
            console.log('pakku injector: disable_elem LEGACY',disable_elem);
            if(disable_elem && !disable_elem.classList.contains('video-state-danmaku-off'))
                disable_elem.click();
        }
    }
    if(OPT['AUTO_DANMU_LIST']) {
        show_danmu_list();
    }
    if(OPT['FLUCTLIGHT']) {
        fluctlight_cleanup(root_elem);
        var seekbar_new_elem=root_elem.querySelector('.bilibili-player-video-control-top');
        var seekbar_elem=root_elem.querySelector('.bilibili-player-video-progress');
        if(seekbar_new_elem) {
            console.log('pakku injector: seekbar_new_elem',seekbar_new_elem,'seekbar_elem',seekbar_elem);
            if(seekbar_elem) {
                inject_fluctlight_graph(seekbar_elem,2,seekbar_new_elem);
                inject_fluctlight_details(seekbar_elem,2);
            }
        } else {
            console.log('pakku injector: seekbar_elem LEGACY',seekbar_elem);
            if(seekbar_elem) {
                inject_fluctlight_graph(seekbar_elem,1);
                inject_fluctlight_details(seekbar_elem,1);
            }
        }
    }

    // 3rd-party scripts can use this for convenience
    window.addEventListener('message',function(event) {
        if (event.source!=window)
            return;
        if (event.data.type && event.data.type=='pakku_get_danmaku')
            return window.postMessage({
                type: 'pakku_got_danmaku',
                flag: null,
                resp: D
            },'*');
        else if (event.data.type && event.data.type=='pakku_set_danmaku_bounce')
            return chrome.runtime.sendMessage({
                type: 'set_ir_bounce',
                result: {
                    danmakus: event.data.danmakus,
                    cid: OPT.CID,
                    maxlimit: event.data.danmakus.length,
                },
                cid: OPT.CID
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
                    type: 'pakku_got_danmaku',
                    flag: 'uid',
                    resp: D
                },'*');
            });
    },false);
}
try_inject();