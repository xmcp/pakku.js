import {DanmuChunk, DanmuObject, int, MissingData} from "../core/types";

export interface DebugEgress {
    type: 'debug';
}

export function egress_debug(egress: DebugEgress, num_chunks: int, chunks: Map<int, DanmuChunk<DanmuObject>>): string | typeof MissingData {
    if(!num_chunks || num_chunks!==chunks.size)
        return MissingData; // not finished

    return JSON.stringify(chunks);
}