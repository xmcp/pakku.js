import {DanmuChunk, DanmuObject, int, MissingData} from "../core/types";

export interface DebugEgress {
    type: 'debug';
    show_peers: boolean;
}

export function egress_debug(egress: DebugEgress, num_chunks: int, chunks: Map<int, DanmuChunk<DanmuObject>>): string | typeof MissingData {
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