import {egress_xml} from '../protocol/interface_xml';
import {egress_debug} from '../protocol/interface_debug';

let tabid = parseInt(new URLSearchParams(location.search).get('tabid'));
let $content = document.querySelector('#content');
let $ingress = document.querySelector('#ingress');

let options = {};
for(let input of document.querySelectorAll('input[type=radio]:checked')) {
    options[input.name] = input.value;
}

let dumped_result;
async function process() {
    if(!dumped_result) {
        dumped_result = await chrome.tabs.sendMessage(tabid, {type: 'dump_result'});
        console.log(dumped_result);
    }

    if(dumped_result.error) {
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

    let egress_res = egress_fn(egress, dumped_result.num_chunks, chunks);
    if(typeof egress_res === 'symbol')
        egress_res = egress_res.description;
    $content.textContent = egress_res;
}

process();
for(let input of document.querySelectorAll('input[type=radio]')) {
    input.addEventListener('change', (e)=>{
        options[e.target.name] = e.target.value;
        void process();
    });
}