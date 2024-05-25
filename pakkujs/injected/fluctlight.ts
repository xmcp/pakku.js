import {DanmuObject, DanmuObjectRepresentative, int} from "../core/types";
import {make_p, parse_time, wait_until_success, zero_array} from "./utils";
import {dispval, DISPVAL_TIME_THRESHOLD} from "../core/post_combine";

const DETAILS_MAX_TIMEDELTA_MS = 10 * 1000;
const GRAPH_DENSITY_POWER = .8;
const GRAPH_DENSITY_SCALE = .667;
const GRAPH_ALPHA = .6;

const COLOR_FILL_WITHDEL = '#ff9999';
const COLOR_FILL_BEF = '#ffbbaa';
const COLOR_FILL_AFT = '#bbaaff';

const COLOR_LINE_WITHDEL = '#cc0000';
const COLOR_LINE_BEF = '#774400';
const COLOR_LINE_AFT = '#1111cc';

let MAX_FLUCT_LINES = 16;

function fluctlight_cleanup() {
    for(let elem of window.root_elem.querySelectorAll('.pakku-fluctlight')) {
        elem.remove();
    }

    if(window.graph_observer)
        window.graph_observer.disconnect();
    if(window.details_observer)
        window.details_observer.disconnect();
}

function inject_fluctlight_graph(bar_elem: HTMLElement, _version: int, cvs_container_elem_for_v2: HTMLElement | null) {
    const HEIGHT = 300;
    const SEEKBAR_PADDING = _version === 1 ? 6 : 0;
    let WIDTH = bar_elem.clientWidth - SEEKBAR_PADDING;

    bar_elem.dataset['pakku_cache_width'] = '-1';

    let canvas_elem = document.createElement('canvas');
    canvas_elem.className = 'pakku-fluctlight pakku-fluctlight-graph';
    let ctx = canvas_elem.getContext('2d')!;

    let progress_elem: HTMLElement | null;
    if(_version === 4 || _version === 2)
        progress_elem = bar_elem;
    else if(_version === 3)
        progress_elem = bar_elem.querySelector('.squirtle-progress-detail');
    else if(_version === 1)
        progress_elem = bar_elem.querySelector('.bilibili-player-video-progress-detail');
    else
        progress_elem = null;

    if(!progress_elem) {
        console.log('! fluctlight cannot find progress_elem');
        return;
    }

    let v4_detail_elem = bar_elem.querySelector('.bpx-player-progress-popup');

    let DURATION = 0;

    function getduration() {
        let total_time_elem = window.root_elem.querySelector('.bilibili-player-video-time-total, .squirtle-video-time-total, .bpx-player-ctrl-time-duration');
        DURATION = (total_time_elem ? parse_time(total_time_elem.textContent!) : 0);
        if(!DURATION) {
            let video_elem = window.root_elem.querySelector('video');
            DURATION = (video_elem ? video_elem.duration : 0)
        }

        if(DURATION > 0)
            DURATION = DURATION * 1000 + 1000;
    }

    getduration();

    function drawline(w: number, h: number, len: number, color: string, alpha: number) {
        ctx.fillStyle = color;
        ctx.globalAlpha = alpha;
        ctx.fillRect(w, HEIGHT - h, len, h);
    }

    function density_transform(d: number) {
        return d <= .001 ? -2 : 1 + Math.pow(d, GRAPH_DENSITY_POWER) * GRAPH_DENSITY_SCALE;
    }

    let den_withdel: number[] = [], den_bef: number[] = [], den_aft: number[] = [];
    let graph_img: HTMLCanvasElement | null = null;

    function block(time: number) {
        return Math.round(time * WIDTH / DURATION);
    }

    function fix_line_visibility(arr_above: number[], arr_below: number[], idx: int) {
        let delta = arr_above[idx] - arr_below[idx];

        // slightly adjust the graph to make sure the line is visible
        if(delta>.05 && delta<2) {
            arr_above[idx] = arr_below[idx] + 2;
        }
    }

    function recalc() {
        if(bar_elem.dataset['pakku_cache_width'] === ''+WIDTH) return true;
        bar_elem.dataset['pakku_cache_width'] = ''+WIDTH;
        console.log('pakku fluctlight: recalc dispval graph with WIDTH =', WIDTH);

        function apply_dispval(arr: number[]) {
            return function (p: DanmuObject) {
                let dispv = dispval(p);
                let time_ms = p.time_ms;
                arr[Math.max(0, block(time_ms))] += dispv;
                arr[block(time_ms + DISPVAL_TIME_THRESHOLD) + 1] -= dispv;
            }
        }

        den_withdel = zero_array(WIDTH);
        den_bef = zero_array(WIDTH);
        den_aft = zero_array(WIDTH);

        getduration();
        if(!DURATION) {
            console.log('pakku fluctlight: failed to get video duration');
            return;
        }

        for(let d of window.danmus) {
            if(!d.pakku.peers.length) return;
            apply_dispval(den_aft)(d);
            d.pakku.peers.forEach(apply_dispval(den_bef));
        }
        for(let d of window.danmus_del) {
            apply_dispval(den_withdel)(d);
        }

        for(let w = 1; w < WIDTH; w++) {
            den_withdel[w] += den_withdel[w - 1];
            den_bef[w] += den_bef[w - 1];
            den_aft[w] += den_aft[w - 1];
        }
        for(let w = 0; w < WIDTH; w++) {
            den_withdel[w] += den_bef[w];

            den_withdel[w] = density_transform(den_withdel[w]);
            den_bef[w] = density_transform(den_bef[w]);
            den_aft[w] = density_transform(den_aft[w]);

            fix_line_visibility(den_bef, den_aft, w);
            fix_line_visibility(den_withdel, den_bef, w);
        }

        // now draw the canvas

        let offscreen_canvas = document.createElement('canvas');
        offscreen_canvas.width = WIDTH;
        offscreen_canvas.height = HEIGHT+2; // +2px to make the bottom line invisible

        let ctx = offscreen_canvas.getContext('2d')!;
        ctx.lineWidth = .75;

        ctx.beginPath();
        ctx.moveTo(-2, HEIGHT+2);
        ctx.lineTo(-2, HEIGHT - den_withdel[0]);
        for(let w = 0; w < WIDTH; w++)
            ctx.lineTo(w, HEIGHT - den_withdel[w]);
        ctx.lineTo(WIDTH+2, HEIGHT - den_withdel[WIDTH-1]);
        ctx.lineTo(WIDTH+2, HEIGHT+2);
        ctx.closePath();
        // withdel
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = GRAPH_ALPHA;
        ctx.strokeStyle = COLOR_LINE_WITHDEL;
        ctx.fillStyle = COLOR_FILL_WITHDEL;
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(-2, HEIGHT+2);
        ctx.lineTo(-2, HEIGHT - den_bef[0]);
        for(let w = 0; w < WIDTH; w++)
            ctx.lineTo(w, HEIGHT - den_bef[w]);
        ctx.lineTo(WIDTH+2, HEIGHT - den_bef[WIDTH-1]);
        ctx.lineTo(WIDTH+2, HEIGHT+2);
        ctx.closePath();
        // clear
        ctx.globalCompositeOperation = 'destination-out';
        ctx.globalAlpha = 1;
        ctx.fill();
        // before
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = GRAPH_ALPHA;
        ctx.strokeStyle = COLOR_LINE_BEF;
        ctx.fillStyle = COLOR_FILL_BEF;
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(-2, HEIGHT+2);
        ctx.lineTo(-2, HEIGHT - den_aft[0]);
        for(let w = 0; w < WIDTH; w++)
            ctx.lineTo(w, HEIGHT - den_aft[w]);
        ctx.lineTo(WIDTH+2, HEIGHT - den_aft[WIDTH-1]);
        ctx.lineTo(WIDTH+2, HEIGHT+2);
        ctx.closePath();
        // clear
        ctx.globalCompositeOperation = 'destination-out';
        ctx.globalAlpha = 1;
        ctx.fill();
        // after
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = COLOR_LINE_AFT;
        ctx.fillStyle = COLOR_FILL_AFT;
        ctx.globalAlpha = GRAPH_ALPHA;
        ctx.fill();
        ctx.stroke();

        graph_img = offscreen_canvas;
        return true;
    }

    function redraw(hltime?: number) {
        if(!recalc()) return;

        canvas_elem.width = WIDTH;
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        ctx.drawImage(graph_img!, 0, 0, WIDTH, HEIGHT+2);

        ctx.save();

        let hlblock = (hltime === undefined) ? undefined : block(hltime * 1000 + 1000);
        if(hlblock !== undefined) {
            // add gradient
            let GRALENGTH = 90;
            let EDGESIZE = GRALENGTH * .9;

            let curblock = hlblock;
            if(hlblock < EDGESIZE) hlblock = EDGESIZE;
            else if(hlblock > WIDTH - EDGESIZE) hlblock = WIDTH - EDGESIZE;

            let gra = ctx.createLinearGradient(hlblock - GRALENGTH, 0, hlblock + GRALENGTH, 0);
            gra.addColorStop(0, 'rgba(255,255,255,0)');
            gra.addColorStop(.1, 'rgba(255,255,255,1)');
            gra.addColorStop(.9, 'rgba(255,255,255,1)');
            gra.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.globalCompositeOperation = 'destination-out';
            ctx.globalAlpha = .4;
            ctx.fillStyle = gra;
            ctx.fillRect(hlblock - GRALENGTH, 0, GRALENGTH * 2, HEIGHT);

            // highlight current time
            ctx.globalCompositeOperation = 'source-over';
            drawline(curblock, den_withdel[curblock], 2, COLOR_LINE_WITHDEL, 1);
            drawline(curblock, den_bef[curblock], 2, COLOR_LINE_BEF, 1);
            drawline(curblock, den_aft[curblock], 2, COLOR_LINE_AFT, 1);
        }

        ctx.restore();
    }

    redraw();
    window.fluctlight_highlight = redraw;

    canvas_elem.height = HEIGHT;

    canvas_elem.style.display = 'none';
    canvas_elem.style.position = 'absolute';
    canvas_elem.style.marginBottom = -HEIGHT + 'px';

    if(_version === 4)
        canvas_elem.style.top = (-HEIGHT - 102) + 'px';
    else if (_version === 3)
        canvas_elem.style.top = (-HEIGHT - 92) + 'px';
    else if (_version === 2)
        canvas_elem.style.bottom = (HEIGHT + 119) + 'px';
    else if (_version === 1) {
        canvas_elem.style.position = 'relative';
        canvas_elem.style.bottom = (HEIGHT + 120) + 'px';
        canvas_elem.style.marginBottom = '0';
    }

    if (_version === 4 || _version === 3)
        bar_elem.insertBefore(canvas_elem, bar_elem.firstChild);
    else if (_version === 2)
        cvs_container_elem_for_v2!.insertBefore(canvas_elem, cvs_container_elem_for_v2!.firstChild);
    else if (_version === 1)
        bar_elem.appendChild(canvas_elem);

    // show or hide
    window.graph_observer = new MutationObserver(function (muts) {
        let bar_opened = (
            _version === 4 ?
                progress_elem!.classList.contains('bpx-state-active') :
            _version === 3 ?
                progress_elem!.style.display === 'block' :
            _version === 2 ?
                progress_elem!.classList.contains('bilibili-player-show') :
            _version === 1 ?
                progress_elem!.style.display !== 'none' :
                false
        );

        console.log('pakku fluctlight: graph observer, bar_opened =', bar_opened);

        if (_version === 4 && v4_detail_elem) {
            let v_offset = v4_detail_elem.clientHeight;
            if (v_offset > 0)
                canvas_elem.style.top = (-HEIGHT - 12 - v_offset) + 'px';
        }

        if (bar_opened && canvas_elem.style.display === 'none') {
            canvas_elem.style.display = 'initial';
            // detect resize
            let width = bar_elem.clientWidth - SEEKBAR_PADDING;
            if (width && width !== WIDTH) {
                WIDTH = width;
                redraw();
            }
        } else if (!bar_opened && canvas_elem.style.display !== 'none') {
            canvas_elem.style.display = 'none';
            canvas_elem.width = 0;
        }
    });
    window.graph_observer.observe(progress_elem, {
        attributes: true,
        attributeFilter: _version === 4 ? ['class'] : _version === 3 ? ['style'] : _version === 2 ? ['class'] : ['style']
    });
}

function inject_fluctlight_details(bar_elem: HTMLElement, _version: int) {
    let fluct = document.createElement('div');
    fluct.className = 'pakku-fluctlight pakku-fluctlight-fluct';
    let time_elem = bar_elem.querySelector('.bilibili-player-video-progress-detail-time, .squirtle-progress-time, .bpx-player-progress-preview-time') as HTMLElement;
    let detail_elem = bar_elem.querySelector('.bilibili-player-video-progress-detail, .squirtle-progress-detail, .bpx-player-progress-popup') as HTMLElement;
    if (!time_elem) {
        console.log('! fluctlight cannot find time_elem');
        return;
    }
    if (!detail_elem) {
        console.log('! fluctlight cannot find detail_elem')
    }

    if (_version === 2)
        detail_elem = detail_elem.querySelector('.bilibili-player-video-progress-detail-container') || detail_elem;

    function to_dom(danmu: DanmuObjectRepresentative) {
        let p = make_p(danmu.content);
        if (danmu.pakku.peers.length > 1)
            p.style.fontWeight = 'bold';
        return p;
    }

    function mode_prio(mode: int) { // smaller is more prior
        switch (mode) {
            case 4:
                return 1; //'↓↓'
            case 5:
                return 2; //'↑↑'
            case 7:
                return 3; //'**'
            case 1:
                return 4; //'|←'
            default:
                return 999;
        }
    }

    function sort_danmus() {
        let danmus = [];
        for(let d of window.danmus) {
            if (d.pakku.peers.length && d.pakku.peers[0].mode !== 8/*code*/)
                danmus.push(d);
        }
        danmus.sort(function (a, b) {
            return a.time_ms - b.time_ms;
        });
        return danmus;
    }

    let D_tag = window.danmus; // handle D update
    let D_sorted = sort_danmus();

    function bisect_idx(time_ms: number) {
        let lo = 0, hi = D_sorted.length;
        while (lo < hi) {
            let mid = (lo + hi) >> 1;
            if (D_sorted[mid].time_ms < time_ms)
                lo = mid + 1;
            else
                hi = mid;
        }
        return lo;
    }

    // time
    window.details_observer = new MutationObserver(function (muts) {
        muts.forEach(function (mut) {
            if (mut.addedNodes) {
                let time_str = mut.addedNodes[0].textContent!;
                //console.log('pakku fluctlight: details', time_str);

                if (time_str === fluct.dataset['current_time']) return;
                fluct.dataset['current_time'] = ''+time_str;

                fluct.style.height = '0';
                fluct.textContent = '';
                let time = parse_time(time_str);
                let time_ms = time * 1000 + 1000;
                let danmus = [];

                if (window.danmus !== D_tag) { // recalc D_sorted if D is changed
                    D_tag = window.danmus;
                    D_sorted = sort_danmus();
                }

                for(let i = bisect_idx(time_ms - DETAILS_MAX_TIMEDELTA_MS); i < D_sorted.length; i++) {
                    let d = D_sorted[i];
                    if (d.time_ms > time_ms)
                        break;
                    danmus.push(d);
                }

                danmus = danmus.sort(function (a, b) {
                    return (
                        a.pakku.peers.length - b.pakku.peers.length ||
                        mode_prio(b.pakku.peers[0].mode) - mode_prio(a.pakku.peers[0].mode) ||
                        a.time_ms - b.time_ms
                    );
                }).slice(-MAX_FLUCT_LINES);
                danmus.forEach(function (danmu) {
                    fluct.appendChild(to_dom(danmu));
                });

                let container_height = (danmus.length ? 4 + 16 * danmus.length : 0);

                fluct.style.height = container_height + 'px';
                if (_version === 3 || _version === 4) {
                    fluct.style.bottom = container_height + 'px';
                    fluct.style.marginBottom = (-container_height) + 'px';
                } else if (_version === 2) {
                    fluct.style.bottom = '0';
                } else {
                    fluct.style.bottom = (72 + container_height) + 'px';
                }

                if (window.fluctlight_highlight)
                    window.fluctlight_highlight(time);
            }
        });
    });
    window.details_observer.observe(time_elem, {
        childList: true
    });

    fluct.dataset['current_time'] = '';

    detail_elem.insertBefore(fluct, detail_elem.firstChild);
}

export function inject_fluctlight() {
    fluctlight_cleanup();
    wait_until_success(function () {
        let seekbar_v4_elem = window.root_elem.querySelector('.bpx-player-progress-wrap') as HTMLElement;
        if (seekbar_v4_elem) {
            console.log('pakku injector: seekbar v4_elem', seekbar_v4_elem);
            inject_fluctlight_graph(seekbar_v4_elem, 4, null);
            inject_fluctlight_details(seekbar_v4_elem, 4);
            return true;
        }

        let seekbar_v3_elem = window.root_elem.querySelector('.squirtle-progress-wrap') as HTMLElement;
        if (seekbar_v3_elem) {
            console.log('pakku injector: seekbar v3_elem', seekbar_v3_elem);
            inject_fluctlight_graph(seekbar_v3_elem, 3, null);
            inject_fluctlight_details(seekbar_v3_elem, 3);
            return true;
        }

        let seekbar_v2_elem = window.root_elem.querySelector('.bilibili-player-video-progress') as HTMLElement;
        let seekbar_cvs_elem = window.root_elem.querySelector('.bilibili-player-video-control-top, .bpx-player-control-wrap .squirtle-controller, .bpx-player-control-wrap .bpx-player-progress-wrap') as HTMLElement;
        if (seekbar_v2_elem && seekbar_cvs_elem) {
            console.log('pakku injector: seekbar v2_elem', seekbar_v2_elem, 'cvs_elem', seekbar_cvs_elem);
            inject_fluctlight_graph(seekbar_v2_elem, 2, seekbar_cvs_elem);
            inject_fluctlight_details(seekbar_v2_elem, 2);
            return true;
        }

        if (seekbar_v2_elem) {
            console.log('pakku injector: seekbar v1_elem', seekbar_v2_elem);
            inject_fluctlight_graph(seekbar_v2_elem, 1, null);
            inject_fluctlight_details(seekbar_v2_elem, 1);
            return true;
        }

        return false;
    }, 400, 50);
}