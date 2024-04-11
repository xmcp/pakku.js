import {egress_xml} from '../protocol/interface_xml';
import {egress_debug} from '../protocol/interface_debug';
import {DumpResult} from "../core/types";

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

let dumped_result: {error: string} | DumpResult;
async function process() {
    if(!dumped_result) {
        dumped_result = await chrome.tabs.sendMessage(tabid, {type: 'dump_result'});
        console.log(dumped_result);
    }

    if(typeof dumped_result.error === 'string') {
        $content.textContent = dumped_result.error;
        return;
    }

    let chunks = new Map(
        Object.entries(
            options.step==='input' ? dumped_result.chunks_in : dumped_result.chunks_out
        )
            .map(([k, v]) => [parseInt(k), v])
    );

    let egress_fn = options.egress==='xml' ? egress_xml : egress_debug;
    let egress = options.egress==='xml' ? {type: 'xml'} : options.egress==='debug' ? {type: 'debug', show_peers: false} : {type: 'debug', show_peers: true};

    $ingress.textContent = JSON.stringify(dumped_result.ingress);

    let egress_res = egress_fn(egress as any, dumped_result.num_chunks, chunks);
    // noinspection SuspiciousTypeOfGuard
    let egress_str = (typeof egress_res === 'symbol') ? (egress_res.description || '???') : egress_res;
    $content.textContent = egress_str;

    $download.onclick = ()=>{
        let ext = options.egress==='xml' ? 'xml' : 'js';
        let cid = (dumped_result as any).ingress.cid || 'content';
        download(`${cid}.${ext}`, egress_str);
    };
}

void process();
for(let input of document.querySelectorAll('input[type=radio]') as NodeListOf<HTMLInputElement>) {
    input.addEventListener('change', (e)=>{
        let target = e.target as HTMLInputElement;
        options[target.name] = target.value;
        void process();
    });
}