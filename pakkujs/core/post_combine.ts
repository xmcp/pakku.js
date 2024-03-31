import {DanmuChunk, DanmuClusterOutput} from "./types";

export function post_combine(cluster: DanmuClusterOutput, prev_cluster: DanmuClusterOutput): DanmuChunk {
    return {
        objs: cluster.clusters.map(c=>c.peers[0]),
        extra: {},
    };
}