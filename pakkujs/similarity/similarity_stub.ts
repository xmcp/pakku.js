// @ts-ignore
import generated_promise from './similarity-gen.js';
import {LocalizedConfig, Stats} from "../core/types";

let module: any = null;
let ptr_buf: number;

const MAX_STRING_LEN = 32768;

export async function init(wasm_module: ArrayBuffer) {
    module = await generated_promise({wasm: wasm_module});
    ptr_buf = module._malloc(MAX_STRING_LEN*2 + 7);
    if(ptr_buf%2) // align to ushort
        ptr_buf++;
}

export function begin_chunk(config: LocalizedConfig) {
    try {
        module._begin_chunk(
            config.MAX_DIST,
            config.MAX_COSINE,
            config.TRIM_PINYIN,
        );
    } catch(e) {
        console.error('wasm error (begin_chunk):', e);
        throw e;
    }
}

enum CombinedReason {
    not_combined = 0,
    combined_identical = 1,
    combined_edit_distance = 2,
    combined_pinyin_distance = 3,
    combined_cosine_distance = 4,
}

export function add_cacheline(str: string): number {
    try {
        let len = module.stringToUTF16(str, ptr_buf, MAX_STRING_LEN*2) >> 1;
        return module._add_cacheline(ptr_buf, len);
    } catch(e) {
        console.error('wasm error (add_cacheline):', str, e);
        throw e;
    }
}

export function similar(id_p: number, id_q: number, S: Stats) {
    let ret;
    try {
        ret = module._similar(id_p, id_q);
    } catch(e) {
        console.error('wasm error (similar):', id_p, id_q, e);
        throw e;
    }

    if(ret===0) // fast path for CombinedReason.not_combined
        return null;

    let reason: CombinedReason = ret >> 24;
    if(reason===CombinedReason.combined_identical) {
        S.combined_identical++;
        return '==';
    }

    let dist = ret & ((1<<24)-1);
    if(reason===CombinedReason.combined_edit_distance) {
        S.combined_edit_distance++;
        return '≤' + dist;
    } else if(reason===CombinedReason.combined_cosine_distance) {
        S.combined_cosine_distance++;
        return dist + '%';
    } else if(reason===CombinedReason.combined_pinyin_distance) {
        S.combined_pinyin_distance++;
        return 'P≤' + dist;
    } else {
        throw new Error('similarity wasm returned unknown reason: ' + ret);
    }
}