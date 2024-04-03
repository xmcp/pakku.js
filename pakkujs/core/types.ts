import {Config} from "../background/config";

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
        void chrome.storage.session.set({['STATS_'+tabid]: this});
        const BGCOLORS = {error: '#ff4444', message: '#4444ff'};
        void chrome.runtime.sendMessage({
            type: 'update_badge',
            tabid: tabid,
            text: this.badge,
            bgcolor: BGCOLORS[this.type],
        });
        return this;
    }
}

export class Stats {
    type = 'done';
    download_time_ms = 0;
    parse_time_ms = 0;

    combined_identical= 0;
    combined_edit_distance= 0;
    combined_pinyin_distance= 0;
    combined_cosine_distance= 0;

    deleted_blacklist= 0;

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
        void chrome.storage.session.set({['STATS_'+tabid]: this});
        let text = (
            config.POPUP_BADGE==='count' ? (this.num_total_danmu - this.num_onscreen_danmu) :
            config.POPUP_BADGE==='percent' ? `${Math.max(0, 100 - 100 * this.num_onscreen_danmu / this.num_total_danmu).toFixed(0)}%` :
            /* off */ ''
        );
        void chrome.runtime.sendMessage({
            type: 'update_badge',
            tabid: tabid,
            text: text,
            bgcolor: '#008800',
        });
        return this;
    }

    update_from(x: Stats) {
        for(let k of [
            'combined_identical',
            'combined_edit_distance',
            'combined_pinyin_distance',
            'combined_cosine_distance',
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
    }
}

export type BlacklistItem = [boolean, string];  // is_regexp, pattern

export interface LocalizedConfig extends Config {
    BLACKLIST: BlacklistItem[];
    GLOBAL_SWITCH: boolean;
}