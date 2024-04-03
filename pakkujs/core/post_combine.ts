import {DanmuChunk, DanmuClusterOutput, Stats} from "./types";

export function post_combine(cluster: DanmuClusterOutput, prev_cluster: DanmuClusterOutput, stats: Stats): DanmuChunk {
    return {
        objs: cluster.clusters.map(c=>c.peers[0]),
        extra: {},
    };
}