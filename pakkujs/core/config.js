// (C) 2018 @xmcp. THIS PROJECT IS LICENSED UNDER GPL VERSION 3. SEE `LICENSE.txt`.

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
    window._ADVANCED_USER=localStorage['_ADVANCED_USER']==='on';
    // 弹幕合并
    window.THRESHOLD=parseInt(localStorage['THRESHOLD']||20);
    window.MAX_DIST=parseInt(localStorage['MAX_DIST']||5);
    window.MAX_COSINE=parseInt(localStorage['MAX_COSINE'])||60;
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
    // 播放器增强
    window.TOOLTIP=localStorage['TOOLTIP']==='on';
    window.AUTO_PREVENT_SHADE=localStorage['AUTO_PREVENT_SHADE']==='on';
    window.AUTO_DISABLE_DANMU=localStorage['AUTO_DISABLE_DANMU']==='on';
    window.FLUCTLIGHT=localStorage['FLUCTLIGHT']==='on';
    window.FOOLBAR=localStorage['FOOLBAR']==='on';
    // 实验室
    window.REMOVE_SEEK=localStorage['REMOVE_SEEK']==='on';
    window.BREAK_UPDATE=localStorage['BREAK_UPDATE']==='on';
    window.BLACKLIST=fromholyjson_orempry(localStorage['BLACKLIST'])||[];
    window.HIDE_THRESHOLD=parseInt(localStorage['HIDE_THRESHOLD']||0);
    window.SCROLL_THRESHOLD=parseInt(localStorage['SCROLL_THRESHOLD']||900);
    // 其他
    window.POPUP_BADGE=localStorage['POPUP_BADGE'];
    window.FLASH_NOTIF=localStorage['FLASH_NOTIF']==='on';
    
    load_update_breaker();
    backup_settings_if_needed();
}

function initconfig() {
    if(restore_settings_if_needed()) return;

    localStorage['_ADVANCED_USER']=localStorage['_ADVANCED_USER']||'off';
    // 弹幕合并
    localStorage['THRESHOLD']=localStorage['THRESHOLD']||20;
    localStorage['MAX_DIST']=localStorage['MAX_DIST']||5;
    localStorage['MAX_COSINE']=localStorage['MAX_COSINE']||60;
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
    // 播放器增强
    localStorage['TOOLTIP']=localStorage['TOOLTIP']||'on';
    localStorage['AUTO_PREVENT_SHADE']=localStorage['AUTO_PREVENT_SHADE']||'off';
    localStorage['AUTO_DISABLE_DANMU']=localStorage['AUTO_DISABLE_DANMU']||'off';
    localStorage['FLUCTLIGHT']=localStorage['FLUCTLIGHT']||'off';
    localStorage['FOOLBAR']=localStorage['FOOLBAR']||'off';
    // 实验室
    localStorage['REMOVE_SEEK']=localStorage['REMOVE_SEEK']||'off';
    localStorage['BREAK_UPDATE']=localStorage['BREAK_UPDATE']||'off';
    localStorage['BLACKLIST']=localStorage['BLACKLIST']||'[]';
    localStorage['HIDE_THRESHOLD']=localStorage['HIDE_THRESHOLD']||0;
    localStorage['SCROLL_THRESHOLD']=localStorage['SCROLL_THRESHOLD']||900;
    // 其他
    localStorage['POPUP_BADGE']=localStorage['POPUP_BADGE']||'percent';
    localStorage['FLASH_NOTIF']=localStorage['FLASH_NOTIF']||'on';
    loadconfig();
}
