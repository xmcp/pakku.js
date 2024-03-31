import {url_finder} from "../protocol/urls";
import {handle_task} from "../core/scheduler";
import {get_config} from "../background/config";

window.addEventListener('message',async function(event) {
    if (event.source!=window)
        return;
    if (event.data.type && event.data.type=='pakku_ajax_request') {
        console.log('pakku injected: got ajax request', event.data.url);
        let sendResponse = (resp: any) => {
            window.postMessage({
                type: 'pakku_ajax_response',
                url: event.data.url,
                resp: resp
            }, '*');
        };

        url_finder.protoapi_img_url = window.localStorage.getItem('wbi_img_url');
        url_finder.protoapi_sub_url = window.localStorage.getItem('wbi_sub_url');

        let url = url_finder.find(event.data.url);
        if(!url) {
            console.log('pakku injected: url not matched');
            sendResponse(null);
            return;
        }

        let config = await get_config();
        handle_task(url[0], url[1], sendResponse, config);
    }
},false);