import {DanmuChunk} from "../core/types";

export interface DebugEgress {
    type: 'debug';
}

export function egress_debug(egress: DebugEgress, chunks: DanmuChunk[]): string {
    return JSON.stringify(chunks);
}