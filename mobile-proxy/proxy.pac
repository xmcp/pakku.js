var settings=__SETTINGS__;

function FindProxyForURL(url, host){
    if(host=='api.bilibili.com')
        return 'PROXY '+settings.ip+':'+settings.http_port;
    else
        return 'DIRECT';
}        
