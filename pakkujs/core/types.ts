export type int = number;
export type float = number;
export type AnyObject = {[k: string]: any};

export const MissingData = Symbol('missing data');

export interface DanmuObject {
    time_ms: int;
    mode: int;
    fontsize: float;
    color: int;
    sender_hash: string;
    content: string;
    sendtime: int;
    weight: int;
    id: string;
    pool: int;
    extra: AnyObject;
}

export interface DanmuChunk {
    objs: DanmuObject[];
    extra: AnyObject;
}

export interface DanmuClusterOutput {
    clusters: {
        peers: DanmuObject[];
        desc: string[];
    }[];
    stats: Stats;
}

export class Stats {
    error = null;

    combined_identical= 0
    combined_edit_distance= 0
    combined_pinyin_distance= 0
    combined_cosine_distance= 0

    deleted_blacklist= 0

    ignored_whitelist= 0
    ignored_type= 0
    ignored_script= 0

    modified_enlarge= 0
    modified_shrink= 0
    modified_scroll= 0

    num_taolu_matched= 0
    num_total_danmu= 0
    num_onscreen_danmu= 0
    num_max_combo= 0
    num_max_dispval = 0;
}