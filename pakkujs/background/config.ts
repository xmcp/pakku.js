import {migrate_config} from "./config_migration";

export const DEFAULT_CONFIG = {
    _LAST_UPDATE_TIME: 0,
    _CONFIG_VER: 1,

    ADVANCED_USER: false,

    // 弹幕合并
    THRESHOLD: 20,
    MAX_DIST: 5,
    MAX_COSINE: 60,
    TRIM_PINYIN: true,
    TRIM_ENDING: true,
    TRIM_SPACE: true,
    TRIM_WIDTH: true,

    // 例外设置
    FORCELIST: [["^23{2,}$","23333"],["^6{3,}$","66666"]],
    WHITELIST: [],
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
    REPRESENTATIVE_PERCENT: 0,

    // 播放器增强
    TOOLTIP: true,
    TOOLTIP_KEYBINDING: true,
    AUTO_DISABLE_DANMU: false,
    AUTO_DANMU_LIST: false,
    FLUCTLIGHT: false,

    // 实验室
    BREAK_UPDATE: false,
    SCROLL_THRESHOLD: 1200, // 0 to disable

    // 其他
    POPUP_BADGE: 'percent' as ('percent' | 'count' | 'off'),
}

export type Config = typeof DEFAULT_CONFIG;

export async function save_config(config: Config) {
    config._LAST_UPDATE_TIME = +new Date();
    await chrome.storage.sync.set(config);
}

async function read_config(): Promise<Config> {
    let remote = await chrome.storage.sync.get();
    console.log('config: read remote', remote);

    return migrate_config(remote);
}

let _singleton_config: Config | null = null;

export async function get_config(): Promise<Config> {
    if(_singleton_config===null) {
        _singleton_config = await read_config();

        chrome.storage.onChanged.addListener(async (changes, areaName)=>{
            if(areaName==='sync') {
                console.log('config: changed', changes);
                _singleton_config = await read_config();
            }
        });
    }

    return _singleton_config;
}