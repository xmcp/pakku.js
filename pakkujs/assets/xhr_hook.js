(function() {
    if(XMLHttpRequest.prototype.pakku_open) return;

    function uint8array_to_arraybuffer(array) {
        // https://stackoverflow.com/questions/37228285/uint8array-to-arraybuffer
        return array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset);
    }

    function str_to_arraybuffer(str) {
        // https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
        let buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
        let bufView = new Uint16Array(buf);
        for(let i = 0, strLen = str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return buf;
    }

    function byte_object_to_arraybuffer(obj) {
        let ks = Object.keys(obj);
        let buf = new ArrayBuffer(ks.length);
        let bufView = new Uint8Array(buf);
        ks.forEach(function(i) {
            bufView[i] = obj[i];
        });
        return buf;
    }

    function get_cur_cid() {
        try {
            return window.player.getManifest().cid;
        } catch(_) {
            return null;
        }
    }

    function is_bilibili(origin) {
        return origin.endsWith('.bilibili.com') || origin.endsWith('//bilibili.com');
    }

    let callbacks = {};
    window.addEventListener('message',function(event) {
        if(!is_bilibili(event.origin))
            return;
        if(event.data.type && event.data.type==='pakku_ajax_response') {
            let cbs = callbacks[event.data.url] || [];
            for(let cb of cbs)
                cb(event.data.resp);
            callbacks[event.data.url] = null;
        }
    },false);
    function send_msg_proxy(url, callback) {
        if(!callbacks[url])
            callbacks[url] = [callback];
        else
            callbacks[url].push(callback);

        window.top.postMessage({
            type: 'pakku_ajax_request',
            url: url,
        }, '*');
    }

    function proxied_send(xhr, send_arg) {
        send_msg_proxy(xhr.pakku_url, function(resp) {
            if(!resp || !resp.data) {
                xhr.pakku_send(send_arg);
                return;
            }

            Object.defineProperty(xhr, 'response', {writable: true});
            Object.defineProperty(xhr, 'responseURL', {writable: true});
            Object.defineProperty(xhr, 'responseText', {writable: true});
            Object.defineProperty(xhr, 'getAllResponseHeaders', {writable: true});
            Object.defineProperty(xhr, 'readyState', {writable: true});
            Object.defineProperty(xhr, 'status', {writable: true});
            Object.defineProperty(xhr, 'statusText', {writable: true});

            if(xhr.responseType === 'arraybuffer') {
                if(resp.data instanceof Uint8Array)
                    xhr.response = uint8array_to_arraybuffer(resp.data);
                else if(resp.data instanceof Object) // uint8arr object representation {0: ord, 1: ord, ...}
                    xhr.response = byte_object_to_arraybuffer(resp.data);
                else // maybe str
                    xhr.response = str_to_arraybuffer(resp.data);
            } else {
                xhr.response = xhr.responseText = resp.data;
            }
            xhr.getAllResponseHeaders = function() {
                return "X-Pakku: yay\r\n";
            };
            xhr.responseURL = xhr.pakku_url;
            xhr.readyState = 4;
            xhr.status = 200;
            xhr.statusText = 'OK';

            console.log('pakku ajax: got tampered response for', xhr.pakku_url, xhr.responseType);
            for(let i = 0; i < xhr.pakku_load_callback.length; i++)
                xhr.pakku_load_callback[i].bind(xhr)();
        });
    }

    XMLHttpRequest.prototype.pakku_open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
        this.pakku_url = url;
        return this.pakku_open(method, url, async === undefined ? true : async, user, password);
    };

    XMLHttpRequest.prototype.pakku_addEventListener = XMLHttpRequest.prototype.addEventListener;
    XMLHttpRequest.prototype.addEventListener = function(name, callback) {
        if(name === 'load' || name === 'readystatechange' || name === 'loadend') {
            this.pakku_load_callback = this.pakku_load_callback || [];
            this.pakku_load_callback.push(callback);
        }
        return this.pakku_addEventListener(name, callback);
    }

    XMLHttpRequest.prototype.pakku_send = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function(arg) {
        if(!this.pakku_url.includes('.xml') && !this.pakku_url.includes('/dm/'))
            return this.pakku_send(arg);

        if(window.location.pathname==='/' && !window.location.search.includes('=BV')) // we are on homepage, skip processing thumbnail danmus
            return this.pakku_send(arg);

        //let cur_cid = get_cur_cid();
        //if(cur_cid && this.pakku_url.indexOf('&oid=' + cur_cid + '&') === -1) {
        //    console.log('pakku ajax: ignoring request as current cid is', cur_cid, ':', this.pakku_url);
        //    return this.pakku_send(arg);
        //}

        let link = document.createElement('a');
        link.href = this.pakku_url;
        this.pakku_url = link.href;

        this.pakku_load_callback = this.pakku_load_callback || [];

        if(this.onreadystatechange)
            this.pakku_load_callback.push(this.onreadystatechange);
        if(this.onload)
            this.pakku_load_callback.push(this.onload);
        if(this.onloadend)
            this.pakku_load_callback.push(this.onloadend);

        if(this.pakku_load_callback.length > 0) {
            proxied_send(this, arg);
        } else {
            console.log('pakku ajax: ignoring request as no onload callback found', this.pakku_url);
            return this.pakku_send(arg);
        }
    }

    console.log('pakku ajax: hook set');
})();