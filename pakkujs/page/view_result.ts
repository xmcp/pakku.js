import {Egress} from "../protocol/interface";
import {AnyObject} from "../core/types";
import {ingress_debug_content} from "../protocol/interface_debug";

let tabid = parseInt(new URLSearchParams(location.search).get('tabid') || '0');
let $content = document.querySelector('#content') as HTMLElement;
let $ingress = document.querySelector('#ingress') as HTMLElement;
let $download = document.querySelector('#download') as HTMLElement;

let options: {[k: string]: string} = {};
for(let input of document.querySelectorAll('input[type=radio]:checked') as NodeListOf<HTMLInputElement>) {
    options[input.name] = input.value;
}

function download(filename: string, text: string) {
    let a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text], {type: 'application/octet-stream; charset=utf-8'}));
    a.download = filename;
    a.click();
}

async function process() {
    $ingress.textContent = 'loading...';
    $content.textContent = 'loading...';

    let egress: Egress = (
        options.egress==='xml' ?
            {type: 'xml'} :
        options.egress==='debug' ?
            {type: 'debug', show_peers: false, wait_finished: false} :
            {type: 'debug', show_peers: true, wait_finished: false}
    );

    let dumped_result: AnyObject;
    try {
        dumped_result = await chrome.tabs.sendMessage(tabid, {
            type: 'dump_result',
            egress: egress,
            switch: options.step==='output',
        });
    } catch(e: any) {
        $ingress.textContent = 'error!';
        $content.textContent = e.message;
        throw e;
    }

    if(typeof dumped_result.error === 'string') {
        $ingress.textContent = 'error!';
        $content.textContent = dumped_result.error;
        return;
    }

    $ingress.textContent = JSON.stringify(dumped_result.ingress);
    $content.textContent = dumped_result.text;

    $download.onclick = ()=>{
        let ext = options.egress==='xml' ? 'xml' : 'js';
        let cid = (dumped_result as any).ingress.cid || 'content';
        download(`${cid}.${ext}`, dumped_result.text);
    };

    if(egress.type==='debug') {
        void ingress_debug_content({
            type: 'debug_content',
            content: dumped_result.text,
        }, async (idx, chunk)=>{
            console.log('danmu object dumped to `D` global variable:', chunk.objs.length);
            (window as any).D = chunk.objs;
        });
    }
}

void process();
for(let input of document.querySelectorAll('input[type=radio]') as NodeListOf<HTMLInputElement>) {
    input.addEventListener('change', (e)=>{
        let target = e.target as HTMLInputElement;
        options[target.name] = target.value;
        void process();
    });
}