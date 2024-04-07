import {DanmuChunk, DanmuClusterOutput, DanmuObject, DanmuObjectPeer, int, LocalizedConfig, Stats} from "./types";
import {PINYIN_DICT_RAW} from "./pinyin_dict";
import {gen_2gram_array, similar_meta} from "./similarity";

interface DanmuIr {
    obj: DanmuObjectPeer;

    // for similarity algorithms
    str: string;
    str_pinyin: string | null;
    str_2gram: number[] | null;
}

const ENDING_CHARS = new Set('.。,，/?？!！…~～@^、+=-_♂♀ ');
const TRIM_SPACE_RE = /[ 　]+/g;
const WIDTH_TABLE = new Map(Object.entries({
    "　":" ","１":"1","２":"2","３":"3","４":"4","５":"5","６":"6","７":"7","８":"8","９":"9","０":"0",
    "!":"！","＠":"@","＃":"#","＄":"$","％":"%","＾":"^","＆":"&","＊":"*","（":"(","）":")","－":"-","＝":"=","＿":"_","＋":"+",
    "［":"[","］":"]","｛":"{","｝":"}",";":"；","＇":"\'",":":"：","＂":"\"",",":"，","．":".","／":"/","＜":"<","＞":">",
    "?":"？","＼":"\\","｜":"|","｀":"`","～":"~",
    "ｑ":"q","ｗ":"w","ｅ":"e","ｒ":"r","ｔ":"t","ｙ":"y","ｕ":"u","ｉ":"i","ｏ":"o","ｐ":"p",
    "ａ":"a","ｓ":"s","ｄ":"d","ｆ":"f","ｇ":"g","ｈ":"h","ｊ":"j","ｋ":"k","ｌ":"l",
    "ｚ":"z","ｘ":"x","ｃ":"c","ｖ":"v","ｂ":"b","ｎ":"n","ｍ":"m",
    "Ｑ":"Q","Ｗ":"W","Ｅ":"E","Ｒ":"R","Ｔ":"T","Ｙ":"Y","Ｕ":"U","Ｉ":"I","Ｏ":"O","Ｐ":"P",
    "Ａ":"A","Ｓ":"S","Ｄ":"D","Ｆ":"F","Ｇ":"G","Ｈ":"H","Ｊ":"J","Ｋ":"K","Ｌ":"L",
    "Ｚ":"Z","Ｘ":"X","Ｃ":"C","Ｖ":"V","Ｂ":"B","Ｎ":"N","Ｍ":"M"
}));
const PINYIN_TABLE = (()=>{
    let ret = new Map();
    let symbols = new Map(); // 'a': '\ue000'
    let symbol_idx = 0xe000; // U+E000 ~ U+F8FF: Private Use Area

    for(let phonetic_raw in PINYIN_DICT_RAW) {
        let phonetics = phonetic_raw.split('_').map(function(phonetic) {
            let got = symbols.get(phonetic);
            if(got) {
                return got;
            } else {
                let n = String.fromCharCode(symbol_idx++);
                symbols.set(phonetic, n);
                return n;
            }
        }).join('');

        for(let c of PINYIN_DICT_RAW[phonetic_raw]) {
            ret.set(c, phonetics);
        }
    }

    return ret;
})();

function detaolu_meta(config: LocalizedConfig): (text: string)=>[boolean, string] {
    const TRIM_ENDING = config.TRIM_ENDING;
    const TRIM_SPACE = config.TRIM_SPACE;
    const TRIM_WIDTH = config.TRIM_WIDTH;
    const FORCELIST = config.FORCELIST.map(([pattern, repl]) => [new RegExp(pattern, 'ig'), repl] as [RegExp, string]);

    return (inp: string) => {
        let len = inp.length;
        let text = '';

        if(TRIM_ENDING) {
            while(ENDING_CHARS.has(inp.charAt(len-1))) // assert str.charAt(-1)===''
                len--;
            if(len===0) // all chars are ending chars, do nothing
                len = inp.length;
        }

        if(TRIM_WIDTH) {
            for(let i = 0; i<len; i++) {
                let c = inp.charAt(i);
                text += WIDTH_TABLE.get(c) || c;
            }
        } else {
            text = inp.slice(0, len);
        }

        if(TRIM_SPACE) {
            text = text.replace(TRIM_SPACE_RE,' ');
        }

        for(let taolu of FORCELIST) {
            if(taolu[0].test(text)) {
                text = text.replace(taolu[0], taolu[1]);
                return [true, text];
            }
        }

        return [false, text];
    };
}

function whitelisted_meta(config: LocalizedConfig): (text: string)=>boolean {
    const WHITELIST = config.WHITELIST.map(x => new RegExp(x[0], 'i'));
    return (text: string) => WHITELIST.some(re => re.test(text));
}

function blacklisted_meta(config: LocalizedConfig): (text: string)=>boolean {
    const BLACKLIST = config.BLACKLIST.map(x => x[0] ? new RegExp(x[1], 'i') : x[1]);
    return (text: string) => BLACKLIST.some(pattern => (typeof pattern === 'string') ? text.includes(pattern) : pattern.test(text));
}

function extract_special_danmu(text: string): string {
    try {
        text = JSON.parse(text)[4];
    } catch(e) {}
    return text;
}

function trim_pinyin(text: string): string {
    return Array.from(text.toLowerCase()).map(c => PINYIN_TABLE.get(c) || c).join('');
}

function trim_dispstr(text: string): string {
    return text.replace(/([\r\n\t])/g,'').trim();
}

let _fn_initialized = false;
let detaolu: (text: string) => [boolean, string];
let whitelisted: (text: string) => boolean;
let blacklisted: (text: string) => boolean;
let similar: (P: string, Q: string, Pgram: (int[] | null), Qgram: (int[] | null), Ppinyin: (string | null), Qpinyin: (string | null), S: Stats) => (string | null);

function do_combine(chunk: DanmuChunk<DanmuObject>, next_chunk: DanmuChunk<DanmuObject>, config: LocalizedConfig): DanmuClusterOutput {
    let ret: DanmuClusterOutput = {
        clusters: [],
        stats: new Stats(),
    };

    function apply_single_cluster(obj: DanmuObject, desc: string) {
        ret.clusters.push({
            peers: [{
                ...obj,
                pakku: {
                    sim_reason: 'IGN',
                },
            }],
            desc: [desc],
            chosen_str: obj.content,
        });
    }
    function apply_cluster(irs: DanmuIr[]) {
        if(irs.length===1) {
            ret.clusters.push({
                peers: [irs[0].obj],
                desc: [],
                chosen_str: irs[0].str,
            });
        } else {
            let text_cnts = new Map(), most_text = irs[0].str, most_cnt = 1;
            for(let ir of irs) {
                let text = ir.str;
                let cnt = 1 + (text_cnts.get(text) || 0);
                text_cnts.set(text, cnt);

                if(cnt > most_cnt) {
                    most_text = text;
                    most_cnt = cnt;
                }
            }

            ret.clusters.push({
                peers: irs.map(ir => ir.obj),
                desc: most_cnt>1 ? [`采用了出现 ${most_cnt} 次的文本`] : [],
                chosen_str: most_text,
            });
        }
    }

    // since config will not change, we only declare these functions once to make jit happy
    if(!_fn_initialized) {
        _fn_initialized = true;

        detaolu = detaolu_meta(config);
        whitelisted = whitelisted_meta(config);
        blacklisted = blacklisted_meta(config);
        similar = similar_meta(config);
    }

    function obj_to_ir(objs: DanmuObject[], s: Stats | null): DanmuIr[] {
        return objs
            .map(obj => {
                if(!config.PROC_POOL1 && obj.pool===1) {
                    if(s) {
                        s.ignored_type++;
                        apply_single_cluster(obj, '已忽略字幕弹幕，可以在选项中修改');
                    }
                    return null;
                }
                if(!config.PROC_TYPE7 && obj.mode===7) {
                    if(s) {
                        s.ignored_type++;
                        apply_single_cluster(obj, '已忽略特殊弹幕，可以在选项中修改');
                    }
                    return null;
                }
                if(!config.PROC_TYPE4 && obj.mode===4) {
                    if(s) {
                        s.ignored_type++;
                        apply_single_cluster(obj, '已忽略底部弹幕，可以在选项中修改');
                    }
                    return null;
                }
                if(obj.mode===8) {
                    if(s) {
                        s.ignored_script++;
                        apply_single_cluster(obj, '代码弹幕');
                    }
                    return null;
                }
                if(obj.mode===9) {
                    if(s) {
                        s.ignored_script++;
                        apply_single_cluster(obj, 'BAS弹幕');
                    }
                    return null;
                }

                let disp_str = trim_dispstr(obj.mode===7 ? extract_special_danmu(obj.content) : obj.content);

                if(obj.mode!==8 && obj.mode!==9 && blacklisted(disp_str)) {
                    if(s) s.deleted_blacklist++;
                    return null;
                }
                if(whitelisted(disp_str)) {
                    if(s) {
                        s.ignored_whitelist++;
                        apply_single_cluster(obj, '命中白名单');
                    }
                    return null;
                }

                let [matched_taolu, detaolued] = detaolu(disp_str);

                if(matched_taolu && s) {
                    s.num_taolu_matched++;
                }

                return {
                    obj: {
                        ...obj,
                        pakku: {
                            sim_reason: 'ORIG',
                        },
                    },
                    str: detaolued,
                    str_pinyin: config.TRIM_PINYIN ? trim_pinyin(detaolued) : null,
                    str_2gram: config.MAX_COSINE<100 ? gen_2gram_array(detaolued) : null,
                };
            })
            .filter(obj => obj!==null) as DanmuIr[];
    }

    let danmus = obj_to_ir(chunk.objs, ret.stats);
    let next_chunk_danmus = obj_to_ir(next_chunk.objs, null);

    let nearby_danmus: DanmuIr[][] = [];

    const THRESHOLD_MS =config.THRESHOLD * 1000;
    const CROSS_MODE =config.CROSS_MODE;

    for(let dm of danmus) {
        while(nearby_danmus.length && dm.obj.time_ms - nearby_danmus[0][0].obj.time_ms > THRESHOLD_MS)
            apply_cluster(nearby_danmus.shift()!);

        let sim = null;
        for(let candidate of nearby_danmus) {
            let dm0 = candidate[0];
            if(!CROSS_MODE && dm0.obj.mode!==dm.obj.mode)
                continue;

            sim = similar(dm.str, dm0.str, dm.str_2gram, dm0.str_2gram, dm.str_pinyin, dm0.str_pinyin, ret.stats);
            if(sim!==null) {
                dm.obj.pakku.sim_reason = sim;
                candidate.push(dm);
                break;
            }
        }

        if(!sim) { // not combined yet, add itself to candidates
            nearby_danmus.push([dm]);
        }
    }

    // now process last few clusters with the next chunk
    for(let dm of next_chunk_danmus) {
        while(nearby_danmus.length && dm.obj.time_ms - nearby_danmus[0][0].obj.time_ms > THRESHOLD_MS)
            apply_cluster(nearby_danmus.shift()!);

        let sim = null;
        for(let candidate of nearby_danmus) {
            let dm0 = candidate[0];
            if(!CROSS_MODE && dm0.obj.mode!==dm.obj.mode)
                continue;

            sim = similar(dm.str, dm0.str, dm.str_2gram, dm0.str_2gram, dm.str_pinyin, dm0.str_pinyin, ret.stats);
            if(sim!==null) {
                dm.obj.pakku.sim_reason = sim;
                candidate.push(dm);
                break;
            }
        }
    }

    // finally apply remaining clusters
    for(let candidate of nearby_danmus) {
        apply_cluster(candidate);
    }

    return ret;
}

export { do_combine };