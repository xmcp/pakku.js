import {DanmuChunk, DanmuObject, DanmuObjectRepresentative, int} from "../core/types";
import {Config} from "../background/config";
import {inject_fluctlight} from "./fluctlight";
import {inject_panel} from "./panel";
import {disable_danmu, reload_danmu_magic, show_danmu_list} from "./misc";

function combine_into_d<ObjectType extends DanmuObject>(chunks: Map<int, DanmuChunk<ObjectType>>): ObjectType[] {
    let D: ObjectType[] = [];
    let keys_sorted = Array.from(chunks.keys()).sort((a, b)=>a-b);
    for(let k of keys_sorted)
        D.push(...chunks.get(k)!.objs);
    return D;
}

export function do_inject(chunks: Map<int, DanmuChunk<DanmuObjectRepresentative>>, chunks_del: Map<int, DanmuChunk<DanmuObject>>, config: Config) {
    let try_left = 50;

    function try_inject() {
        // try to find the player element
        window.root_elem = document.querySelector('.bilibili-player-area, .bpx-player-primary-area')!;

        // maybe player is in an iframe
        for(let frame of document.querySelectorAll('iframe')) {
            try {
                if(!window.root_elem)
                    window.root_elem = frame.contentDocument!.querySelector('.bilibili-player, .bilibili-player-area, .bpx-player-primary-area')!;
            } catch (e) {} // maybe cross-domain
        }

        let pakku_tag_elem: HTMLElement = window.root_elem;
        let list_elem: null | HTMLElement = null;

        // maybe player is not ready yet
        if(window.root_elem) {
            window.root_elem = window.root_elem.closest('body')!;
            try_left = Math.min(try_left, 15); // don't wait too long for list_elem
            list_elem = window.root_elem.querySelector('.bilibili-player-danmaku, .player-auxiliary-danmaku-wrap, .bpx-player-dm');
        }
        if(!window.root_elem || !list_elem) {
            if(--try_left > 0) {
                setTimeout(try_inject, 200);
                return;
            } else if(!window.root_elem) {
                console.log('pakku injector: root_elem not found');
                return;
            }
            // else root_elem && !list_elem
            //   maybe an embedded player, just continue
        }
        
        window.danmus = combine_into_d(chunks);
        window.danmus_del = combine_into_d(chunks_del);

        if(pakku_tag_elem.classList.contains('__pakku_injected')) {
            console.log('pakku injector: already injected');

            // cleanup old cached value
            let fluct_cache = window.root_elem.querySelector('[data-pakku_cache_width]') as HTMLElement;
            if(fluct_cache)
                fluct_cache.dataset['pakku_cache_width'] = '';

            // fluctlight need to be reinjected in case player is reloaded
            if(config.FLUCTLIGHT) {
                inject_fluctlight();
            }

            return;
        } else {
            console.log('pakku injector: root_elem', window.root_elem, 'tag_elem', pakku_tag_elem);
            pakku_tag_elem.classList.add('__pakku_injected');
        }

        if(config.TOOLTIP) {
            let player_elem = pakku_tag_elem;
            console.log('pakku injector: list_elem', list_elem, 'player_elem', player_elem);
            if(player_elem)
                inject_panel(list_elem || document.createElement('div'), player_elem, config);
        }
        
        if(config.AUTO_DISABLE_DANMU) {
            disable_danmu();
        }
        
        if(config.AUTO_DANMU_LIST) {
            show_danmu_list();
        }
        
        if(config.FLUCTLIGHT) {
            inject_fluctlight();
        }

        window.reload_danmu_magic = reload_danmu_magic;
    }

    try_inject();
}