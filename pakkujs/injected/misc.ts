export function show_danmu_list() {
    let list_switch_elem = window.root_elem.querySelector('.danmaku-box .bui-collapse-wrap-folded .bui-collapse-header, #danmukuBox .bui-collapse-wrap-folded .bui-collapse-header') as HTMLElement;
    console.log('pakku injector: list_switch_elem', list_switch_elem);
    if(list_switch_elem) {
        setTimeout(function () {
            list_switch_elem.click();
        }, 500);
    }
}

export function disable_danmu() {
    let danmu_switch = window.root_elem.querySelector('.bilibili-player-video-danmaku-switch input[type=checkbox], .bpx-player-dm-switch input[type=checkbox]') as HTMLInputElement;
    if(danmu_switch) {
        console.log('pakku injector: danmu_switch', danmu_switch);
        if(danmu_switch.checked)
            danmu_switch.click();
    } else { // legacy
        let disable_elem = window.root_elem.querySelector('.bilibili-player-video-btn-danmaku') as HTMLElement;
        console.log('pakku injector: disable_elem LEGACY', disable_elem);
        if(disable_elem && !disable_elem.classList.contains('video-state-danmaku-off'))
            disable_elem.click();
    }
}

let _reload_danmu_id = 1;

function trigger_mouse_event(node: HTMLElement, eventType: string) {
    let e = new MouseEvent(eventType, {bubbles: true, cancelable: true});
    node.dispatchEvent(e);
}

export function reload_danmu_magic() {
    function proceed(date_picker: HTMLElement) {
        let elem = document.createElement('span');
        elem.className = 'js-action __pakku_injected';
        elem.dataset['action'] = 'changeDay';
        elem.dataset['timestamp'] = '' + (86400 + _reload_danmu_id * 86400);
        elem.style.display = 'none';
        date_picker.appendChild(elem);

        console.log('pakku reload danmu: proceed');
        trigger_mouse_event(elem, 'mousedown');
        trigger_mouse_event(elem, 'mouseup');
        trigger_mouse_event(elem, 'click');

        date_picker.removeChild(elem);
        _reload_danmu_id = (_reload_danmu_id + 1) % 3650;
    }

    let date_picker = window.root_elem.querySelector('.player-auxiliary-danmaku-date-picker-day-content, .bilibili-player-danmaku-date-picker-day-content') as HTMLElement;

    if(date_picker)
        proceed(date_picker);
    else {
        let history_btn = window.root_elem.querySelector('.player-auxiliary-danmaku-btn-history, .bpx-player-dm-btn-history, .bilibili-player-danmaku-btn-history') as HTMLElement;
        console.log('pakku reload danmu: activating date picker with', history_btn);
        history_btn.click();
        history_btn.click();
        date_picker = window.root_elem.querySelector('.player-auxiliary-danmaku-date-picker-day-content, .bpx-player-date-picker-day-content, .bilibili-player-danmaku-date-picker-day-content') as HTMLElement;

        if(date_picker)
            proceed(date_picker);
        else { // maybe danmaku panel is hidden
            show_danmu_list();

            let tries_left = 10;

            function try_find() {
                history_btn.click();
                history_btn.click();
                date_picker = window.root_elem.querySelector('.player-auxiliary-danmaku-date-picker-day-content, .bpx-player-date-picker-day-content, .bilibili-player-danmaku-date-picker-day-content') as HTMLElement;

                if(date_picker)
                    proceed(date_picker);
                else {
                    if(--tries_left > 0)
                        setTimeout(try_find, 350);
                    else
                        console.log('pakku reload danmu: FAILED to find date picker');
                }
            }

            setTimeout(try_find, 1000);
        }
    }
}
