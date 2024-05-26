import {
    DanmuChunk,
    DanmuCluster,
    DanmuClusterOutput,
    DanmuObject,
    DanmuObjectRepresentative,
    int,
    LocalizedConfig,
    Stats
} from "./types";
import {Queue} from "./queue";

const MATH_LOG5 = Math.log(5);
function calc_enlarge_rate(count: int): number {
    return count<=5 ? 1 : (Math.log(count) / MATH_LOG5);
}

export const DISPVAL_TIME_THRESHOLD = 4500;
const DISPVAL_POWER = .35, SHRINK_MAX_RATE = 1.732;
const WEIGHT_DROPPED = -114514;

const _cvs = document.createElement('canvas');
const _ctx = _cvs.getContext('2d')!;
_ctx.font = `20px 黑体`;

function get_width_if_exceeds(text: string, size: number, threshold: number): number {
    if(text.length * size < threshold) // speedup
        return 0;
    return _ctx.measureText(text).width / 20 * size;
}

function trim_dispstr(text: string): string {
    return text.replace(/([\r\n\t])/g,'').trim();
}

// \u2080 is subscript_number_0
const SUBSCRIPT_CHARS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(x => String.fromCharCode(0x2080 + x));
function to_subscript(x: int): string {
    let ret = SUBSCRIPT_CHARS[x%10];
    while(x >= 10) {
        x = (x/10)|0;
        ret = SUBSCRIPT_CHARS[x%10] + ret;
    }
    return ret;
}

function make_mark_meta(config: LocalizedConfig): (text: string, cnt: int)=>string {
    const MARK_THRESHOLD = config.MARK_THRESHOLD;

    if(config.DANMU_MARK==='off')
        return (text, cnt) => text;
    else { // suffix or prefix
        let make_cnt: (cnt: int)=>string;
        if(config.DANMU_SUBSCRIPT)
            make_cnt = (cnt: int) => `₍${to_subscript(cnt)}₎`;
        else
            make_cnt = (cnt: int) => `[x${cnt}]`;

        return config.DANMU_MARK==='suffix' ?
            (text, cnt) => (
               cnt>MARK_THRESHOLD ? (text + make_cnt(cnt)) : text
            ) : (text, cnt) => (
               cnt>MARK_THRESHOLD ? (make_cnt(cnt) + text) : text
            );
    }
}

function count_small_chars(s: string) {
    const SMALL_CHARS = new Set('₍₀₁₂₃₄₅₆₇₈₉₎↓↑');
    let ret = 0;
    for(let c of s)
        if(SMALL_CHARS.has(c))
            ret++;
    return ret;
}
export function dispval(d: DanmuObject) {
    let text_length;
    if((d as DanmuObjectRepresentative).pakku?.disp_str) {
        // a representative value, check for small chars
        let dr = d as DanmuObjectRepresentative;
        let str = dr.pakku.disp_str;
        text_length = str.length - (dr.pakku.peers.length>1 ? (count_small_chars(str) * .7) : 0);
        //text_length = str.length;
    } else {
        // a peer value
        text_length = d.content.length;
    }
    return Math.sqrt(text_length) * Math.pow(Math.max(Math.min(d.fontsize/25, 2.5), .7), 1.5);
}

let _last_config: null | LocalizedConfig = null;
let make_mark: (text: string, cnt: int) => string;

function build_text(c: DanmuCluster, rep_dm: DanmuObjectRepresentative): void {
    let cnt = c.peers.length;
    let dumped = null;
    if(rep_dm.mode===7  && rep_dm.content[0]==='[')
        try {
            dumped = JSON.parse(rep_dm.content);
        } catch(e) {}

    if(dumped) {
        dumped[4] = make_mark(dumped[4], cnt);
        rep_dm.pakku.disp_str = trim_dispstr(dumped[4]);
        rep_dm.content = JSON.stringify(dumped);
    } else {
        rep_dm.content = make_mark(rep_dm.content, cnt);
        rep_dm.pakku.disp_str = trim_dispstr(rep_dm.content);
    }
}

export function post_combine(input: DanmuClusterOutput, prev_input: DanmuClusterOutput, input_chunk: DanmuChunk<DanmuObject>, config: LocalizedConfig, stats: Stats): DanmuChunk<DanmuObjectRepresentative> {
    if(input_chunk.objs.length===0) // empty chunk
        return {objs: [], extra: input_chunk.extra};

    const THRESHOLD_MS =config.THRESHOLD * 1000;
    const FIRST_TIME_MS = input_chunk.objs[0].time_ms;

    if(config!==_last_config) {
        _last_config = config;
        make_mark = make_mark_meta(config);
    }

    let out_danmus = [] as DanmuObjectRepresentative[];

    // calc danmus included in prev cluster

    let ids_included_in_prev = new Set() as Set<string>;
    let max_included_time = -1;
    for(let i = prev_input.clusters.length-1; i >= 0; i--) {
        let c = prev_input.clusters[i];
        if(c.peers[0].time_ms < FIRST_TIME_MS - THRESHOLD_MS)
            break;

        for(let p of c.peers) {
            ids_included_in_prev.add(p.id);
            max_included_time = Math.max(max_included_time, p.time_ms);
        }
    }

    // gen out_danmus

    for(let c of input.clusters) {
        // dedup from prev cluster

        if(c.peers[0].time_ms < max_included_time) {
            let old_len = c.peers.length;
            c.peers = c.peers.filter(p => !ids_included_in_prev.has(p.id));
            if(c.peers.length===0)
                continue;
            if(c.peers.length!==old_len)
                c.desc.push(`已去除包含在上个分片中的 ${old_len-c.peers.length} 条弹幕`);
        }

        // select a representative obj and make a copy

        let _rep_dm = c.peers[
            Math.min(Math.floor(c.peers.length * config.REPRESENTATIVE_PERCENT / 100), c.peers.length-1)
        ];
        let rep_dm: DanmuObjectRepresentative = {
            ..._rep_dm,
            content: c.chosen_str,
            extra: {
                ..._rep_dm.extra,
            },
            pakku: {
                peers: c.peers,
                desc: c.desc,
                disp_str: '',
            },
        };

        // text, mode elevation, fontsize enlarge, weight, proto_animation

        let max_dm_size = rep_dm.fontsize, max_weight = rep_dm.weight, max_mode = rep_dm.mode;
        for(let p of c.peers) {
            max_weight = Math.max(max_weight, p.weight);
            if(p.fontsize<30)
                max_dm_size = Math.max(max_dm_size, p.fontsize);

            if(p.mode===4) // bottom danmu get top priority
                max_mode = 4;
            else if(p.mode===5 && max_mode!==4) // top danmu get top priority
                max_mode = 5;
        }

        build_text(c, rep_dm);

        if(config.MODE_ELEVATION)
            rep_dm.mode = max_mode;

        rep_dm.fontsize = max_dm_size;
        rep_dm.weight = max_weight;

        if(config.ENLARGE) {
            let enlarge_rate = calc_enlarge_rate(c.peers.length);
            rep_dm.fontsize = Math.ceil(rep_dm.fontsize * enlarge_rate);
            if(enlarge_rate>1.001) {
                c.desc.push(`已放大 ${enlarge_rate.toFixed(2)} 倍：合并数量为 ${c.peers.length}`);
                stats.modified_enlarge++;
            }
        }

        if(config.DANMU_MARK!=='off' && c.peers.length>config.MARK_THRESHOLD) {
            // remove special effect for combined danmus
            rep_dm.extra.proto_animation='';
        }

        // add to out_danmus

        out_danmus.push(rep_dm);
    }

    // final adjustments

    let need_dispval = config.SHRINK_THRESHOLD>0 || config.DROP_THRESHOLD>0;
    const dispval_base = Math.pow(config.SHRINK_THRESHOLD, DISPVAL_POWER);

    let dispval_subtract: Queue<[number, number]> | null = null;
    let onscreen_dispval = 0;

    if(need_dispval) {
        out_danmus.sort((a, b) => a.time_ms - b.time_ms);

        let dispval_preload: [number, number][] = [];
        for(let i = prev_input.clusters.length-1; i >= 0; i--) {
            let c = prev_input.clusters[i];
            if (c.peers[0].time_ms < FIRST_TIME_MS - DISPVAL_TIME_THRESHOLD)
                break;

            // may be dropped
            if(config.DROP_THRESHOLD>0 && onscreen_dispval>config.DROP_THRESHOLD) {
                if(c.peers.length===1 && c.peers[0].weight===1) {
                    let drop_rate = (onscreen_dispval - config.DROP_THRESHOLD) / config.DROP_THRESHOLD;
                    if (drop_rate>1 || Math.random()<drop_rate)
                        continue;
                }
            }

            let dv = dispval(c.peers[0]);
            onscreen_dispval += dv;
            dispval_preload.push([c.peers[0].time_ms + DISPVAL_TIME_THRESHOLD, dv]);
        }

        dispval_preload.reverse();
        dispval_subtract = new Queue<[number, number]>(dispval_preload);
    }

    for(let dm of out_danmus) {
        if(need_dispval) {
            // update dispval

            let dv = dispval(dm);

            while(true) {
                let to_subtract = dispval_subtract!.peek();
                if(to_subtract && dm.time_ms > to_subtract[0]) {
                    onscreen_dispval -= to_subtract[1];
                    dispval_subtract!.pop();
                } else {
                    break;
                }
            }

            // check drop

            if(config.DROP_THRESHOLD>0 && onscreen_dispval>config.DROP_THRESHOLD) {
                if(dm.pakku.peers.length<=1 && dm.weight===1) {
                    let drop_rate = (onscreen_dispval - config.DROP_THRESHOLD) / config.DROP_THRESHOLD;
                    if(drop_rate>1 || Math.random()<drop_rate) {
                        stats.deleted_dispval++;
                        dm.weight = WEIGHT_DROPPED;
                        continue;
                    }
                }
            }

            onscreen_dispval += dv;
            dispval_subtract!.push([dm.time_ms + DISPVAL_TIME_THRESHOLD, dv]);

            // check shrink

            if(config.SHRINK_THRESHOLD>0 && onscreen_dispval>config.SHRINK_THRESHOLD) {
                let shrink_rate = Math.min(Math.pow(onscreen_dispval, DISPVAL_POWER)/dispval_base, SHRINK_MAX_RATE);
                dm.fontsize /= shrink_rate;
                dm.pakku.desc.push(`已缩小 ${shrink_rate.toFixed(2)} 倍：弹幕密度为 ${onscreen_dispval.toFixed(1)}`);
                stats.modified_shrink++;
            }

            // update stats

            stats.num_max_dispval = Math.max(stats.num_max_dispval, onscreen_dispval);

            //dm.content = `[${onscreen_dispval.toFixed(0)}]${dm.content}`;
        }

        if(config.SCROLL_THRESHOLD) {
            if(dm.mode===4 || dm.mode===5) {
                let width = get_width_if_exceeds(dm.content, dm.fontsize, config.SCROLL_THRESHOLD);
                if(width > config.SCROLL_THRESHOLD) {
                    let prefix = dm.mode===4 ? '↓' : '↑';
                    dm.mode = 1;
                    dm.content = prefix + dm.content;
                    dm.pakku.disp_str = prefix + dm.pakku.disp_str;
                    dm.pakku.desc.push(`转换为滚动弹幕：宽度为 ${width.toFixed(0)} px`);
                    stats.modified_scroll++;
                }
            }
        }

        // it seems that hot colorful danmus may have style issues, so we remove the colorful if hot
        if(dm.extra.proto_attr &&  (dm.extra.proto_attr & 4)) {
            dm.extra.proto_colorful = 0;
        }

        stats.num_max_combo = Math.max(stats.num_max_combo, dm.pakku.peers.length);
    }

    if(stats.deleted_dispval) {
        out_danmus = out_danmus.filter(dm => dm.weight!==WEIGHT_DROPPED);
    }

    stats.num_onscreen_danmu += out_danmus.length;

    return {
        objs: out_danmus,
        extra: input_chunk ? input_chunk.extra : {},
    };
}