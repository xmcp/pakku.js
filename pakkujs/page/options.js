import {get_config, save_config} from '../background/config';

const IS_FIREFOX = process.env.PAKKU_CHANNEL === 'firefox';
const IS_EDG = process.env.PAKKU_CHANNEL === 'chrome' && navigator.userAgent.indexOf('Edg/') !== -1;

if(!IS_FIREFOX && navigator.userAgent.indexOf('Firefox/') !== -1 && window.InstallTrigger) {
    if(confirm('您正在使用 Chrome 分支的 pakku，它在 Firefox 中无法正常工作。\nFirefox 用户请卸载当前版本，然后在 Firefox 附加组件中心下载 pakku。\n\n现在前往下载吗？'))
        location.href = 'https://addons.mozilla.org/zh-CN/firefox/addon/pakkujs/';
}

function id(x) {
    return document.getElementById(x);
}

function try_regexp(x) {
    try {
        new RegExp(x);
        return x;
    } catch(e) {
        alert('正则表达式语法有误：\n\n' + e.message)
        throw e;
    }
}

function regexp_wrap(src) {
    if(src.indexOf('^') !== 0)
        src = '^.*' + src;
    if(src.indexOf('$') !== src.length - 1)
        src = src + '.*$';
    return src;
}

let version = 'v' + chrome.runtime.getManifest().version;
let img_btns = document.querySelectorAll('[data-name]');
id('version').textContent = version + '_' + (IS_FIREFOX ? 'F' : 'C');

function highlighter() {
    if(!location.hash) return;
    let el = document.querySelector(location.hash);
    if(!el) return;

    let adv_obj = el.closest('.advanced');
    if(adv_obj) adv_obj.classList.add('js-show-this');
    el = el.closest('p');
    if(!el) return;

    let old = document.getElementById('highlighter');
    if(old) old.parentNode.removeChild(old);

    let hl = document.createElement('span');
    hl.id = 'highlighter';
    el.appendChild(hl);

    el.scrollIntoView();
    setTimeout(function() {
        scrollBy(0, -100);
    }, 0);
}

highlighter();
window.addEventListener('hashchange', highlighter);

id('reset').addEventListener('click', function() {
    if(confirm('确定要重置所有设置吗？\n此操作不可恢复。')) {
        localStorage.clear();
        chrome.storage.sync.clear(function() {
            if(chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
                alert('设置清空失败');
            }

            alert('重置完成');
            location.reload();
        });
    }
});

if(IS_EDG)
    id('ask-review-line').style.display = 'none';

// version check
async function ver_check() {
    if(IS_EDG) {
        console.log('version checking disabled for edg');
        id('version-checker').textContent = '(Edge)';
        return;
    }

    let res = await fetch(
        IS_FIREFOX ?
            'https://img.shields.io/amo/v/pakkujs.json' :
            'https://img.shields.io/chrome-web-store/v/jklfcpboamajpiikgkbjcnnnnooefbhh.json',
    );
    let latest_ver = await res.json();

    console.log('latest version ', latest_ver);
    if(latest_ver.value.charAt(0) === 'v') {
        if(latest_ver.value !== version) {
            let note = document.createElement('a');
            note.href = 'https://s.xmcp.ltd/pakkujs/?src=update_banner&from_version=' + encodeURIComponent(version);
            note.id = 'update-note';
            note.target = '_blank';
            note.textContent = '你正在使用 pakku ' + version + '，' + latest_ver.name + ' 中的最新版是 ' + latest_ver.value + '。点击此处下载新版本。';
            document.body.appendChild(note);
        }  else {
            id('version-checker').textContent = '✓ 是最新版本';
        }
    }
}
void ver_check();

for(let elem of document.querySelectorAll('.donate')) {
    elem.addEventListener('mouseover', function() {
        document.body.classList.add('donate-show');
    });
    elem.addEventListener('mouseout', function() {
        document.body.classList.remove('donate-show');
    });
}

let config = await get_config();
let perms = await chrome.permissions.getAll();

if(!perms.origins?.includes('*://*.bilibili.com/*')) {
    id('fix-permission-hint').style.display = 'initial';
    id('fix-permission-btn').addEventListener('click', function() {
        /// xxx: cannot use async here, https://bugzilla.mozilla.org/show_bug.cgi?id=1398833
        chrome.permissions.request({
            origins: ['*://*.bilibili.com/*', 'ws://*.bilibili.com/*', 'wss://*.bilibili.com/*'],
        })
            .then((granted)=>{
                if(granted) {
                    id('fix-permission-hint').style.display = 'none';
                    void chrome.runtime.sendMessage({type: 'reset_dnr_status'});
                    void chrome.notifications.clear('//perm_hotfix');
                    chrome.permissions.getAll().then((p)=>{perms = p;});
                }
            });
    });
}

function get_ws_permission_and_reload() {
    function done(granted) {
        if(!granted) {
            config.BREAK_UPDATE = false;
            // noinspection ES6MissingAwait
            alert('权限不足或者您的浏览器不支持此功能');
        }
        void reload(true);
    }

    if(perms.origins?.includes('ws://*.bilibili.com/*') && perms.origins?.includes('wss://*.bilibili.com/*')) {
        done(true);
    } else {
        chrome.permissions.request({
            origins: ['ws://*.bilibili.com/*', 'wss://*.bilibili.com/*'],
        }, (granted)=>{
            done(granted);
        });
    }
}

async function backup_restore_prompt() {
    let inp = prompt('直接按回车来导出设置；将设置粘贴到此处来导入设置。');
    if(inp === null) return;
    if(!inp) { // export
        document.body.textContent = JSON.stringify(config);
        alert('导出成功。\n请将屏幕上的文本妥善保存在别处。');
    } else { // import
        try {
            config = JSON.parse(inp);
            config._CONFIG_VER = config._CONFIG_VER || 0;
            await save_config(config);
            loadconfig();
            if(config.BREAK_UPDATE)
                get_ws_permission_and_reload();
            alert('导入成功。');
            setTimeout(()=>{
                location.reload();
            }, 200);
        } catch(e) {
            alert('导入失败。\n\n' + e.message);
            throw e;
        }
    }
}

id('version').addEventListener('click', async function(event) {
    if(event.altKey && event.ctrlKey)
        await backup_restore_prompt();
});
id('backup-restore').addEventListener('click', backup_restore_prompt);

async function reload(changed_dnr=false) {
    await save_config(config);

    id('saved-alert').classList.remove('saved-hidden');
    setTimeout(function() {
        id('saved-alert').classList.add('saved-hidden');
    }, 100);

    let old = document.getElementById('highlighter');
    if(old)
        old.parentNode.removeChild(old);

    if(changed_dnr)
        void chrome.runtime.sendMessage({type: 'reset_dnr_status'});

    loadconfig();
}

function loadconfig() {
    id('show-advanced').checked = config.ADVANCED_USER;
    // 弹幕合并
    id('threshold').value = config.THRESHOLD;
    id('max-dist').value = config.MAX_DIST;
    id('max-cosine').value = config.MAX_COSINE;
    id('trim-pinyin').checked = config.TRIM_PINYIN;
    id('trim-ending').checked = config.TRIM_ENDING;
    id('trim-space').checked = config.TRIM_SPACE;
    id('trim-width').checked = config.TRIM_WIDTH;
    // 例外设置
    id('cross-mode').checked = config.CROSS_MODE;
    id('ignore-type7').checked = !config.PROC_TYPE7;
    id('ignore-type4').checked = !config.PROC_TYPE4;
    id('ignore-pool1').checked = !config.PROC_POOL1;
    // 显示设置
    id('danmu-mark').value = config.DANMU_MARK;
    id('mark-threshold').value = config.MARK_THRESHOLD;
    id('danmu-subscript').checked = config.DANMU_SUBSCRIPT;
    id('enlarge').checked = config.ENLARGE;
    id('shrink').checked = config.SHRINK;
    id('mode-elevation').checked = config.MODE_ELEVATION;
    id('representative-percent').value = config.REPRESENTATIVE_PERCENT;
    // 播放器增强
    id('tooltip').checked = config.TOOLTIP;
    id('tooltip-keybinding').checked = config.TOOLTIP_KEYBINDING;
    id('auto-disable-danmu').checked = config.AUTO_DISABLE_DANMU;
    id('auto-danmu-list').checked = config.AUTO_DANMU_LIST;
    id('fluctlight').checked = config.FLUCTLIGHT;
    // 实验室
    id('break-update').checked = config.BREAK_UPDATE;
    id('scroll-threshold').value = config.SCROLL_THRESHOLD;
    // 其他
    id('popup-badge').value = config.POPUP_BADGE;
    id('combine-threads').value = config.COMBINE_THREADS;

    // advanced options
    if(id('show-advanced').checked) document.body.classList.add('i-am-advanced');
    else document.body.classList.remove('i-am-advanced');
    // opacity stuff
    id('mark-threshold-panel').style.opacity = '' + (config.DANMU_MARK ? 1 : .3);
    id('danmu-subscript-panel').style.opacity = '' + (config.DANMU_MARK ? 1 : .3);
    id('tooltip-keybinding-panel').style.opacity = '' + (config.TOOLTIP ? 1 : .3);

    // FORCELIST
    let forcelist = id('forcelist');
    forcelist.textContent = '';
    for(let i in config.FORCELIST) {
        i = parseInt(i);

        let container = document.createElement('li'),
            code1 = document.createElement('code'),
            spliter = document.createElement('span'),
            code2 = document.createElement('code'),
            deletebtn = document.createElement('button'),
            savebtn = document.createElement('button'),
            cancelbtn = document.createElement('button');

        code1.textContent = config.FORCELIST[i][0];
        code1.contentEditable = 'true';
        spliter.textContent = ' → ';
        code2.textContent = config.FORCELIST[i][1];
        code2.contentEditable = 'true';

        deletebtn.textContent = '删除';
        deletebtn.className = 'btn';
        cancelbtn.textContent = '取消';
        cancelbtn.className = 'btn hidden';
        savebtn.textContent = '保存';
        savebtn.className = 'btn hidden';

        deletebtn.addEventListener('click', async function() {
            config.FORCELIST.splice(i, 1);
            await reload();
        });
        savebtn.addEventListener('click', async function() {
            config.FORCELIST[i][0] = try_regexp(code1.textContent);
            config.FORCELIST[i][1] = code2.textContent;
            await reload();
        });
        cancelbtn.addEventListener('click', loadconfig);

        let show_btn = ()=>{
            deletebtn.classList.add('hidden');
            savebtn.classList.remove('hidden');
            cancelbtn.classList.remove('hidden');
        };

        code1.addEventListener('input', show_btn);
        code2.addEventListener('input', show_btn);

        container.appendChild(code1);
        container.appendChild(spliter);
        container.appendChild(code2);
        container.appendChild(deletebtn);
        container.appendChild(cancelbtn);
        container.appendChild(savebtn);
        forcelist.appendChild(container);
    }

    // WHITELIST
    let whitelist = id('whitelist');
    whitelist.textContent = '';
    for(let i in config.WHITELIST) {
        i = parseInt(i);

        let container = document.createElement('li'),
            code1 = document.createElement('code'),
            deletebtn = document.createElement('button'),
            savebtn = document.createElement('button'),
            cancelbtn = document.createElement('button');

        code1.textContent = config.WHITELIST[i][0];
        code1.contentEditable = 'true';

        deletebtn.textContent = '删除';
        deletebtn.className = 'btn';
        savebtn.textContent = '保存';
        savebtn.className = 'btn hidden';
        cancelbtn.textContent = '取消';
        cancelbtn.className = 'btn hidden';

        deletebtn.addEventListener('click', async function() {
            config.WHITELIST.splice(i, 1);
            await reload();
        });
        savebtn.addEventListener('click', async function() {
            config.WHITELIST[i][0] = try_regexp(code1.textContent);
            await reload();
        });
        cancelbtn.addEventListener('click', loadconfig);

        let show_btn = ()=>{
            savebtn.classList.remove('hidden');
            cancelbtn.classList.remove('hidden');
        };

        code1.addEventListener('input', show_btn);

        container.appendChild(code1);
        container.appendChild(deletebtn);
        container.appendChild(savebtn);
        container.appendChild(cancelbtn);
        whitelist.appendChild(container);
    }

    function stringify(s) {
        if(typeof s === 'boolean')
            return s ? 'on' : 'off';
        else
            return s;
    }

    for(let elem of img_btns) {
        if(stringify(config[elem.dataset['name']]) === elem.dataset['value'])
            elem.className = 'img-active';
        else
            elem.className = 'img-inactive';
        }
}

id('newforcelist-form').addEventListener('submit', function(e) {
    e.preventDefault();
    config.FORCELIST.push([
        try_regexp(regexp_wrap(id('newforcelist-pattern').value)),
        id('newforcelist-name').value,
    ]);
    void reload();
    id('newforcelist-pattern').value = '';
    id('newforcelist-name').value = '';
});
id('newwhitelist-form').addEventListener('submit', function(e) {
    e.preventDefault();
    config.WHITELIST.push([
        try_regexp(id('newwhitelist-pattern').value),
        "", // could be anything
    ]);
    void reload();
    id('newwhitelist-pattern').value = '';
});
for(let elem of img_btns) {
    elem.addEventListener('click', function() {
        config[elem.dataset['name']] = elem.dataset['value'];
        void reload();
    });
}

function update() {
    config.ADVANCED_USER = id('show-advanced').checked;
    // 弹幕合并
    config.THRESHOLD = parseInt(id('threshold').value, 10) > -2 ? parseInt(id('threshold').value, 10) : 20;
    config.MAX_DIST = parseInt(id('max-dist').value);
    config.MAX_COSINE = parseInt(id('max-cosine').value);
    config.TRIM_PINYIN = id('trim-pinyin').checked;
    config.TRIM_ENDING = id('trim-ending').checked;
    config.TRIM_SPACE = id('trim-space').checked;
    config.TRIM_WIDTH = id('trim-width').checked;
    // 例外设置
    config.CROSS_MODE = id('cross-mode').checked;
    config.PROC_TYPE7 = !id('ignore-type7').checked;
    config.PROC_TYPE4 = !id('ignore-type4').checked;
    config.PROC_POOL1 = !id('ignore-pool1').checked;
    // 显示设置
    config.DANMU_MARK = id('danmu-mark').value;
    config.MARK_THRESHOLD = parseInt(id('mark-threshold').value) > 0 ? parseInt(id('mark-threshold').value) : 1;
    config.DANMU_SUBSCRIPT = id('danmu-subscript').checked ;
    config.ENLARGE = id('enlarge').checked;
    config.SHRINK = id('shrink').checked;
    config.MODE_ELEVATION = id('mode-elevation').checked;
    config.REPRESENTATIVE_PERCENT = id('representative-percent').value;
    // 播放器增强
    config.TOOLTIP = id('tooltip').checked;
    config.TOOLTIP_KEYBINDING = id('tooltip-keybinding').checked;
    config.AUTO_DISABLE_DANMU = id('auto-disable-danmu').checked;
    config.AUTO_DANMU_LIST = id('auto-danmu-list').checked;
    config.FLUCTLIGHT = id('fluctlight').checked;
    // 实验室
    config.BREAK_UPDATE = id('break-update').checked;
    config.SCROLL_THRESHOLD = parseInt(id('scroll-threshold').value) >= 0 ? parseInt(id('scroll-threshold').value) : 0;
    // 其他
    config.POPUP_BADGE = id('popup-badge').value;
    config.COMBINE_THREADS = parseInt(id('combine-threads').value) >= 1 ? parseInt(id('combine-threads').value) : 1;

    if(this.id === 'break-update') {
        if(this.checked)
            get_ws_permission_and_reload();
        else
            void reload(true);
    }
    else {
        void reload();
    }
}

loadconfig();

for(let elem of [
    'show-advanced',
    // 弹幕合并
    'threshold', 'max-dist', 'max-cosine', 'trim-pinyin', 'trim-ending', 'trim-space', 'trim-width',
    // 例外设置
    'cross-mode', 'ignore-type7', 'ignore-type4', 'ignore-pool1',
    // 显示设置
    'mark-threshold', 'danmu-mark', 'danmu-subscript', 'enlarge', 'shrink', 'mode-elevation', 'representative-percent',
    // 播放器增强
    'tooltip', 'tooltip-keybinding', 'auto-disable-danmu', 'auto-danmu-list', 'fluctlight',
    // 实验室
    'break-update', 'scroll-threshold',
    // 其他
    'popup-badge', 'combine-threads',
]) {
    id(elem).addEventListener('change', update);
}