import {DanmuChunk, DanmuObject, int, MissingData} from "../core/types";

export interface DebugContentIngress {
    type: 'debug_content';
    content: string;
}

export interface DebugEgress {
    type: 'debug';
    show_peers: boolean;
}

function get_objects(content: string): DanmuObject[] {
    let ret: DanmuObject[] = [];
    for(let line of content.split('\n')) {
        if(line.startsWith('  {') && line.endsWith(' ,')) {
            try {
                ret.push(JSON.parse(line.slice(2, -2)));
            } catch(e) {
                console.error('pakku ingress debug: failed to parse line', line);
            }
        } else {
            console.log('pakku ingress debug: ignored line', line);
        }
    }
    return ret;
}

export async function ingress_debug_content(ingress: DebugContentIngress, chunk_callback: (idx: int, chunk: DanmuChunk<DanmuObject>)=>Promise<void>): Promise<void> {
    let chunk = {objs: get_objects(ingress.content), extra: {}};
    await chunk_callback(1, chunk);
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