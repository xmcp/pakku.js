// 2017-2020 @xmcp, @fanthos. THIS PROJECT IS LICENSED UNDER GPL VERSION 3. SEE `LICENSE.txt`.

(function() {
    var callbacks={};
    if(XMLHttpRequest.prototype.pakku_open) return;

    function uint8array_to_arraybuffer(array) {
        // https://stackoverflow.com/questions/37228285/uint8array-to-arraybuffer
        return array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset);
    }
    function str_to_arraybuffer(str) {
        // https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
        var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
        var bufView = new Uint16Array(buf);
        for (var i=0, strLen=str.length; i < strLen; i++) {
          bufView[i] = str.charCodeAt(i);
        }
        return buf;
    }
    function byte_object_to_arraybuffer(obj) {
        var ks=Object.keys(obj);
        var buf=new ArrayBuffer(ks.length);
        var bufView = new Uint8Array(buf);
        ks.forEach(function (i) {
            bufView[i] = obj[i];
        });
        return buf;
    }
    
    window.addEventListener('message',function(event) {
        if (event.source!=window)
            return;
        if (event.data.type && event.data.type=='pakku_ajax_response')
            callbacks[event.data.arg](event.data.resp);
    },false);
    function send_msg_proxy(arg,callback) {
        callbacks[arg]=callback;
        window.postMessage({
            type: 'pakku_ajax_request',
            arg: arg,
        }, '*');
    }

    window.Worker=null;
    console.warn('pakku: [to developers] Web Worker is disabled for compatibility reasons');
    
    XMLHttpRequest.prototype.pakku_open=XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open=function(method,url,async,user,password) {
        this.pakku_url=url;
        return this.pakku_open(method,url,async===undefined?true:async,user,password);
    };
    
    XMLHttpRequest.prototype.pakku_addEventListener=XMLHttpRequest.prototype.addEventListener;
    XMLHttpRequest.prototype.addEventListener=function(name,callback) {
        if(name=='load') {
            this.pakku_load_callback=this.pakku_load_callback||[];
            this.pakku_load_callback.push(callback);
        }
        return this.pakku_addEventListener(name,callback);
    }
    
    XMLHttpRequest.prototype.pakku_send=XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send=function(arg) {
        if(this.pakku_url.indexOf('.xml')==-1 && this.pakku_url.indexOf('/dm/')==-1)
            return this.pakku_send(arg);
        else {
            var link=document.createElement('a');
            link.href=this.pakku_url;
            this.pakku_url=link.href;
            
            var that=this;
            if(this.pakku_load_callback) {
                send_msg_proxy(that.pakku_url, function(resp) {
                    if(!resp || !resp.data)
                        return that.pakku_send(arg);
                    
                    Object.defineProperty(that,'response', {writable: true});
                    Object.defineProperty(that,'responseText', {writable: true});
                    Object.defineProperty(that,'readyState', {writable: true});
                    Object.defineProperty(that,'status', {writable: true});
                    Object.defineProperty(that,'statusText', {writable: true});
                
                    if(that.responseType=='arraybuffer') {
                        if(resp.data instanceof Uint8Array)
                            that.response=uint8array_to_arraybuffer(resp.data);
                        else if(resp.data instanceof Object) // uint8arr object representation {0: ord, 1: ord, ...}
                            that.response=byte_object_to_arraybuffer(resp.data);
                        else // maybe str
                            that.response=str_to_arraybuffer(resp.data);
                    } else {
                        that.response=that.responseText=resp.data;
                    }
                    that.readyState=4;
                    that.status=200;
                    that.statusText='Pakku OK';
                    
                    console.log('pakku ajax: got tampered response for',that.pakku_url,that.responseType);
                    that.abort();
                    for(var i=0;i<that.pakku_load_callback.length;i++)
                        that.pakku_load_callback[i].bind(that)();
                });
            } else {
                console.log('pakku ajax: ignoring request as no onload callback found',this.pakku_url);
                return that.pakku_send(arg);
            }
        }
    }
    
    console.log('pakku ajax: hook set');
})();