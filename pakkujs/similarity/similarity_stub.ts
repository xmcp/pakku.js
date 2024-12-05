// @ts-ignore
import generated_promise from './similarity-gen.js';
import {int, LocalizedConfig, Stats} from "../core/types";

let module: any = null;
let ptr_buf: number;

const MAX_STRING_LEN = 16005;

export async function init(wasm_module: ArrayBuffer) {
    module = await generated_promise({wasm: wasm_module});
    ptr_buf = module._malloc(MAX_STRING_LEN*2 + 7);
    if(ptr_buf%2) // align to ushort
        ptr_buf++;
}

export function begin_chunk(config: LocalizedConfig) {
    try {
        module._begin_chunk(
            ptr_buf,
            config.MAX_DIST,
            config.MAX_COSINE,
            config.TRIM_PINYIN,
            config.CROSS_MODE,
        );
    } catch(e) {
        throw new Error(`wasm error (begin_chunk):\n${e}`);
    }
}

export function begin_index_lock() {
    try {
        module._begin_index_lock();
    } catch(e) {
        throw new Error(`wasm error (begin_index_lock):\n${e}`);
    }
}

enum CombinedReason {
    combined_identical = 0,
    combined_edit_distance = 1,
    combined_pinyin_distance = 2,
    combined_cosine_distance = 3,
}

export function detect_similarity(str: string, mode: number, index_l: int, S: Stats): null | {reason: string, idx_diff: int} {
    try {
        module.stringToUTF16(str, ptr_buf, MAX_STRING_LEN*2);
    } catch(e) {
        throw new Error(`wasm error (write str buf): ${str}\n${e}`);
    }

    let ret: number;
    try {
        ret = module._check_similar(mode, index_l);
    } catch(e) {
        throw new Error(`wasm error (similar): ${str}\n${e}`);
    }

    if(ret===0) // fast path for CombinedReason.not_combined
        return null;

    ret = ret >>> 0; // to unsigned
    let reason: CombinedReason = ret >>> 30;
    let dist = (ret >>> 19) & ((1<<11)-1);
    let idx_diff = ret & ((1<<19)-1);

    let reason_str;
    if(reason===CombinedReason.combined_identical) {
        S.combined_identical++;
        reason_str = '==';
    } else if(reason===CombinedReason.combined_edit_distance) {
        S.combined_edit_distance++;
        reason_str = '≤' + dist;
    } else if(reason===CombinedReason.combined_cosine_distance) {
        S.combined_cosine_distance++;
        reason_str = dist + '%';
    } else if(reason===CombinedReason.combined_pinyin_distance) {
        S.combined_pinyin_distance++;
        reason_str = 'P≤' + dist;
    } else {
        throw new Error('similarity wasm returned unknown reason: ' + ret);
    }

    return {reason: reason_str, idx_diff: idx_diff};
}