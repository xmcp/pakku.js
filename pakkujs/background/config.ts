import {AnyObject} from "../core/types";

export const DEFAULT_CONFIG = {
    _LAST_UPDATE_TIME: 0,
    _CONFIG_VER: 1,

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
    SHRINK: false,
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

        config.ADVANCED_USER = remote_config._ADVANCED_USER==='on';
        config.THRESHOLD = parseInt(remote_config.THRESHOLD);
        config.MAX_DIST = parseInt(remote_config.MAX_DIST);
        config.MAX_COSINE = parseInt(remote_config.MAX_COSINE);
        config.TRIM_PINYIN = remote_config.TRIM_PINYIN==='on';
        config.TRIM_ENDING = remote_config.TRIM_ENDING==='on';
        config.TRIM_SPACE = remote_config.TRIM_SPACE==='on';
        config.TRIM_WIDTH = remote_config.TRIM_WIDTH==='on';
        config.FORCELIST = try_json(remote_config.FORCELIST, []);
        config.WHITELIST = try_json(remote_config.WHITELIST, []);
        config.CROSS_MODE = remote_config.CROSS_MODE==='on';
        config.PROC_TYPE7 = remote_config.PROC_TYPE7==='on';
        config.PROC_TYPE4 = remote_config.PROC_TYPE4==='on';
        config.PROC_POOL1 = remote_config.PROC_POOL1==='on';
        config.DANMU_MARK = remote_config.DANMU_MARK;
        config.MARK_THRESHOLD = parseInt(remote_config.MARK_THRESHOLD);
        config.DANMU_SUBSCRIPT = remote_config.DANMU_SUBSCRIPT==='on';
        config.ENLARGE = remote_config.ENLARGE==='on';
        config.SHRINK = remote_config.SHRINK==='on';
        config.MODE_ELEVATION = remote_config.MODE_ELEVATION==='on';
        config.REPRESENTATIVE_PERCENT = parseInt(remote_config.REPRESENTATIVE_PERCENT);
        config.TOOLTIP = remote_config.TOOLTIP==='on';
        config.TOOLTIP_KEYBINDING = remote_config.TOOLTIP_KEYBINDING==='on';
        config.AUTO_DISABLE_DANMU = remote_config.AUTO_DISABLE_DANMU==='on';
        config.AUTO_DANMU_LIST = remote_config.AUTO_DANMU_LIST==='on';
        config.FLUCTLIGHT = remote_config.FLUCTLIGHT==='on';
        config.BREAK_UPDATE = remote_config.BREAK_UPDATE==='on';
        config.SCROLL_THRESHOLD = parseInt(remote_config.SCROLL_THRESHOLD);
        config.USERSCRIPT = DEFAULT_CONFIG.USERSCRIPT;
        config.POPUP_BADGE = remote_config.POPUP_BADGE;
        config.COMBINE_THREADS = DEFAULT_CONFIG.COMBINE_THREADS;
    }

    return config;
}

export async function save_config<SomeConfig extends Partial<Config>>(config: SomeConfig) {
    config._LAST_UPDATE_TIME = +new Date();
    await chrome.storage.sync.set(config);
}

export async function get_config(): Promise<Config> {
    let remote = await chrome.storage.sync.get();
    return migrate_config(remote);
}

export function hotfix_on_update(config: Config) {
    // 2024.3.1 may leave null in FORCELIST
    config.FORCELIST = config.FORCELIST.filter(x => x!==null);
}