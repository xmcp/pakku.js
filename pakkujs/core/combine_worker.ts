import {DanmuChunk, DanmuClusterOutput, DanmuObject, Stats} from "./types";

export interface DanmuIr {
    obj: DanmuObject;

    // for similarity algorithms
    str: string;
    str_pinyin: string;
    str_2gram: number[];
}

function do_combine(chunk: DanmuChunk, next_chunk: DanmuChunk): DanmuClusterOutput {
    let stats = new Stats();
    let danmus = chunk.objs
        .map(obj => ({
            obj: obj,
            str: obj.content,
            str_pinyin: '',
            str_2gram: [],
        }));
    return {
        clusters: danmus.map(danmu => ({
            peers: [danmu.obj],
            desc: ['test'],
        })),
        stats: stats,
    };
}

onmessage = (e) => {
    console.log('worker: received job');
    try {
        let res = do_combine(e.data[0], e.data[1]);
        console.log('worker: job done');
        postMessage({error: null, output: res});
    } catch(err) {
        console.log('worker: job FAILED', err);
        postMessage({error: err});
    }
};