(()=>{ // wrap in iife to avoid name conflict with content_script.js

    let $container = document.querySelector('#result-container');
    let $download_btn = document.querySelector('#download-btn');
    let $clear_btn = document.querySelector('#clear-btn');

    function download(filename, text) {
        let a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([text], {type: 'application/octet-stream; charset=utf-8'}));
        a.download = filename;
        a.click();
    }

    let all_res = [];

    $download_btn.onclick = function() {
        for(let [filename, res] of all_res) {
            download(filename, res);
        }
    };
    $clear_btn.onclick = function() {
        for(let fin of $container.querySelectorAll('.finished')) {
            fin.parentElement.removeChild(fin);
        }
        all_res = [];
    };

    async function do_process(filename, ext, ingress, egress) {
        let row = document.createElement('p');
        row.textContent = `${filename}：处理中…`;
        $container.appendChild(row);

        let res = await window.pakku_process_local(ingress, egress);

        all_res.push([`${filename}_pakku.${ext}`, res.data]);
        row.classList.add('finished');
        row.textContent = `${filename}：处理完成（${ingress.type} → ${egress.type} ${(res.data.length/1024).toFixed(0)} KB）`;
    }

    function read_file(file) {
        return new Promise((resolve, reject) => {
            let fr = new FileReader();
            fr.onload = function() {
                resolve(fr.result);
            };
            fr.readAsText(file, 'utf-8');
        });
    }

    document.body.addEventListener('dragenter', function() {
        window.drag_count++;
        document.body.classList.add('dragged');
    });
    document.body.addEventListener('dragleave', function() {
        if(--window.drag_count === 0)
            document.body.classList.remove('dragged');
    });
    document.body.addEventListener('dragover', function(e) {
        e.preventDefault();
    });
    document.body.addEventListener('drop', function(e) {
        e.preventDefault();
        window.drag_count = 0;
        document.body.classList.remove('dragged');

        let options = {};
        for(let input of document.querySelectorAll('input[type=radio]:checked')) {
            options[input.name] = input.value;
        }

        let ingress_type = options.ingress;
        let egress = options.egress==='xml' ? {type: 'xml'} : options.egress==='debug' ? {type: 'debug', show_peers: false} : {type: 'debug', show_peers: true};
        let ext = options.egress==='xml' ? 'xml' : 'js';

        let files = e.dataTransfer.files;

        let perform = async function() {
            for(let file of files) {
                let content = await read_file(file);
                await do_process(file.name, ext, {type: ingress_type, content: content}, egress);
            }
        };

        void perform();
    });
})();