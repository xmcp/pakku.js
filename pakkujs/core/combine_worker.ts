import {DanmuChunk, DanmuClusterOutput, DanmuObject, DanmuObjectPeer, int, LocalizedConfig, Stats} from "./types";
import {init as sim_init, begin_chunk, begin_index_lock, detect_similarity} from "../similarity/similarity_stub";
import {Queue} from "./queue";

interface DanmuIr {
    obj: DanmuObjectPeer;
    str: string; // for similarity algorithm
}

const ENDING_CHARS = new Set('.。,，/?？!！…~～@^、+=-_♂♀ ');
const TRIM_EXTRA_SPACE_RE = /[ 　]+/g;
const TRIM_CJK_SPACE_RE = /([\u3000-\u9FFF\uFF00-\uFFEF]) (?=[\u3000-\u9FFF\uFF00-\uFFEF])/g;
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
            text = text.replace(TRIM_EXTRA_SPACE_RE,' ').replace(TRIM_CJK_SPACE_RE, '$1');
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

    if(WHITELIST.length===0)
        return () => false;

    return (text: string) => WHITELIST.some(re => re.test(text));
}

function blacklisted_meta(config: LocalizedConfig): (text: string)=>(string | null) {
    const BLACKLIST = config.BLACKLIST.map(x => x[0] ? new RegExp(x[1]) : x[1].toLowerCase());

    if(BLACKLIST.length===0)
        return () => null;

    return (text: string) => {
        let lower = text.toLowerCase();
        for(let pattern of BLACKLIST) {
            let matched = (typeof pattern === 'string') ? lower.includes(pattern) : pattern.test(text);
            if(matched) {
                return (typeof pattern === 'string') ? ` ${pattern}` : ` /${pattern.source}/`;
            }
        }
        return null;
    }
}

function extract_special_danmu(text: string): string {
    try {
        text = JSON.parse(text)[4];
    } catch(e) {}
    return text;
}

function trim_dispstr(text: string): string {
    return text.replace(/([\r\n\t])/g,'').trim();
}

function select_median_length(strs: string[]): string {
    if(strs.length===1)
        return strs[0];

    let sorted = strs.sort((a, b) => a.length - b.length);
    let mid = Math.floor(sorted.length / 2);
    return sorted[mid];
}

async function prepare_combine(wasm_mod: ArrayBuffer) {
    await sim_init(wasm_mod);
}

async function do_combine(chunk: DanmuChunk<DanmuObject>, next_chunk: DanmuChunk<DanmuObject>, config: LocalizedConfig): Promise<DanmuClusterOutput> {
    begin_chunk(config);

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
                chosen_str: irs[0].obj.content, // do not use detaolued str for single danmu
            });
        } else {
            let text_cnts = new Map(), most_texts: string[] = [], most_cnt = 0;

            for(let ir of irs) {
                let text = ir.str;
                let cnt = 1 + (text_cnts.get(text) || 0);
                text_cnts.set(text, cnt);

                if(cnt > most_cnt) {
                    most_texts = [text];
                    most_cnt = cnt;
                } else if(cnt === most_cnt) {
                    most_texts.push(text);
                }
            }

            let most_text = select_median_length(most_texts);

            ret.clusters.push({
                peers: irs.map(ir => ir.obj),
                desc: most_cnt>1 ? [`采用了出现 ${most_cnt} 次的文本`] : [],
                chosen_str: most_text,
            });
        }
    }

    let detaolu = detaolu_meta(config);
    let whitelisted = whitelisted_meta(config);
    let blacklisted = blacklisted_meta(config);

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

                let disp_str = trim_dispstr((obj.mode===7 && obj.content[0]==='[') ? extract_special_danmu(obj.content) : obj.content);

                if(obj.mode!==8 && obj.mode!==9) {
                    let matched = blacklisted(disp_str);
                    if(matched) {
                        if(s) {
                            s.deleted_blacklist++;
                            s.deleted_blacklist_each[matched] = (s.deleted_blacklist_each[matched] || 0) + 1;
                        }
                        return null;
                    }
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
                };
            })
            .filter(obj => obj!==null) as DanmuIr[];
    }

    let danmus = obj_to_ir(chunk.objs, ret.stats);
    let next_chunk_danmus = obj_to_ir(next_chunk.objs, null);

    let nearby_danmus: Queue<DanmuIr[]> = new Queue();

    const THRESHOLD_MS = config.THRESHOLD * 1000;

    for(let dm of danmus) {
        while(true) {
            let peeked = nearby_danmus.peek();
            if(peeked===null || dm.obj.time_ms - peeked[0].obj.time_ms <= THRESHOLD_MS)
                break;
            apply_cluster(peeked);
            nearby_danmus.pop();
        }

        let sim = detect_similarity(dm.str, dm.obj.mode, nearby_danmus.index_l, ret.stats);
        if(sim!==null) {
            let candidate = nearby_danmus.storage[nearby_danmus.index_r - sim.idx_diff];
            dm.obj.pakku.sim_reason = sim.reason;
            candidate.push(dm);
        } else {
            nearby_danmus.push([dm]);
        }
    }

    // now process last few clusters with the next chunk
    begin_index_lock();
    outer:
    for(let dm of next_chunk_danmus) {
        while(true) {
            let peeked = nearby_danmus.peek();
            if(peeked===null)
                break outer;
            if(dm.obj.time_ms - peeked[0].obj.time_ms <= THRESHOLD_MS)
                break;
            apply_cluster(peeked);
            nearby_danmus.pop();
        }

        let sim = detect_similarity(dm.str, dm.obj.mode, nearby_danmus.index_l, ret.stats);
        if(sim!==null) {
            let candidate = nearby_danmus.storage[nearby_danmus.index_r - sim.idx_diff];
            dm.obj.pakku.sim_reason = sim.reason;
            candidate.push(dm);
        }
    }

    // finally apply remaining clusters
    for(let candidate of nearby_danmus) {
        apply_cluster(candidate);
    }

    return ret;
}

export { do_combine, prepare_combine };