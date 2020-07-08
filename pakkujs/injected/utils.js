// 2017-2020 @xmcp. THIS PROJECT IS LICENSED UNDER GPL VERSION 3. SEE `LICENSE.txt`.

// https://stackoverflow.com/questions/3086068/how-do-i-check-whether-a-jquery-element-is-in-the-dom
if(typeof root_elem=='undefined' || !root_elem || !root_elem.closest('html')) {
    var root_elem=null;
    var isstardust=false;
}

function make_p(s) {
    var elem=document.createElement('p');
    elem.textContent=s;
    return elem;
}
function make_a(s,u) {
    var elem=document.createElement('a');
    elem.href=u;
    elem.target='_blank';
    elem.textContent=s;
    return elem;
}
function make_elem(tagname,classname) {
    var elem=document.createElement(tagname);
    elem.className=classname;
    return elem;
}

function proc_mode(mode) {
    switch(parseInt(mode)) {
        case 1: return '|←';
        // 2,3: ???
        case 4: return '↓↓';
        case 5: return '↑↑';
        case 6: return 'R→';
        case 7: return '**';
        case 8: return '[CODE]';
        case 9: return '[BAS]';
        default: return '[MODE'+mode+']';
    }
}

function proc_rgb(x) {
    return [
        Math.floor(x/256/256),
        Math.floor(x/256)%256,
        x%256
    ];
}
// http://www.nbdtech.com/Blog/archive/2008/04/27/Calculating-the-Perceived-Brightness-of-a-Color.aspx
function get_L(r,g,b) {
    return Math.sqrt(
        r*r*.241 +
        g*g*.691 +
        b*b*.068
    )/256;
}

function _fix2(a) {
    return a<10 ? '0'+a : ''+a;
}
function format_date(x) {
    return _fix2(x.getFullYear()%100)+'/'+(x.getMonth()+1)+'/'+x.getDate();
}
function format_datetime(x) {
    return format_date(x)+' '+x.getHours()+':'+_fix2(x.getMinutes());
}
function format_duration(d) {
    d=d|0;
    return d<3600 ?
        (Math.floor(d/60)+':'+_fix2(d%60)) :
        (Math.floor(d/3600)+':'+_fix2(Math.floor((d%3600)/60))+':'+_fix2(d%60));
}

function zero_array(len) {
    var x=new Array(len);
    for(var i=0;i<len;i++) x[i]=0;
    return x;
}

function parse_time(time) { // MMMMMM:SS -> seconds
    var res=/(\d+)\:(\d{2})/.exec(time);
    return parseInt(res[1])*60+parseInt(res[2]);
}

// https://stackoverflow.com/questions/24025165/simulating-a-mousedown-click-mouseup-sequence-in-tampermonkey
function trigger_mouse_event(node, eventType) {
    var clickEvent=document.createEvent('MouseEvents');
    clickEvent.initEvent(eventType,true,true);
    node.dispatchEvent(clickEvent);
}

function show_danmu_list() {
    var list_switch_elem=isstardust ?
        root_elem.querySelector('.danmaku-wrap .bui-collapse-wrap-folded .bui-collapse-header') :
        root_elem.querySelector('.bilibili-player-filter-btn-list');
    console.log('pakku injector: list_switch_elem',list_switch_elem);
    if(list_switch_elem) {
        list_switch_elem.click();
    }
}

function reload_danmaku_magic() {
    if(!root_elem) {
        console.log('pakku magic reload: root_elem not found');
        return;
    }

    function proceed(date_picker) {
        var elem=document.createElement('span');
        elem.className='js-action __pakku_injected';
        elem.dataset['action']='changeDay';
        elem.dataset['timestamp']=0;
        elem.style.display='none';
        date_picker.appendChild(elem);
    
        console.log('pakku magic reload: proceed');
        trigger_mouse_event(elem,'mousedown');
        trigger_mouse_event(elem,'mouseup');
        trigger_mouse_event(elem,'click');
    
        date_picker.removeChild(elem);
    }

    var date_picker=root_elem.querySelector('.player-auxiliary-danmaku-date-picker-day-content, .bilibili-player-danmaku-date-picker-day-content');

    if(date_picker)
        proceed(date_picker);
    else {
        var history_btn=root_elem.querySelector('.player-auxiliary-danmaku-btn-history, .bilibili-player-danmaku-btn-history');
        console.log('pakku magic reload: activating date picker with',history_btn);
        history_btn.click();
        history_btn.click();
        date_picker=root_elem.querySelector('.player-auxiliary-danmaku-date-picker-day-content, .bilibili-player-danmaku-date-picker-day-content');

        if(date_picker)
            proceed(date_picker);
        else { // maybe danmaku panel is hidden
            show_danmu_list();

            var tries_left=10;
            function try_find() {
                history_btn.click();
                history_btn.click();
                date_picker=root_elem.querySelector('.player-auxiliary-danmaku-date-picker-day-content, .bilibili-player-danmaku-date-picker-day-content');

                if(date_picker)
                    proceed(date_picker);
                else {
                    if(--tries_left>0)
                        setTimeout(try_find,350);
                    else
                        console.log('pakku magic reload: FAILED to find date picker');
                }
            }

            setTimeout(try_find,1000);
        }
    }
}
