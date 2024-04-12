import {Config} from "../background/config";
import {save_state} from "../background/state";

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

    extra: {
        // for protobuf ingress
        proto_attr?: int | null;
        proto_action?: string | null;
        proto_animation?: string | null;
        proto_colorful?: int | null;
        proto_oid?: int | null;
    };
}

export interface DanmuObjectPeer extends DanmuObject {
    pakku: {
        sim_reason: string;
    };
}

export interface DanmuObjectRepresentative extends DanmuObject {
    pakku: {
        peers: DanmuObjectPeer[];
        desc: string[];
        disp_str: string;
    };
}

export interface DanmuChunk<ObjectType extends DanmuObject> {
    objs: ObjectType[];

    extra: {
        // for protobuf ingress
        proto_segidx?: int;
        proto_colorfulsrc?: AnyObject[];

        // for xml ingress
        xml_maxlimit?: string;
        xml_chatid?: string;
    };
}

export interface DanmuCluster {
    peers: DanmuObjectPeer[];
    desc: string[];
    chosen_str: string;
}

export interface DanmuClusterOutput {
    clusters: DanmuCluster[];
    stats: Stats;
}

export class MessageStats {
    type: 'error'|'message';
    badge: string;
    message: string;

    constructor(type: 'error'|'message', badge: string, message: string) {
        this.type = type;
        this.badge = badge;
        this.message = message;
    }

    notify(tabid: int) {
        save_state({['STATS_'+tabid]: this})
            .then(()=>{
                const BGCOLORS = {error: '#ff4444', message: '#4444ff'};
                void chrome.runtime.sendMessage({
                    type: 'update_badge',
                    tabid: tabid,
                    text: this.badge,
                    bgcolor: BGCOLORS[this.type],
                });
            });
        return this;
    }
}

export class Stats {
    type: 'done' = 'done';
    download_time_ms = 0;
    parse_time_ms = 0;

    combined_identical= 0;
    combined_edit_distance= 0;
    combined_pinyin_distance= 0;
    combined_cosine_distance= 0;

    deleted_dispval = 0;
    deleted_blacklist= 0;
    deleted_blacklist_each: {[k: string]: int} = {};

    ignored_whitelist= 0;
    ignored_script= 0;
    ignored_type= 0;

    modified_enlarge= 0;
    modified_shrink= 0;
    modified_scroll= 0;

    num_taolu_matched= 0;
    num_total_danmu= 0;
    num_onscreen_danmu= 0;
    num_max_combo= 0;
    num_max_dispval = 0;

    notify(tabid: int, config: Config) {
        save_state({['STATS_'+tabid]: this})
            .then(()=>{
                let text = (
                    config.POPUP_BADGE==='count' ? ''+(this.num_total_danmu - this.num_onscreen_danmu) :
                    config.POPUP_BADGE==='percent' ? `${this.num_total_danmu ? Math.max(0, 100 - 100 * this.num_onscreen_danmu / this.num_total_danmu).toFixed(0) : 0}%` :
                    /* off */ null
                );
                void chrome.runtime.sendMessage({
                    type: 'update_badge',
                    tabid: tabid,
                    text: text,
                    bgcolor: '#008800',
                });
            });
        return this;
    }

    update_from(x: Stats) {
        for(let k of [
            'combined_identical',
            'combined_edit_distance',
            'combined_pinyin_distance',
            'combined_cosine_distance',
            'deleted_dispval',
            'deleted_blacklist',
            'ignored_whitelist',
            'ignored_type',
            'ignored_script',
            'modified_enlarge',
            'modified_shrink',
            'modified_scroll',
            'num_taolu_matched',
        ]) {
            // @ts-ignore
            this[k] += x[k];
        }

        for(let k of [
            'num_max_combo',
            'num_max_dispval',
        ]) {
            // @ts-ignore
            this[k] = Math.max(this[k], x[k]);
        }

        for(let [k, v] of Object.entries(x.deleted_blacklist_each)) {
            this.deleted_blacklist_each[k] = (this.deleted_blacklist_each[k] || 0) + v;
        }
    }
}

export type BlacklistItem = [boolean, string];  // is_regexp, pattern

export interface LocalizedConfig extends Config {
    BLACKLIST: BlacklistItem[];
    GLOBAL_SWITCH: boolean;
    SKIP_INJECT: boolean;
}

export type AjaxResponse = null | {
    data: string | Uint8Array | {[k: int]: int}; // uint8arr object representation {0: ord, 1: ord, ...}
}