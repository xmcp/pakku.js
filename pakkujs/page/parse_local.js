function id(x) {
    return document.getElementById(x);
}

// https://stackoverflow.com/questions/2897619/using-html5-javascript-to-generate-and-save-a-file
function download(filename, content)
{
    var a = document.createElement('a');
    var blob = new Blob([content], {'type':'application/octet-stream'});
    a.href = window.URL.createObjectURL(blob);
    a.download = filename;
    var event = new MouseEvent("click");
	a.dispatchEvent(event);
}

document.body.addEventListener('dragenter',function() {
    window.drag_count++;
    document.body.classList.add('dragged');
});
document.body.addEventListener('dragleave',function() {
    if(--window.drag_count==0)
        document.body.classList.remove('dragged');
});
document.body.addEventListener('dragover',function(e) {
    e.preventDefault();
});
document.body.addEventListener('drop',function(e) {
    e.preventDefault();
    window.drag_count=0;
    document.body.classList.remove('dragged');

    var files=e.dataTransfer.files;
    if(files.length!=1) {
        alert('请拖拽1个文件！');
        return;
    }

    var fr=new FileReader();
    fr.onload=function() {
        id('content').value=fr.result;
        id('process').click();
    }
    fr.readAsText(files[0],'utf-8');
});

chrome.runtime.getBackgroundPage(function(bgpage) {
    id('process').addEventListener('click',function() {
        var txt=id('content').value.trim();

        chrome.tabs.query(
            {active: true, currentWindow: true},
            function(d) {
                if(d[0] && d[0].id) {
                    var tabid=d[0].id;

                    var res=bgpage.load_danmaku(bgpage.xml_to_ir(txt),0,tabid);
                    if(res) {
                        download('pakku_processed.xml',res);
                    }
                }
            }
        );
    });
});