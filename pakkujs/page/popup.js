import {get_state} from '../background/state';

function id(x) {
    return document.getElementById(x);
}

let options_href = chrome.runtime.getURL('/page/options.html');
id('pakku-logo').href = options_href;
id('version').textContent = chrome.runtime.getManifest().version;

for(let elem of document.querySelectorAll('a[data-options-link]')) {
    elem.target = '_blank';
    elem.href = options_href + '#' + elem.dataset.optionsLink;
    elem.title = '调整相关设置';
}

let switch_btn = id('switch');
let hint_text = id('hint-text');

chrome.commands.getAll(function(cmds) {
    cmds.forEach(function(cmd) {
        let elem = id('command-' + cmd.name);
        if(elem) {
            elem.textContent = cmd.shortcut;
            elem.onclick = function() {
                void chrome.tabs.create({url: 'chrome://extensions/shortcuts'});
            };
        }
    });
});

async function loadui() {
    let state = await get_state();
    let enabled = state.GLOBAL_SWITCH;
    switch_btn.classList.add(enabled ? 'on' : 'off');
    switch_btn.classList.remove(enabled ? 'off' : 'on');
    switch_btn.textContent = enabled ? '工作中' : '休息中';
    chrome.tabs.query({active: true, currentWindow: true}, function(d) {
        let general = enabled ? '本页面没有发现B站播放器' : 'zzzzzzzzzz'
        let tabid = d[0]?.id;
        if(tabid) {
            id('userscript-btn').onclick = function() {
                void chrome.tabs.create({url: chrome.runtime.getURL('/page/userscript.html?tabid='+tabid)});
            };

            let stats = state['STATS_'+tabid];
            if(!stats) {
                hint_text.textContent = general;
                return;
            }

            if(stats.type==='message') {
                hint_text.textContent = stats.message;
            }
            else if(stats.type==='error') {
                id('pakku-title').style.display = 'none';
                id('exception').classList.remove('display-none');
            }
            else if(stats.type==='done') {
                id('pakku-title').style.display = 'none';
                id('result').classList.remove('display-none');
                id('link-danmu-count').href = chrome.runtime.getURL(`/page/view_result.html?tabid=${tabid}`);
            }

            for(let name in stats)
                if(id('status-' + name)) {
                    let r = stats[name];
                    let elem = id('status-' + name);
                    let row = elem.closest('tr');
                    if(row) {
                        if(r==='' || r===0)
                            row.classList.add('display-none');
                        else
                            row.classList.remove('display-none');
                    }
                    elem.textContent = (typeof r == 'number') ? Math.ceil(r) : r;
                }
            for(let category of ['combined', 'deleted', 'ignored', 'modified', 'info']) {
                let rows = Array.from(document.querySelectorAll(`.status-header-${category}:not(.display-none)`));
                for(let row of rows) {
                    row.classList.remove('first-item');
                }
                if(rows.length)
                    rows[0].classList.add('first-item');
            }
        } else {
            hint_text.textContent = general;
        }
    });
}

switch_btn.addEventListener('click', async function() {
    await chrome.runtime.sendMessage({type: 'toggle_switch'});
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.type==='reload_state') {
        console.log('pakku popup: reload state');
        void loadui();
    }
});

void loadui();