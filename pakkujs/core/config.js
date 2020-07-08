// 2017-2020 @xmcp. THIS PROJECT IS LICENSED UNDER GPL VERSION 3. SEE `LICENSE.txt`.

function fromholyjson_orempry(str) {
    try {
        return fromholyjson(str);
    } catch(e) {
        setbadge('RE!',ERROR_COLOR,null);
        chrome.browserAction.setTitle({
            title: '规则错误，请重置pakku设置后重启浏览器：'+e.message
        });
        console.error(e);
        return [];
    }
}

function loadconfig() {
    // NEW_OPTION_INSERTION_POINT

    window._ADVANCED_USER=localStorage['_ADVANCED_USER']==='on';
    // 弹幕合并
    window.THRESHOLD=parseInt(localStorage['THRESHOLD']||20);
    window.MAX_DIST=parseInt(localStorage['MAX_DIST']||5);
    window.MAX_COSINE=parseInt(localStorage['MAX_COSINE'])||60;
    window.TRIM_PINYIN=localStorage['TRIM_PINYIN']==='on';
    window.TRIM_ENDING=localStorage['TRIM_ENDING']==='on';
    window.TRIM_SPACE=localStorage['TRIM_SPACE']==='on';
    window.TRIM_WIDTH=localStorage['TRIM_WIDTH']==='on';
    // 例外设置
    window.FORCELIST=fromholyjson_orempry(localStorage['FORCELIST']||'[]');
    window.WHITELIST=fromholyjson_orempry(localStorage['WHITELIST']||'[]');
    window.CROSS_MODE=localStorage['CROSS_MODE']==='on';
    window.PROC_TYPE7=localStorage['PROC_TYPE7']==='on';
    window.PROC_TYPE4=localStorage['PROC_TYPE4']==='on';
    window.PROC_POOL1=localStorage['PROC_POOL1']==='on';
    // 显示设置
    window.DANMU_MARK=localStorage['DANMU_MARK'];
    window.MARK_THRESHOLD=parseInt(localStorage['MARK_THRESHOLD']||1);
    window.DANMU_SUBSCRIPT=localStorage['DANMU_SUBSCRIPT']==='on';
    window.ENLARGE=localStorage['ENLARGE']==='on';
    window.SHRINK=localStorage['SHRINK']==='on';
    window.MODE_ELEVATION=localStorage['MODE_ELEVATION']==='on';
    window.REPRESENTATIVE_PERCENT=parseInt(localStorage['REPRESENTATIVE_PERCENT']||0);
    // 播放器增强
    window.TOOLTIP=localStorage['TOOLTIP']==='on';
    window.AUTO_DISABLE_DANMU=localStorage['AUTO_DISABLE_DANMU']==='on';
    window.AUTO_DANMU_LIST=localStorage['AUTO_DANMU_LIST']==='on';
    window.FLUCTLIGHT=localStorage['FLUCTLIGHT']==='on';
    // 实验室
    window.REMOVE_SEEK=localStorage['REMOVE_SEEK']==='on';
    window.BREAK_UPDATE=localStorage['BREAK_UPDATE']==='on';
    window.BLACKLIST=fromholyjson_orempry(localStorage['BLACKLIST']||'[]');
    window.HIDE_THRESHOLD=parseInt(localStorage['HIDE_THRESHOLD']||0);
    window.SCROLL_THRESHOLD=parseInt(localStorage['SCROLL_THRESHOLD']||1200);
    // 其他
    window.POPUP_BADGE=localStorage['POPUP_BADGE'];
    window.CLOUD_SYNC=localStorage['CLOUD_SYNC']==='on';
    
    load_update_breaker();
    sync_cloud_config();
}

function initconfig() {
    // NEW_OPTION_INSERTION_POINT
    
    localStorage['_ADVANCED_USER']=localStorage['_ADVANCED_USER']||'off';
    // 弹幕合并
    localStorage['THRESHOLD']=localStorage['THRESHOLD']||20;
    localStorage['MAX_DIST']=localStorage['MAX_DIST']||5;
    localStorage['MAX_COSINE']=localStorage['MAX_COSINE']||60;
    localStorage['TRIM_PINYIN']=localStorage['TRIM_PINYIN']||'on';
    localStorage['TRIM_ENDING']=localStorage['TRIM_ENDING']||'on';
    localStorage['TRIM_SPACE']=localStorage['TRIM_SPACE']||'on';
    localStorage['TRIM_WIDTH']=localStorage['TRIM_WIDTH']||'on';
    // 例外设置
    localStorage['FORCELIST']=localStorage['FORCELIST']||'[["^23{2,}$","233..."],["^6{3,}$","666..."],["^[fF]+$","FFF..."],["^[hH]+$","hhh..."],["^[yYoO0][yYoO0\\\\s~]+$","yoo..."]]';
    localStorage['WHITELIST']=localStorage['WHITELIST']||'[]';
    localStorage['CROSS_MODE']=localStorage['CROSS_MODE']||'on';
    localStorage['PROC_TYPE7']=localStorage['PROC_TYPE7']||'on';
    localStorage['PROC_TYPE4']=localStorage['PROC_TYPE4']||'on';
    localStorage['PROC_POOL1']=localStorage['PROC_POOL1']||'off';
    // 显示设置
    localStorage['DANMU_MARK']=localStorage['DANMU_MARK']||'prefix';
    localStorage['MARK_THRESHOLD']=localStorage['MARK_THRESHOLD']||1;
    localStorage['DANMU_SUBSCRIPT']=localStorage['DANMU_SUBSCRIPT']||'on';
    localStorage['ENLARGE']=localStorage['ENLARGE']||'on';
    localStorage['SHRINK']=localStorage['SHRINK']||'off';
    localStorage['MODE_ELEVATION']=localStorage['MODE_ELEVATION']||'on';
    localStorage['REPRESENTATIVE_PERCENT']=localStorage['REPRESENTATIVE_PERCENT']||0;
    // 播放器增强
    localStorage['TOOLTIP']=localStorage['TOOLTIP']||'on';
    localStorage['AUTO_DISABLE_DANMU']=localStorage['AUTO_DISABLE_DANMU']||'off';
    localStorage['AUTO_DANMU_LIST']=localStorage['AUTO_DANMU_LIST']||'off';
    localStorage['FLUCTLIGHT']=localStorage['FLUCTLIGHT']||'off';
    // 实验室
    localStorage['REMOVE_SEEK']=localStorage['REMOVE_SEEK']||'off';
    localStorage['BREAK_UPDATE']=localStorage['BREAK_UPDATE']||'off';
    localStorage['BLACKLIST']=localStorage['BLACKLIST']||'[]';
    localStorage['HIDE_THRESHOLD']=localStorage['HIDE_THRESHOLD']||0;
    localStorage['SCROLL_THRESHOLD']=localStorage['SCROLL_THRESHOLD']||1200;
    // 其他
    localStorage['POPUP_BADGE']=localStorage['POPUP_BADGE']||'percent';
    localStorage['CLOUD_SYNC']=localStorage['CLOUD_SYNC']||'off';
    loadconfig();
}

function sync_cloud_config() {
    chrome.storage.sync.get(null, function(cloudConfig) {
        if(chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            return;
        }

        var cloudUpdateTime=parseInt(cloudConfig['_LAST_UPDATE_TIME']||-1);
        var lastUpdateTime=parseInt(localStorage['_LAST_UPDATE_TIME']||0);
        localStorage['_LAST_UPDATE_TIME']=lastUpdateTime;

        console.log('sync config: local '+lastUpdateTime+' cloud '+cloudUpdateTime);
        if (cloudUpdateTime>lastUpdateTime) { // restore
            if (!CLOUD_SYNC && lastUpdateTime>0) {
                console.log('sync config: skipped');
                return;
            }

            console.log('sync config: override LOCAL config');
            
            // backup local config
            (function(timestamp,str) {
                chrome.storage.local.get(['dropped_config'], function(res) {
                    var dropped=res['dropped_config'];
                    if(!dropped || !dropped.length) dropped=[];
                    else if(dropped.length>20) dropped.splice(0,1);
                    dropped.push([timestamp,str]);
                    chrome.storage.local.set({dropped_config: dropped});
                });
            })(+new Date(),JSON.stringify(localStorage));
            
            NOT_OVERRIDABLE_CONFIGS.forEach(function(x) {
                delete cloudConfig[x];
            });

            Object.assign(localStorage,cloudConfig);
            loadconfig();
            chrome.runtime.sendMessage({type:'options_page_reload'});
            if(lastUpdateTime>0)
                chrome.notifications.create('//cloud-sync', {
                    type: 'basic',
                    iconUrl: chrome.runtime.getURL('assets/logo.png'),
                    title: '设置已更新',
                    message: '您开启了“设置云同步”，已用云端的最新设置更新本地设置。',
                    contextMessage: '（在选项页面可以“抢救本地设置”）'
                });
        } else if(cloudUpdateTime<lastUpdateTime) { // save
            console.log('sync config: override CLOUD config');
            chrome.storage.sync.set(Object.assign({},localStorage));
        }
    });
}

chrome.storage.onChanged.addListener(function(_changes,area) {
    if(area=='sync') {
        console.log('sync config: storage onChanged');
        sync_cloud_config();
    }
})