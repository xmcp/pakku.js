import {DanmuChunk, DanmuObject} from "./types";

interface DanmuIr {
    obj: DanmuObject;

    // for similarity algorithms
    str: string;
    str_pinyin: string;
    str_2gram: number[];
}

interface DanmuCluster {
    peers: DanmuIr[];
    desc: string[];

    self_dispval: number;
}

function pre_combine(chunk: DanmuChunk): DanmuIr[] {
    return chunk.objs.map(obj=>({
        obj: obj,
        str: obj.content,
        str_pinyin: '',
        str_2gram: [],
    }));
}

export function do_combine(danmus: DanmuIr[], next_danmus: DanmuIr[]): DanmuCluster[] {
    return danmus.map(danmu=>({
        peers: [danmu],
        desc: [],
        self_dispval: 0,
    }));
}

export function post_combine(clusters: DanmuCluster[], prev_clusters: DanmuCluster[]): DanmuChunk {
    return {
        objs: clusters.map(cluster=>cluster.peers[0].obj),
        extra: {},
    };
}