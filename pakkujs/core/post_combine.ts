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

const MATH_LOG5 = Math.log(5);
function calc_enlarge_rate(count: int): number {
    return count<=5 ? 1 : (Math.log(count) / MATH_LOG5);
}

const DISPVAL_THRESHOLD = 80, SHRINK_TIME_THRESHOLD = 3000;
const DISPVAL_BASE = Math.sqrt(DISPVAL_THRESHOLD);

const _cvs = document.createElement('canvas');
const _ctx = _cvs.getContext('2d')!;
_ctx.font = `20px 黑体`;

function get_width_if_exceeds(text: string, size: number, threshold: number): number {
    if(text.length * size < threshold) // speedup
        return 0;
    return _ctx.measureText(text).width / 20 * size;
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

function dispval(d: DanmuObjectRepresentative) {
    return Math.sqrt(d.pakku.disp_str.length) * Math.pow(Math.min(d.fontsize/25, 2.5), 1.5);
}

let _last_config: null | LocalizedConfig = null;
let make_mark: (text: string, cnt: int) => string;

function build_text(c: DanmuCluster, rep_dm: DanmuObjectRepresentative): void {
    let cnt = c.peers.length;
    let dumped = null;
    if(rep_dm.mode===7)
        try {
            dumped = JSON.parse(rep_dm.content);
        } catch(e) {}

    if(dumped) {
        dumped[4] = make_mark(dumped[4], cnt);
        rep_dm.pakku.disp_str = dumped[4];
        rep_dm.content = JSON.stringify(dumped);
    } else {
        rep_dm.content = rep_dm.pakku.disp_str = make_mark(rep_dm.content, cnt);
    }
}

export function post_combine(input: DanmuClusterOutput, prev_input: DanmuClusterOutput, input_chunk: DanmuChunk<DanmuObject>, config: LocalizedConfig, stats: Stats): DanmuChunk<DanmuObjectRepresentative> {
    if(input_chunk.objs.length===0) // empty chunk
        return {objs: [], extra: {}};

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

    stats.num_onscreen_danmu += out_danmus.length;

    // final adjustments

    if(config.SHRINK)
        out_danmus.sort((a, b) => a.time_ms - b.time_ms);

    let onscreen_l = 0, onscreen_r = 0, onscreen_dispval = 0;
    for(let dm of out_danmus) {
        if(config.SHRINK) {
            while(onscreen_r<out_danmus.length && out_danmus[onscreen_r].time_ms - dm.time_ms < SHRINK_TIME_THRESHOLD) {
                let dmr = out_danmus[onscreen_r];
                onscreen_dispval += dispval(dmr);
                onscreen_r++;
            }
            while(dm.time_ms - out_danmus[onscreen_l].time_ms > SHRINK_TIME_THRESHOLD) {
                onscreen_dispval -= dispval(out_danmus[onscreen_l]);
                onscreen_l++;
            }
            stats.num_max_dispval = Math.max(stats.num_max_dispval, onscreen_dispval);

            if(onscreen_dispval > DISPVAL_THRESHOLD) {
                let shrink_rate = Math.min(Math.sqrt(onscreen_dispval)/DISPVAL_BASE, 1.75);
                dm.fontsize /= shrink_rate;
                dm.pakku.desc.push(`已缩小 ${shrink_rate.toFixed(2)} 倍：弹幕密度为 ${onscreen_dispval.toFixed(1)}`);
                stats.modified_shrink++;
            }
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

        stats.num_max_combo = Math.max(stats.num_max_combo, dm.pakku.peers.length);
    }

    return {
        objs: out_danmus,
        extra: input_chunk ? input_chunk.extra : {},
    };
}