function gen_timestamp() {
    var x=new Date();
    return x.getYear()+'/'+x.getMonth()+'/'+x.getDate();
}

if(document.head) {
    chrome.runtime.sendMessage({type: 'need_ajax_hook'},function(resp) {
        if(!resp) return;
        
        console.log('pakku ajax: injecting hook');
        
        // https://stackoverflow.com/questions/38132246/firefox-addon-send-message-from-webpage-to-background-script
        window.addEventListener('message',function(event) {
            if (event.source!=window)
                return;
            if (event.data.type && event.data.type=='pakku_ajax_request')
                chrome.runtime.sendMessage({type: 'ajax_hook', url: event.data.arg},function(resp) {
                    window.postMessage({
                        type: 'pakku_ajax_response',
                        arg: event.data.arg,
                        resp: resp
                    },'*');
                });
        },false);

        var sc=document.createElement('script');
        sc.src=chrome.runtime.getURL('core/content_script.js');
        document.head.appendChild(sc);
    });
    
    if(localStorage['_pakku_stats_time']!==gen_timestamp()) {
        console.log('pakku stat: inject statistics script for firefox');
        var f=document.createElement('script');
        f.src='https://s4.cnzz.com/stat.php?id=1261438614&web_id=1261438614';
        document.head.appendChild(f);
        localStorage['_pakku_stats_time']=gen_timestamp();

        chrome.runtime.sendMessage({type: 'reportness'}, function(ness) {
            if(ness) {
                var r=document.createElement('iframe');
                r.src=ness;
                r.style.display='none';
                document.head.appendChild(r);
            }
        });
    }
}