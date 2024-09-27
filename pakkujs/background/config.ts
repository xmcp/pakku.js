import {AnyObject} from "../core/types";
import {compress_all, decompress_all} from "./compressor";

export const DEFAULT_CONFIG = {
    _LAST_UPDATE_TIME: 0,
    _CONFIG_VER: 4,

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
    TAKEOVER_AIJUDGE: false,
    SCROLL_THRESHOLD: 1200, // 0 to disable
    USERSCRIPT: null as (string | null),

    // 其他
    POPUP_BADGE: 'percent' as ('percent' | 'count' | 'dispval' | 'off'),
    COMBINE_THREADS: 3,
    READ_PLAYER_BLACKLIST: true,
}

const UPDATE_TS_OFFSET = 1e13;
function gen_timestamp() {
    // add a huge offset to avoid the mv2 version overriding our config
    return UPDATE_TS_OFFSET + (+new Date());
}

export type Config = typeof DEFAULT_CONFIG;

function try_json(s: string, fallback: any): any {
    try {
        return JSON.parse(s);
    } catch(e) {
        return fallback;
    }
}

function safe_int(x: string, min: number | null, max: number | null, fallback: number) {
    let v = parseInt(x, 10);
    if(isNaN(v) || (min!==null && v<min) || (max!==null && v>max)) {
        console.log('safe int: invalid value', x, ', falling back to', fallback);
        return fallback;
    }
    else
        return v;
}

export function migrate_config(remote_config: AnyObject): Config {
    if(remote_config._CONFIG_VER === DEFAULT_CONFIG._CONFIG_VER) {
        // we can skip migration, but we still merge it to the default config to deal with possibly missing keys
        return {...DEFAULT_CONFIG, ...remote_config};
    }

    let config = JSON.parse(JSON.stringify(remote_config));
    config._CONFIG_VER = config._CONFIG_VER || 0;

    if(!remote_config._LAST_UPDATE_TIME) { // no remote config, init a default one
        console.log('pakku config: init to default');
        config = DEFAULT_CONFIG;
    }

    // 0 -> 1
    if(config._CONFIG_VER < 1) {
        config._LAST_UPDATE_TIME = gen_timestamp();
        config._CONFIG_VER = 1;

        config.ADVANCED_USER = config._ADVANCED_USER==='on';
        config.THRESHOLD = safe_int(config.THRESHOLD, -1, 180, DEFAULT_CONFIG.THRESHOLD);
        config.MAX_DIST = safe_int(config.MAX_DIST, 0, null, DEFAULT_CONFIG.MAX_DIST);
        config.MAX_COSINE = safe_int(config.MAX_COSINE, 0, null, DEFAULT_CONFIG.MAX_COSINE);
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
        config.MARK_THRESHOLD = safe_int(config.MARK_THRESHOLD, 1, null, DEFAULT_CONFIG.MARK_THRESHOLD);
        config.DANMU_SUBSCRIPT = config.DANMU_SUBSCRIPT==='on';
        config.ENLARGE = config.ENLARGE==='on';
        config.SHRINK = config.SHRINK==='on';
        config.MODE_ELEVATION = config.MODE_ELEVATION==='on';
        config.REPRESENTATIVE_PERCENT = safe_int(config.REPRESENTATIVE_PERCENT, 0, 100, DEFAULT_CONFIG.REPRESENTATIVE_PERCENT);
        config.TOOLTIP = config.TOOLTIP==='on';
        config.TOOLTIP_KEYBINDING = config.TOOLTIP_KEYBINDING==='on';
        config.AUTO_DISABLE_DANMU = config.AUTO_DISABLE_DANMU==='on';
        config.AUTO_DANMU_LIST = config.AUTO_DANMU_LIST==='on';
        config.FLUCTLIGHT = config.FLUCTLIGHT==='on';
        config.BREAK_UPDATE = config.BREAK_UPDATE==='on';
        config.SCROLL_THRESHOLD = safe_int(config.SCROLL_THRESHOLD, 0, null, DEFAULT_CONFIG.SCROLL_THRESHOLD);
        config.USERSCRIPT = DEFAULT_CONFIG.USERSCRIPT;
        //config.POPUP_BADGE = config.POPUP_BADGE;
        config.COMBINE_THREADS = DEFAULT_CONFIG.COMBINE_THREADS;

        delete config._ADVANCED_USER;
        delete config.HIDE_THRESHOLD;
        delete config.BLACKLIST;
        delete config.CLOUD_SYNC;
        delete config.FOOLBAR;
        delete config.FLASH_NOTIF;
        delete config.AUTO_PREVENT_SHADE;
        delete config.REMOVE_SEEK;
        delete config.TAOLUS;
    }

    // 1 -> 2
    if(config._CONFIG_VER < 2) {
        config._LAST_UPDATE_TIME = gen_timestamp();
        config._CONFIG_VER = 2;

        config.SHRINK_THRESHOLD = config.SHRINK ? 50 : 0;
        config.DROP_THRESHOLD = DEFAULT_CONFIG.DROP_THRESHOLD;
        config.READ_PLAYER_BLACKLIST = DEFAULT_CONFIG.READ_PLAYER_BLACKLIST;

        delete config.SHRINK;
    }

    // 2 -> 3
    /*
    if(config._CONFIG_VER < 3) {
        config._LAST_UPDATE_TIME = gen_timestamp();
        config._CONFIG_VER = 3;

        // no changes needed here.

        // v3 adds config compression.
        // bumped the version to make sure old clients won't override the config in new format.
    }
    */

    // 3 -> 4
    if(config._CONFIG_VER < 4) {
        config._LAST_UPDATE_TIME = gen_timestamp();
        config._CONFIG_VER = 4;

        config.TAKEOVER_AIJUDGE = false;
        // we also added the 'dispval' option for POPUP_BADGE, so we have to bump version number to inform old clients.
    }

    return {...DEFAULT_CONFIG, ...config};
}

export function fix_invalid_keys(config: AnyObject) { // may be due to invalid imported config
    for(let k_ in DEFAULT_CONFIG) {
        let k = k_ as keyof Config;

        if(
            !(k in config) ||
            (typeof config[k] === 'string' && DEFAULT_CONFIG[k]!==null && typeof DEFAULT_CONFIG[k] !== 'string')
        ) {
            console.log('pakku config: restored missing key to default:', k, config[k]);
            config[k] = DEFAULT_CONFIG[k];
        }
    }
}

export async function save_config<SomeConfig extends Partial<Config>>(config: SomeConfig): Promise<string|null> {
    if(config._CONFIG_VER!==undefined && config._CONFIG_VER > DEFAULT_CONFIG._CONFIG_VER) {
        console.error('pakku config: refuse to save config with version', config._CONFIG_VER, 'which is higher than', DEFAULT_CONFIG._CONFIG_VER);
        return '无法保存设置，因为云端设置版本高于本地。请尝试更新 pakku 或者重置所有设置。';
    }

    config._LAST_UPDATE_TIME = gen_timestamp();
    try {
        await chrome.storage.sync.set(await compress_all(config));
    } catch(e: any) {
        console.error(e);
        return '无法保存设置：' + (e.message || e);
    }
    return null;
}

export function get_config(): Promise<Config> {
    return new Promise((resolve, reject)=>{
        chrome.storage.sync.get((config: AnyObject)=>{
            if(chrome.runtime.lastError)
                reject(chrome.runtime.lastError);
            else {
                decompress_all(config)
                    .then(config=>{
                        resolve(migrate_config(config));
                    })
                    .catch(reject);
            }
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
        console.log('pakku config: hotfix convert', k, v, config[k]);
    }
}

export function hotfix_on_update(config: any) {
    // [2024.3.1 - 2024.4.1): may leave null in FORCELIST
    config.FORCELIST = config.FORCELIST.filter((x: any) => x!==null);

    // [2024.3.1 - 2024.5.1): some options keys may be string or nan
    _to_int(config, 'MAX_COSINE');
    _to_int(config, 'SHRINK_THRESHOLD');
    _to_int(config, 'DROP_THRESHOLD');
    _to_int(config, 'REPRESENTATIVE_PERCENT');

    // [2024.3.1 - 2024.6.1): old config keys not removed
    let old_keys = [
        '_ADVANCED_USER', 'HIDE_THRESHOLD', 'BLACKLIST', 'CLOUD_SYNC', 'FOOLBAR', 'FLASH_NOTIF', 'AUTO_PREVENT_SHADE', 'REMOVE_SEEK', 'TAOLUS', 'SHRINK',
    ].filter(k => k in config);
    for(let k of old_keys)
        delete config[k];
    void chrome.storage.sync.remove(old_keys);

    // [2024.3.1 - 2024.5.3): config may be broken by mv2 version
    fix_invalid_keys(config);
    if(config._LAST_UPDATE_TIME && config._LAST_UPDATE_TIME < UPDATE_TS_OFFSET) {
        config._LAST_UPDATE_TIME = gen_timestamp();
    }
}