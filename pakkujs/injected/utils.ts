import {int} from "../core/types";

export function make_p(s: string) {
    let elem = document.createElement('p');
    elem.textContent = s;
    return elem;
}

export function make_a(s: string, url: string) {
    let elem = document.createElement('a');
    elem.href = url;
    elem.target = '_blank';
    elem.textContent = s;
    return elem;
}

export function make_elem(tagname: string, classname: string) {
    let elem = document.createElement(tagname);
    elem.className = classname;
    return elem;
}

export function proc_mode(mode: int) {
    switch (mode) {
        case 1:
            return '|←';
        // 2,3: ???
        case 4:
            return '↓↓';
        case 5:
            return '↑↑';
        case 6:
            return 'R→';
        case 7:
            return '**';
        case 8:
            return '[CODE]';
        case 9:
            return '[BAS]';
        default:
            return '[MODE' + mode + ']';
    }
}

export function proc_rgb(x: int): [int, int, int] {
    return [
        Math.floor(x / 256 / 256),
        Math.floor(x / 256) % 256,
        x % 256
    ];
}

// http://www.nbdtech.com/Blog/archive/2008/04/27/Calculating-the-Perceived-Brightness-of-a-Color.aspx
export function get_L(r: number, g: number, b: number) {
    return Math.sqrt(
        r * r * .241 +
        g * g * .691 +
        b * b * .068
    ) / 256;
}

function _fix2(a: int) {
    return a < 10 ? '0' + a : '' + a;
}

export function format_date(x: Date) {
    return _fix2(x.getFullYear() % 100) + '/' + (x.getMonth() + 1) + '/' + x.getDate();
}

export function format_datetime(x: Date) {
    return format_date(x) + ' ' + x.getHours() + ':' + _fix2(x.getMinutes());
}

export function format_duration(d: number) {
    d = d | 0; // to int
    return d < 3600 ?
        (Math.floor(d / 60) + ':' + _fix2(d % 60)) :
        (Math.floor(d / 3600) + ':' + _fix2(Math.floor((d % 3600) / 60)) + ':' + _fix2(d % 60));
}

export function zero_array(len: int): number[] {
    let x = new Array(len);
    for(let i = 0; i < len; i++) x[i] = 0;
    return x;
}

export function parse_time<T>(time: string, fallback: T): number|T { // HH:MM:SS or MMMMMM:SS -> seconds
    let res = /^(?:(\d+):)?(\d+):(\d{2})$/.exec(time);
    if(!res)
        return fallback;

    if(res[1])
        return parseInt(res[1]) * 3600 + parseInt(res[2]) * 60 + parseInt(res[3]);
    else
        return parseInt(res[2]) * 60 + parseInt(res[3]);
}

export function sleep_ms(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
}

export function wait_until_success(fn: (...args: any) => boolean, interval_ms: number, tries: int) {
    if(fn())
        return;
    else if(tries>0) {
        setTimeout(function() {
            wait_until_success(fn, interval_ms, tries-1);
        }, interval_ms);
    }
}