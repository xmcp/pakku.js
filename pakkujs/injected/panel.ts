import {
    format_datetime,
    format_duration,
    get_L,
    make_a,
    make_elem,
    make_p,
    proc_mode,
    proc_rgb,
    sleep_ms
} from "./utils";
import {AnyObject, DanmuObjectRepresentative, int} from "../core/types";
import {crack_uidhash} from "./crc32_crack";
import {Config} from "../background/config";

function make_panel_dom() {
    let dom = make_elem('div', 'pakku-panel');
    let dom_title = make_elem('p', 'pakku-panel-title');
    let dom_close = make_elem('button', 'pakku-panel-close') as HTMLButtonElement;
    let dom_selectbar = make_elem('div', 'pakku-panel-selectbar');

    dom_close.type = 'button';
    dom_close.textContent = '×';

    dom_title.appendChild(dom_close);
    dom_title.appendChild(make_elem('span', 'pakku-panel-text'));

    dom_selectbar.appendChild(make_elem('span', 'pakku-panel-selectbar-left'));
    dom_selectbar.appendChild(make_elem('span', 'pakku-panel-selectbar-right'));
    dom_selectbar.appendChild(make_elem('span', 'pakku-panel-selectbar-content'));

    dom.appendChild(dom_title);
    dom.appendChild(dom_selectbar);
    dom.appendChild(make_elem('hr', ''));
    dom.appendChild(make_elem('div', 'pakku-panel-desc'));
    dom.appendChild(make_elem('hr', 'pakku-for-desc'));
    dom.appendChild(make_elem('div', 'pakku-panel-peers'));
    dom.appendChild(make_elem('hr', 'pakku-for-footer'));
    dom.appendChild(make_elem('div', 'pakku-panel-footer text-fix'));

    return dom;
}

type UserInfoType = AnyObject;
let _mem_info: {[k: int]: UserInfoType} = {};

async function load_userinfo(uid: int, logger: HTMLElement): Promise<UserInfoType> {
    if(_mem_info[uid]) {
        return _mem_info[uid];
    }

    let res = await chrome.runtime.sendMessage(null, {
        type: 'xhr_proxy',
        url: 'https://api.bilibili.com/x/web-interface/card?type=json&mid=' + uid,
    });

    try {
        if(res.error || res.status!==200)
            throw new Error('pakku panel: get sender info failed');
        res = JSON.parse(res.text);
    } catch (e) {
        logger.innerHTML = '';
        logger.appendChild(make_a(
            uid + ' 个人信息加载失败',
            '//space.bilibili.com/' + uid
        ));
        throw e;
    }

    _mem_info[uid] = res;
    return res;
}

const UID_MAX_DIGIT = 10;

async function query_uid(uidhash: string, logger_container: HTMLElement) {
    if(logger_container.dataset['_current_hash'] === uidhash) return;
    logger_container.dataset['_current_hash'] = uidhash;
    logger_container.textContent = '';
    let logger = document.createElement('div');
    logger_container.appendChild(logger);

    logger.textContent = uidhash + ' 正在获取 UID...';
    await sleep_ms(1);

    let uids = crack_uidhash(uidhash, UID_MAX_DIGIT);
    if(uids.length) {
        logger.textContent = '';
        for(let uid of uids) {
            let subitem = document.createElement('p');
            subitem.textContent = uid + ' 正在加载个人信息...';
            logger.appendChild(subitem);
            let res = await load_userinfo(uid, subitem);
            let nickname, lv, exp, fans, sex;

            if(!res?.data?.card?.mid || !res?.data?.card?.level_info?.current_level) {
                subitem.remove();
                return;
            }
            try {
                nickname = res.data.card.name;
                lv = res.data.card.level_info.current_level;
                exp = res.data.card.level_info.current_exp;
                fans = res.data.card.fans;
                sex = ({'男': '♂', '女': '♀'} as any)[res.data.card.sex] || '〼';
            } catch (e) {
                subitem.textContent = '';
                subitem.appendChild(make_a(
                    uid + ' 个人信息加载失败',
                    '//space.bilibili.com/' + uid
                ));
                throw e;
            }

            subitem.textContent = '';
            subitem.appendChild(make_a(
                uid + ' Lv' + lv + (exp ? ('(' + exp + ') ') : ' ') + sex + ' ' + (fans ? +fans + '★ ' : '') + nickname,
                '//space.bilibili.com/' + uid,
            ));
        }
    } else {
        logger.textContent = uidhash + ' UID 不存在';
    }
}

export function inject_panel(list_elem: HTMLElement, player_elem: HTMLElement, config: Config) {
    let panel_obj = document.createElement('div');
    panel_obj.style.display = 'none';
    panel_obj.appendChild(make_panel_dom());
    panel_obj.querySelector('.pakku-panel-close')!.addEventListener('click', function () {
        panel_obj.style.display = 'none';
    });
    panel_obj.addEventListener('mousewheel', function (e) {
        e.stopPropagation();
    });
    window.root_elem.ownerDocument.addEventListener('click', function (e) {
        if(!panel_obj.contains(e.target as HTMLElement) && !list_elem.contains(e.target as HTMLElement))
            panel_obj.style.display = 'none';
    });

    player_elem.appendChild(panel_obj);

    function extract_danmaku_text(elem: HTMLElement) {
        for(let sub of (elem.children as any)) {
            if(sub.className.endsWith('text')) // e.g. b-danmaku-high-text
                return sub.textContent!;
        }
        return elem.textContent!;
    }

    function show_panel(dminfo: {str: string, index?: int}, floating: boolean = false) {
        let dm_ultralong = dminfo.str.length > 498,
            dm_str = dminfo.str.replace(/([\r\n\t])/g, '').trim(),
            text_container = panel_obj.querySelector('.pakku-panel-text') as HTMLElement,
            selectbar = {
                bar: panel_obj.querySelector('.pakku-panel-selectbar') as HTMLElement,
                content: panel_obj.querySelector('.pakku-panel-selectbar-content') as HTMLElement,
                left: panel_obj.querySelector('.pakku-panel-selectbar-left') as HTMLElement,
                right: panel_obj.querySelector('.pakku-panel-selectbar-right') as HTMLElement,
            },
            desc_container = panel_obj.querySelector('.pakku-panel-desc') as HTMLElement,
            peers_container = panel_obj.querySelector('.pakku-panel-peers') as HTMLElement,
            footer_container = panel_obj.querySelector('.pakku-panel-footer') as HTMLElement;

        panel_obj.style.display = 'block';
        text_container.textContent = '';
        desc_container.innerHTML = '';
        peers_container.innerHTML = '';
        footer_container.textContent = '';
        footer_container.dataset['_current_hash'] = '';

        let infos: DanmuObjectRepresentative[] = [];
        let accurate_guess = false;
        // the list might be sorted in a wrong way, so let's guess the index
        if(
            typeof dminfo.index === 'number'
            && window.danmus[dminfo.index]
            && (dm_ultralong ? window.danmus[dminfo.index].pakku.disp_str.startsWith(dm_str) : window.danmus[dminfo.index].pakku.disp_str === dm_str)
        ) {
            accurate_guess = true;
            infos = [window.danmus[dminfo.index]];
        } else {
            for(let d of window.danmus)
                if((dm_ultralong ? d.pakku.disp_str.startsWith(dm_str) : d.pakku.disp_str === dm_str))
                    infos.push(d);
        }

        console.log('pakku panel: show panel', infos, accurate_guess ? '(accurate)' : '(searched)');

        function redraw_ui(idx: int) {
            if(idx < 0) idx += infos.length;
            else if(idx >= infos.length) idx -= infos.length;
            let info = infos[idx];

            text_container.textContent = info.content;

            selectbar.bar.style.display = infos.length > 1 ? 'block' : 'none';
            selectbar.content.textContent = (idx + 1) + '/' + infos.length + ' [' + format_duration(info.time_ms / 1000) + ']';
            selectbar.left.onclick = function () {
                redraw_ui(idx - 1);
            };
            selectbar.right.onclick = function () {
                redraw_ui(idx + 1);
            };

            desc_container.textContent = '';
            for(let desc of info.pakku.desc) {
                desc_container.appendChild(make_p(desc));
            }

            peers_container.textContent = '';
            for(let p of info.pakku.peers) {
                let self = document.createElement('div');
                let color = proc_rgb(p.color);
                self.style.color = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
                self.classList.add(get_L(color[0], color[1], color[2]) > .5 ? 'black' : 'white');

                self.appendChild(make_p(proc_mode(p.mode) + ' ' + p.content));
                self.appendChild(make_p(
                    p.pakku.sim_reason + ' ' + p.sender_hash + ' ' + (p.time_ms / 1000).toFixed(1) + 's ' + p.fontsize + 'px '
                    + 'W' + p.weight + ' ' + format_datetime(new Date(p.sendtime * 1000))
                ));

                self.addEventListener('mouseover', function () {
                    void query_uid(p.sender_hash, footer_container);
                });

                peers_container.appendChild(self);
            }
            if(info.pakku.peers[0])
                void query_uid(info.pakku.peers[0].sender_hash, footer_container);
        }

        if(infos.length) {
            redraw_ui(0);
        } else {
            text_container.textContent = dminfo.str;
            desc_container.appendChild(make_p('找不到弹幕详情'));
        }

        peers_container.scrollTo(0, 0);

        if(floating)
            panel_obj.classList.add('pakku-floating');
        else
            panel_obj.classList.remove('pakku-floating');
    }

    if(window.panel_listener) {
        list_elem.removeEventListener('click', window.panel_listener);
        console.log('pakku panel: removing previous hook listener');
    }
    list_elem.addEventListener('click', window.panel_listener = function (e) {
        let dm_obj = e.target;
        if(!dm_obj.classList.contains('dm-info-row') && !dm_obj.classList.contains('danmaku-info-row'))
            dm_obj = dm_obj.parentElement;
        if(dm_obj && dm_obj.classList.contains('danmaku-info-row') && dm_obj.getAttribute('dmno')) // ver 2
            show_panel({
                str: dm_obj.querySelector('.danmaku-info-danmaku').title,
                index: parseInt(dm_obj.getAttribute('dmno')),
            });
        if(dm_obj && dm_obj.classList.contains('dm-info-row') && dm_obj.getAttribute('data-index')) // ver 3
            show_panel({
                str: dm_obj.querySelector('.dm-info-dm').title,
                index: parseInt(dm_obj.getAttribute('data-index')),
            });
    });

    let danmaku_stage = player_elem.querySelector('.bilibili-player-video-danmaku, .bpx-player-row-dm-wrap');
    if(danmaku_stage && config.TOOLTIP_KEYBINDING) {
        let hover_counter = 0;
        danmaku_stage.addEventListener('mouseover', function (e) {
            hover_counter++;
            let target = (e.target as HTMLElement).closest('.bilibili-danmaku, .b-danmaku:not(.b-danmaku-hide), .bili-dm') as HTMLElement;
            if(target) {
                show_panel({str: extract_danmaku_text(target)}, true);
            }
        });
        danmaku_stage.addEventListener('mouseout', function (e) {
            if(--hover_counter < 0)
                hover_counter = 0;
            if(hover_counter === 0 && panel_obj.classList.contains('pakku-floating'))
                panel_obj.style.display = 'none';
        });
        danmaku_stage.addEventListener('click', function (e) {
            let target = (e.target as HTMLElement).closest('.bilibili-danmaku, .b-danmaku:not(.b-danmaku-hide), .bili-dm') as HTMLElement;
            if(target) {
                show_panel({str: extract_danmaku_text(target)});
                e.stopPropagation();
            }
            player_elem.classList.remove('__pakku_pointer_event');
        });
        window.root_elem.ownerDocument.addEventListener('keydown', function (e) {
            if((e.key === 'Control' || e.key === 'Meta') && !e.repeat) {
                if (!(e.target as HTMLElement).closest('input,textarea')) { // only enter selection mode if not in input box
                    hover_counter = 0;
                    player_elem.classList.add('__pakku_pointer_event');
                }
            } else if (!e.ctrlKey && !e.metaKey) { // fix ctrl key state
                player_elem.classList.remove('__pakku_pointer_event');
                if (panel_obj.classList.contains('pakku-floating'))
                    panel_obj.style.display = 'none';
            }
        });
        window.root_elem.ownerDocument.addEventListener('keyup', function (e) {
            if (e.key === 'Control' || e.key === 'Meta') {
                player_elem.classList.remove('__pakku_pointer_event');
                if (panel_obj.classList.contains('pakku-floating'))
                    panel_obj.style.display = 'none';
            }
        });
        // after the webpage lost focus, `keyup` event might not be dispatched
        window.root_elem.ownerDocument.defaultView!.addEventListener('blur', function () {
            player_elem.classList.remove('__pakku_pointer_event');
        })
    }
}
