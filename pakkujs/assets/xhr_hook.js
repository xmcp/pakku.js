// 2017-2022 @xmcp, @fanthos. THIS PROJECT IS LICENSED UNDER GPL VERSION 3. SEE `LICENSE.txt`.

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

    // bilibili no longer uses web worker to decode danmaku, good
    /*
    window.Worker=null;
    console.warn('pakku: [to developers] Web Worker is disabled for compatibility reasons');
    */

    function proxied_send(that, send_arg, done_callback) {
        send_msg_proxy(that.pakku_url, function(resp) {
            if(!resp || !resp.data) {
                that.pakku_send(send_arg);
                done_callback();
                return;
            }
            
            Object.defineProperty(that,'response', {writable: true});
            Object.defineProperty(that,'responseURL', {writable: true});
            Object.defineProperty(that,'responseText', {writable: true});
            Object.defineProperty(that,'getAllResponseHeaders', {writable: true});
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
            that.getAllResponseHeaders=function() {
                return "X-Pakku: yay\r\n";
            };
            that.responseURL=that.pakku_url;
            that.readyState=4;
            that.status=200;
            that.statusText='OK';
            
            console.log('pakku ajax: got tampered response for',that.pakku_url,that.responseType);
            for(var i=0;i<that.pakku_load_callback.length;i++)
                that.pakku_load_callback[i].bind(that)();
            
            done_callback();
        });
    }

    var send_queue={}; // mutex_key -> [(xhr, send_arg), ...]
    var send_worker_running={}; // mutex_key -> bool

    function send_worker(mutex_key) {
        send_worker_running[mutex_key]=true;

        if((send_queue[mutex_key]||[]).length>0) {
            var front=send_queue[mutex_key].shift();
            console.log('pakku ajax: worker send', mutex_key, front[0].pakku_url);
            proxied_send(front[0], front[1], function() {
                send_worker(mutex_key);
            });
        } else {
            console.log('pakku ajax: worker finished for', mutex_key);
            send_worker_running[mutex_key]=false;
        }

    }
    
    XMLHttpRequest.prototype.pakku_open=XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open=function(method,url,async,user,password) {
        this.pakku_url=url;
        return this.pakku_open(method,url,async===undefined?true:async,user,password);
    };
    
    XMLHttpRequest.prototype.pakku_addEventListener=XMLHttpRequest.prototype.addEventListener;
    XMLHttpRequest.prototype.addEventListener=function(name,callback) {
        if(name=='load' || name=='readystatechange') {
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

            var mutex_key=new URLSearchParams(link.search).get('oid')||'';

            this.pakku_load_callback=this.pakku_load_callback||[];
            if(this.onreadystatechange)
                this.pakku_load_callback.push(this.onreadystatechange);

            if(this.onload)
                this.pakku_load_callback.push(this.onload);
            
            if(this.pakku_load_callback.length>0) {
                if(!send_queue[mutex_key])
                    send_queue[mutex_key]=[];
                send_queue[mutex_key].push([this,arg]);
                if(!send_worker_running[mutex_key])
                    send_worker(mutex_key);
            } else {
                console.log('pakku ajax: ignoring request as no onload callback found',this.pakku_url);
                return this.pakku_send(arg);
            }
        }
    }
    
    console.log('pakku ajax: hook set');
})();