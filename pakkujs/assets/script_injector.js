function gen_timestamp() {
    var x=new Date();
    return x.getYear()+'/'+x.getMonth()+'/'+x.getDate();
}

console.log('pakku ajax: injecting hook');

// https://stackoverflow.com/questions/38132246/firefox-addon-send-message-from-webpage-to-background-script
window.addEventListener('message',function(event) {
    if (event.source!=window)
        return;
    if (event.data.type && event.data.type=='pakku_ajax_request')
        chrome.runtime.sendMessage({
            type: 'ajax_hook',
            url: event.data.arg,
            wbi_img_url: window.localStorage.getItem('wbi_img_url', null),
            wbi_sub_url: window.localStorage.getItem('wbi_sub_url', null),
        },function(resp) {
            window.postMessage({
                type: 'pakku_ajax_response',
                arg: event.data.arg,
                resp: resp
            },'*');
        });
},false);

var sc=document.createElement('script');
sc.src=chrome.runtime.getURL('assets/xhr_hook.js');
document.documentElement.appendChild(sc);

// statistics
if(localStorage['_pakku_stats_time']!==gen_timestamp()) {
    console.log('pakku stat: inject statistics script');
    var elem=document.createElement('iframe');
    elem.src='https://s.xmcp.ltd/pakkujs/stat/bilibili.html';
    elem.style.display='none';
    document.documentElement.appendChild(elem);
    
    localStorage['_pakku_stats_time']=gen_timestamp();
}

/*
// font patch
// seems not necessary since 2022?
if(!localStorage['_pakku_font_patched'] && localStorage['bilibili_player_settings']) {
    // https://github.com/xmcp/pakku.js/issues/51
    console.log('pakku font patch: will perform');

    var conf=JSON.parse(localStorage['bilibili_player_settings']);
    var curr=conf.setting_config[(conf.setting_config.fontfamily=='custom')?'fontfamilycustom':'fontfamily'];

    if(curr.indexOf('Segoe UI Symbol,')!==0) {
        curr='Segoe UI Symbol, '+curr;
        conf.setting_config.fontfamily='custom';
        conf.setting_config.fontfamilycustom=curr;
        localStorage['bilibili_player_settings']=JSON.stringify(conf);
    }

    localStorage['_pakku_font_patched']='yes';
}
*/