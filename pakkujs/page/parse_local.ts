import {Egress, Ingress} from "../protocol/interface";
import {AjaxResponse} from "../core/types";

let $sandbox = document.querySelector('#sandbox') as HTMLIFrameElement;
let $container = document.querySelector('#result-container') as HTMLElement;
let $download_btn = document.querySelector('#download-btn') as HTMLElement;
let $clear_btn = document.querySelector('#clear-btn') as HTMLElement;

function download(filename: string, text: string) {
    let a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text], {type: 'application/octet-stream; charset=utf-8'}));
    a.download = filename;
    a.click();
}

function parse_local(ingress: Ingress, egress: Egress): Promise<AjaxResponse> {
    return new Promise((resolve) => {
        window.onmessage = (e)=>{
            if(e.data.type==='pakku_process_local_result') {
                resolve(e.data.result);
            }
        };
        $sandbox.contentWindow!.postMessage({
            type: 'pakku_process_local_request',
            ingress: ingress,
            egress: egress,
        }, '*');
    });
}

let all_res: [string, string][] = [];

$download_btn.onclick = function() {
    for(let [filename, res] of all_res) {
        download(filename, res);
    }
};
$clear_btn.onclick = function() {
    for(let fin of $container.querySelectorAll('.finished')) {
        (fin as HTMLElement).parentElement!.removeChild(fin);
    }
    all_res = [];
};

function extract_data(res: AjaxResponse) {
    if(res===null) {
        console.log('extract data: res is null');
        return '';
    }
    else if(typeof res.data === 'string') {
        return res.data;
    }
    else {
        console.log('extract data: res is not string', res);
        return '';
    }
}

async function do_process(filename: string, ext: string, ingress: Ingress, egress: Egress) {
    let row = document.createElement('p');
    row.textContent = `${filename}：处理中…`;
    $container.appendChild(row);

    let res = extract_data(await parse_local(ingress, egress));

    all_res.push([`${filename}_pakku.${ext}`, res]);
    row.classList.add('finished');
    row.textContent = `${filename}：处理完成（${ingress.type} → ${egress.type} ${(res.length/1024).toFixed(0)} KB）`;
}

function read_file(file: File) {
    return new Promise((resolve, reject) => {
        let fr = new FileReader();
        fr.onload = function() {
            resolve(fr.result);
        };
        fr.readAsText(file, 'utf-8');
    });
}

let drag_count = 0;
document.addEventListener('dragenter', function() {
    drag_count++;
    document.body.classList.add('dragged');
});
document.addEventListener('dragleave', function() {
    if(--drag_count === 0)
        document.body.classList.remove('dragged');
});
document.addEventListener('dragover', function(e) {
    e.preventDefault();
});
document.addEventListener('drop', function(e) {
    e.preventDefault();
    drag_count = 0;
    document.body.classList.remove('dragged');

    let options: {[k: string]: string} = {};
    for(let input of document.querySelectorAll('input[type=radio]:checked') as NodeListOf<HTMLInputElement>) {
        options[input.name] = input.value;
    }

    let ingress_type = options.ingress;
    let egress: Egress = options.egress==='xml' ? {type: 'xml'} : options.egress==='debug' ? {type: 'debug', show_peers: false} : {type: 'debug', show_peers: true};
    let ext = options.egress==='xml' ? 'xml' : 'js';

    let files = e.dataTransfer!.files;

    let perform = async function() {
        for(let file of files) {
            let content = await read_file(file);
            await do_process(file.name, ext, {type: ingress_type, content: content} as Ingress, egress);
        }
    };

    void perform();
});