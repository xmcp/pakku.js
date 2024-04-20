import {AnyObject} from "../core/types";

export const DEFAULT_CONFIG = {
    _LAST_UPDATE_TIME: 0,
    _CONFIG_VER: 2,

    ADVANCED_USER: false,

    // 弹幕合并
    THRESHOLD: 20,
    MAX_DIST: 5,
    MAX_COSINE: 45,
    TRIM_PINYIN: true,
    TRIM_ENDING: true,
    TRIM_SPACE: true,
    TRIM_WIDTH: true,

    // 例外设置
    FORCELIST: [["^23{2,}$", "23333"], ["^6{3,}$", "66666"]],
    WHITELIST: [] as ([string, string])[],
    CROSS_MODE: true,
    PROC_TYPE7: true,
    PROC_TYPE4: true,
    PROC_POOL1: false,

    // 显示设置
    DANMU_MARK: 'prefix' as ('prefix' | 'suffix' | 'off'),
    MARK_THRESHOLD: 1,
    DANMU_SUBSCRIPT: true,
    ENLARGE: true,
    SHRINK_THRESHOLD: 0,
    DROP_THRESHOLD: 0,
    MODE_ELEVATION: true,
    REPRESENTATIVE_PERCENT: 20,

    // 播放器增强
    TOOLTIP: true,
    TOOLTIP_KEYBINDING: true,
    AUTO_DISABLE_DANMU: false,
    AUTO_DANMU_LIST: false,
    FLUCTLIGHT: false,

    // 实验室
    BREAK_UPDATE: false,
    SCROLL_THRESHOLD: 1200, // 0 to disable
    USERSCRIPT: null as (string | null),

    // 其他
    POPUP_BADGE: 'percent' as ('percent' | 'count' | 'off'),
    COMBINE_THREADS: 3,
    READ_PLAYER_BLACKLIST: true,
}

export type Config = typeof DEFAULT_CONFIG;

function try_json(s: string, fallback: any): any {
    try {
        return JSON.parse(s);
    } catch(e) {
        return fallback;
    }
}

export function migrate_config(remote_config: AnyObject): Config {
    if(remote_config._CONFIG_VER === DEFAULT_CONFIG._CONFIG_VER)
        return remote_config as Config;

    let config = JSON.parse(JSON.stringify(remote_config));
    config._CONFIG_VER = config._CONFIG_VER || 0;

    if(!remote_config._LAST_UPDATE_TIME) { // no remote config, init a default one
        console.log('pakku config: init to default');
        config = DEFAULT_CONFIG;
    }

    // 0 -> 1
    if(config._CONFIG_VER < 1) {
        config._LAST_UPDATE_TIME = +new Date();
        config._CONFIG_VER = 1;

        config.ADVANCED_USER = config._ADVANCED_USER==='on';
        config.THRESHOLD = parseInt(config.THRESHOLD);
        config.MAX_DIST = parseInt(config.MAX_DIST);
        config.MAX_COSINE = parseInt(config.MAX_COSINE);
        config.TRIM_PINYIN = config.TRIM_PINYIN==='on';
        config.TRIM_ENDING = config.TRIM_ENDING==='on';
        config.TRIM_SPACE = config.TRIM_SPACE==='on';
        config.TRIM_WIDTH = config.TRIM_WIDTH==='on';
        config.FORCELIST = try_json(config.FORCELIST, []);
        config.WHITELIST = try_json(config.WHITELIST, []);
        config.CROSS_MODE = config.CROSS_MODE==='on';
        config.PROC_TYPE7 = config.PROC_TYPE7==='on';
        config.PROC_TYPE4 = config.PROC_TYPE4==='on';
        config.PROC_POOL1 = config.PROC_POOL1==='on';
        //config.DANMU_MARK = config.DANMU_MARK;
        config.MARK_THRESHOLD = parseInt(config.MARK_THRESHOLD);
        config.DANMU_SUBSCRIPT = config.DANMU_SUBSCRIPT==='on';
        config.ENLARGE = config.ENLARGE==='on';
        config.SHRINK = config.SHRINK==='on';
        config.MODE_ELEVATION = config.MODE_ELEVATION==='on';
        config.REPRESENTATIVE_PERCENT = parseInt(config.REPRESENTATIVE_PERCENT);
        config.TOOLTIP = config.TOOLTIP==='on';
        config.TOOLTIP_KEYBINDING = config.TOOLTIP_KEYBINDING==='on';
        config.AUTO_DISABLE_DANMU = config.AUTO_DISABLE_DANMU==='on';
        config.AUTO_DANMU_LIST = config.AUTO_DANMU_LIST==='on';
        config.FLUCTLIGHT = config.FLUCTLIGHT==='on';
        config.BREAK_UPDATE = config.BREAK_UPDATE==='on';
        config.SCROLL_THRESHOLD = parseInt(config.SCROLL_THRESHOLD);
        config.USERSCRIPT = DEFAULT_CONFIG.USERSCRIPT;
        //config.POPUP_BADGE = config.POPUP_BADGE;
        config.COMBINE_THREADS = DEFAULT_CONFIG.COMBINE_THREADS;

        delete config._ADVANCED_USER;
        delete config.HIDE_THRESHOLD;
        delete config.BLACKLIST;
        delete config.CLOUD_SYNC;
    }

    if(config._CONFIG_VER < 2) {
        config._LAST_UPDATE_TIME = +new Date();
        config._CONFIG_VER = 2;

        config.SHRINK_THRESHOLD = config.SHRINK ? 50 : 0;
        config.DROP_THRESHOLD = DEFAULT_CONFIG.DROP_THRESHOLD;
        config.READ_PLAYER_BLACKLIST = DEFAULT_CONFIG.READ_PLAYER_BLACKLIST;
    }

    return config;
}

export async function save_config<SomeConfig extends Partial<Config>>(config: SomeConfig) {
    config._LAST_UPDATE_TIME = +new Date();
    await chrome.storage.sync.set(config);
}

export function get_config(): Promise<Config> {
    return new Promise((resolve)=>{
        chrome.storage.sync.get((config: AnyObject)=>{
            resolve(migrate_config(config));
        });
    });
}

function _to_int(config: AnyObject, k: (keyof Config)) {
    let v = config[k];
    if(typeof v === 'string') {
        v = parseInt(v, 10);
        if(isNaN(v))
            config[k] = DEFAULT_CONFIG[k];
        else
            config[k] = v;
        console.log('pakku hotfix: convert', k, v, config[k]);
    }
}

export function hotfix_on_update(config: any) {
    // [2024.3.1, 2024.4.1): may leave null in FORCELIST
    config.FORCELIST = config.FORCELIST.filter((x: any) => x!==null);

    // [2024.3.1 - 2024.5.1): mv2 config keys not removed
    delete config._ADVANCED_USER;
    delete config.HIDE_THRESHOLD;
    delete config.BLACKLIST;
    delete config.CLOUD_SYNC;

    // [2024.3.1 - 2024.5.1): some options keys may be string or nan
    _to_int(config, 'MAX_COSINE');
    _to_int(config, 'SHRINK_THRESHOLD');
    _to_int(config, 'DROP_THRESHOLD');
    _to_int(config, 'REPRESENTATIVE_PERCENT');
}