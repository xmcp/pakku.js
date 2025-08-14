import {AjaxResponse} from "../core/types";

declare global {
    interface Window {
        player: {
            getManifest: ()=>{cid: number};
            seek: (time: number)=>void;
        };
    }
    interface XMLHttpRequest {
        pakku_url: string;
        pakku_load_callback: ((...args: any)=>any)[];
        pakku_open: typeof XMLHttpRequest.prototype.open;
        pakku_addEventListener: typeof XMLHttpRequest.prototype.addEventListener;
        pakku_send: typeof XMLHttpRequest.prototype.send;
    }
}

// https://stackoverflow.com/questions/42999983/typescript-removing-readonly-modifier
type Mutable<T> = {
    -readonly [K in keyof T]: T[K]
};
type MutableXMLHttpRequest = Mutable<XMLHttpRequest>;

(function() {
    // @ts-ignore
    if(XMLHttpRequest.prototype.pakku_open) return;

    function is_bilibili(origin: string) {
        return origin.endsWith('.bilibili.com') || origin.endsWith('//bilibili.com');
    }

    let worker_ready = true;
    try {
        window.top!.location.href;
    } catch(e) {
        console.log('pakku ajax: top frame cross domain, confirming worker');
        worker_ready = false;

        window.top!.postMessage({
            type: 'pakku_ping',
        }, '*');
        function top_waiter(event: MessageEvent) {
            if (!is_bilibili(event.origin))
                return;
            if (event.data.type && event.data.type === 'pakku_pong') {
                console.log('pakku ajax: confirmed worker available');
                worker_ready = true;
                window.removeEventListener('message', top_waiter);
            }
        }
        window.addEventListener('message', top_waiter);
    }

    function uint8array_to_arraybuffer(array: Uint8Array) {
        // https://stackoverflow.com/questions/37228285/uint8array-to-arraybuffer
        return array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset) as ArrayBuffer;
    }

    function str_to_arraybuffer(str: string) {
        // https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
        let buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
        let bufView = new Uint16Array(buf);
        for(let i = 0, strLen = str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return buf;
    }

    function byte_object_to_arraybuffer(obj: {[key: number]: number}) {
        let ks = Object.keys(obj);
        let buf = new ArrayBuffer(ks.length);
        let bufView = new Uint8Array(buf);
        for(let i of ks) {
            bufView[i as any] = obj[i as any];
        }
        return buf;
    }

    function arraybuffer_to_string(buf: ArrayBuffer) {
        let dec = new TextDecoder("utf-8");
        return dec.decode(new Uint8Array(buf));
    }

    function get_cur_cid() {
        try {
            return window.player.getManifest().cid;
        } catch(_) {
            return null;
        }
    }

    let callbacks: {[url: string]: ((resp: AjaxResponse)=>void)[]} = {};
    window.addEventListener('message',function(event) {
        if(!is_bilibili(event.origin))
            return;
        if(event.data.type && event.data.type==='pakku_ajax_response') {
            let cbs = callbacks[event.data.url] || [];
            for(let cb of cbs)
                cb(event.data.resp as AjaxResponse);
            delete callbacks[event.data.url];
        }
    },false);
    function send_msg_proxy(url: string, callback: (resp: AjaxResponse)=>void) {
        if(!worker_ready) {
            callback(null);
            return;
        }

        if(!callbacks[url])
            callbacks[url] = [callback];
        else
            callbacks[url].push(callback);

        window.top!.postMessage({
            type: 'pakku_ajax_request',
            url: url,
        }, '*');
    }

    function should_skip_url(url: string) {
        // obviously not danmu url
        if(!url.includes('.xml') && !url.includes('/dm/'))
            return true;

        // hovering on thumbnails on homepage
        if((window.location.hostname==='www.bilibili.com' || window.location.hostname==='bilibili.com') &&  window.location.pathname==='/' && !window.location.search.includes('=BV'))
            return true;

        // hovering on thumbnails on search result
        if(window.location.hostname==='search.bilibili.com')
            return true;

        // hovering on thumbnails on user homepage
        // currently they are using https://api.bilibili.com/x/v2/dm/ajax?aid=BVxxx but we just want to be future-proof
        if(window.location.hostname==='space.bilibili.com')
            return true;

        // hovering on other thumbnails on video page
        let cur_cid = get_cur_cid();
        let target_cid = parseInt(new URLSearchParams(url.split('?')[1] || '').get('oid') || '0');
        if(cur_cid && target_cid && cur_cid !== target_cid) {
            console.log('pakku ajax: ignoring request as current cid is', cur_cid, ':', url);
            return true;
        }

        return false;
    }

    function proxied_xhr_send(xhr_: XMLHttpRequest, send_arg: any) {
        let xhr = xhr_ as MutableXMLHttpRequest;
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

            let content_type = 'application/octet-stream';

            if(['arraybuffer', 'blob'].includes(xhr.responseType)) {
                if(resp.data instanceof Uint8Array) {
                    xhr.response = uint8array_to_arraybuffer(resp.data);
                } else if(typeof resp.data === 'object') {
                    xhr.response = byte_object_to_arraybuffer(resp.data);
                } else { // str
                    xhr.response = str_to_arraybuffer(resp.data);
                }

                if(xhr.responseType==='blob') {
                    xhr.response = new Blob([xhr.response], {type: content_type});
                }
            } else { // xhr.responseType === 'text' or ''
                if(resp.data instanceof Uint8Array) {
                    xhr.response = xhr.responseText = arraybuffer_to_string(uint8array_to_arraybuffer(resp.data));
                } else if(typeof resp.data === 'object') {
                    xhr.response = xhr.responseText = arraybuffer_to_string(byte_object_to_arraybuffer(resp.data));
                } else { // str
                    xhr.response = xhr.responseText = resp.data;
                }
            }

            // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
            xhr.readyState = 4;
            xhr.responseURL = xhr.pakku_url;
            xhr.status = 200;
            xhr.statusText = 'OK';
            xhr.getAllResponseHeaders = function() {
                return `Content-Type: ${content_type}\r\n`;
            };
            xhr.getResponseHeader = function(k) {
                if(k.toLowerCase()==='content-type')
                    return content_type;
                return null;
            };

            console.log('pakku ajax: got tampered xhr response for', xhr.pakku_url, xhr.responseType);
            for(let i = 0; i < xhr.pakku_load_callback.length; i++)
                xhr.pakku_load_callback[i].bind(xhr)({
                    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/load_event
                    lengthComputable: false,
                    loaded: 1,
                    total: 1,

                    // https://developer.mozilla.org/en-US/docs/Web/API/Event
                    bubbles: false,
                    cancelable: false,
                    composed: false,
                    currentTarget: xhr,
                    defaultPrevented: false,
                    eventPhase: 2,
                    isTrusted: true,
                    target: xhr,
                    timeStamp: 0,
                    type: 'load',
                });
        });
    }

    XMLHttpRequest.prototype.pakku_open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url, async?: boolean, user?: string|null, password?: string|null) {
        this.pakku_url = (typeof url === 'string') ? url : url.href;
        return this.pakku_open(method, url, async === undefined ? true : async, user, password);
    };

    XMLHttpRequest.prototype.pakku_addEventListener = XMLHttpRequest.prototype.addEventListener;
    XMLHttpRequest.prototype.addEventListener = function(name: string, callback: (...args: any)=>any, options?: any) {
        if(name === 'load' || name === 'readystatechange' || name === 'loadend') {
            this.pakku_load_callback = this.pakku_load_callback || [];
            this.pakku_load_callback.push(callback);
        }

        if(options===undefined)
            return this.pakku_addEventListener(name, callback);
        else
            return this.pakku_addEventListener(name, callback, options);
    }

    XMLHttpRequest.prototype.pakku_send = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function(arg) {
        if(should_skip_url(this.pakku_url))
            return this.pakku_send(arg);

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
            proxied_xhr_send(this, arg);
        } else {
            console.log('pakku ajax: ignoring xhr request as no onload callback found', this.pakku_url);
            return this.pakku_send(arg);
        }
    }

    function proxied_fetch(url: string, orig_req: URL|RequestInfo, orig_options: RequestInit): Promise<Response> {
        return new Promise((resolve, reject) => {
            send_msg_proxy(url, function(resp) {
                if(!resp || !resp.data) {
                    resolve(orig_fetch(orig_req, orig_options));
                    return;
                }

                console.log('pakku ajax: got tampered fetch response for', url);

                let resp_data;
                if(resp.data instanceof Uint8Array)
                    resp_data = uint8array_to_arraybuffer(resp.data);
                else if(typeof resp.data === 'object')
                    resp_data = byte_object_to_arraybuffer(resp.data);
                else // str
                    resp_data = resp.data;

                resolve(new Response(resp_data, {
                    headers: {
                        'X-Pakku': 'yay',
                    },
                }));
            });
        });
    }

    let orig_fetch = window.fetch;
    window.fetch = function fetch(req, options={}) {
        let url = (req instanceof Request) ? req.url : ''+req;
        if(should_skip_url(url))
            return orig_fetch(req, options);

        return proxied_fetch(url, req, options);
    }

    // callbacks from injected ui

    window.addEventListener('message',function(event) {
        if (!is_bilibili(event.origin))
            return;
        if (event.data.type && event.data.type === 'pakku_video_jump') {
            window.player?.seek(event.data.time);
        }
    });

    console.log('pakku ajax: hook set');
})();