import {DanmuChunk, DanmuObject, int, MissingData} from "../core/types";

export interface DebugContentIngress {
    type: 'debug_content';
    content: string;
}

export interface DebugEgress {
    type: 'debug';
    wait_finished: boolean;
    show_peers: boolean;
}

const REMOVE_COMMENTS_RE = /^\s*\/\/.*$/gm;
const REMOVE_LAST_COMMA_RE = /,\s*]\s*$/g;

function get_objects(content: string): DanmuObject[] {
    content = content.replace(REMOVE_COMMENTS_RE, '').replace(REMOVE_LAST_COMMA_RE, ']');
    let obj = JSON.parse(content);

    if(!Array.isArray(obj))
        throw new Error('pakku ingress debug: content is not an array');

    for(let o of obj) {
        if(typeof o !== 'object')
            throw new Error('pakku ingress debug: array item is not object');
        if(!o.extra)
            throw new Error('pakku ingress debug: array item is not danmu object');
    }

    return obj;
}

export async function ingress_debug_content(ingress: DebugContentIngress, chunk_callback: (idx: int, chunk: DanmuChunk<DanmuObject>)=>Promise<void>): Promise<void> {
    let chunk = {objs: get_objects(ingress.content), extra: {}};
    await chunk_callback(1, chunk);
}

export function egress_debug(egress: DebugEgress, num_chunks: int, chunks: Map<int, DanmuChunk<DanmuObject>>): string | typeof MissingData {
    if(egress.wait_finished && (!num_chunks || num_chunks!==chunks.size))
        return MissingData; // not finished

    let ret = [];
    ret.push(`// num_chunks: ${chunks.size} / ${num_chunks}`);
    ret.push('[');

    let sorted_chunk_keys = Array.from(chunks.keys()).sort((a, b) => a - b);
    for(let chunk_idx of sorted_chunk_keys) {
        let chunk = chunks.get(chunk_idx)!;

        ret.push(`// chunk ${chunk_idx}: ${JSON.stringify(chunk.extra)}`);
        for(let obj of chunk.objs) {
            let o: any = obj;
            if(!egress.show_peers && (obj as any).pakku) {
                o = {...obj, pakku: {...(obj as any).pakku, peers: null}};
            }
            ret.push(`  ${JSON.stringify(o)} ,`);
        }
    }
    ret.push(']');

    return ret.join('\n');
}