if(document.head) {
    console.log('pakku ajax: injecting hook');
    
    // https://stackoverflow.com/questions/38132246/firefox-addon-send-message-from-webpage-to-background-script
    window.addEventListener('message',function(event) {
        if (event.source!=window)
            return;
        if (event.data.type && event.data.type=='pakku_ajax_request')
            chrome.runtime.sendMessage({url: event.data.arg},function(resp) {
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
}