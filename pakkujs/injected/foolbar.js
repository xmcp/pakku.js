// (C) 2018 @xmcp. THIS PROJECT IS LICENSED UNDER GPL VERSION 3. SEE `LICENSE.txt`.

var FOOLBAR_CSS=`
.pakku-foolbar {
    width: 100%;
    display: flex;
    line-height: 20px;
}
.pakku-foolbar * {
    font-family: 'Consolas', 'Courier', monospace !important;
}
.pakku-foolbar>.pakku-foolbar-prompt {
    flex: 0 0 250px;
    text-align: right;
}
.pakku-foolbar>input {
    flex: 1 1 0;
    -webkit-appearance: textfield; /* fix for bangumi page */
}
.pakku-foolbar>.pakku-foolbar-prompt::after {
    margin-right: 1em;
    content: ' select * from danmaku where';
    color: darkblue;
    font-style: italic;
}
`;
var FOOLBAR_SCHEMA=`create table danmaku (
    _xml_src text,
    text text, /* 显示的弹幕内容 */
    str text, /* 原始弹幕内容 */
    cnt integer, /* 合并数量 */
    time real, /* 弹幕在视频中的时间 (s) */
    color text, /* 颜色 (hex) */
    pool integer, /* 弹幕池 (0 默认 / 1 字幕) */
    mode integer, /* 模式 (1 滚动 / 4 底部 / 5 顶部 / 7 高级) */
    size integer, /* 字号 (px) */
    sendtime integer, /* 发送时间 (UNIX时间戳) */
    uid integer, /* 发送者UID [or null] */
    exp integer /* 发送者经验值 [or null] */
)`;

var foolbar_help_text=`Hello World!
通过左侧的输入框，你可以用 SQL 语句进行弹幕屏蔽。
输入 SQL 查询后，当前的弹幕列表将即时更新。

弹幕信息的格式如下：
${FOOLBAR_SCHEMA}

请注意：出于性能考虑，如果你需要用 uid 和 exp 两列数据，请点击输入框旁边的按钮。否则它们都是 null。

Proudly using AlaSQL.
`

function inject_foolbar() {
    var _initialized=false;
    inject_css(FOOLBAR_CSS);
    function init_db() {
        console.time('pakku foolbar: init db');
        function extract_exp(d) {
            try {
                return d.sender_info.level_info.current_exp;
            } catch(e) {
                return null;
            }
        }

        if(typeof alasql=='undefined') {
            alert('未加载 AlaSQL');
            throw new Error('alasql not ready');
        }

        alasql('drop table if exists danmaku');
        alasql(FOOLBAR_SCHEMA);
        
        D.forEach(function(d) {
            var p=d.peers[0];
            alasql.tables.danmaku.data.push({
                _xml_src: d.xml_src,
                text: d.text,
                str: p.orig_str,
                cnt: d.peers.length,
                time: p.time,
                uid: d.cracked_uid||null,
                color: parseInt(p.attr[3]).toString(16),
                pool: parseInt(p.attr[5]),
                mode: parseInt(p.attr[1]),
                size: parseInt(p.attr[2]),
                sendtime: parseInt(p.attr[4]),
                exp: extract_exp(d)
            });
        });
        console.timeEnd('pakku foolbar: init db');
        _initialized=true;
    }
    function get_db() {
        if(!_initialized)
            init_db();
    }
    function do_sql_filter(statement,callback) {
        try {
            var res=alasql(statement);
        } catch(e) {
            hint_text.textContent='!!!';
            alert(e.message);
            throw e;
        }
        var text='';
        res.forEach(function(r) {
            text+=r._xml_src;
        });
        callback(text);
    }
    function do_execute() {
        get_db();
        do_sql_filter('select _xml_src from danmaku where '+input.value,function(text) {
            chrome.runtime.sendMessage({
                type: 'set_xml_bounce',
                result: '<i>'+text+'</i>'
            }, {}, function(resp) {
                if(resp.error===null)
                    reload_danmaku_magic(resp.nonce);
                else
                    alert(resp.error);
                hint_text.textContent='>>>';
            });
        });
    }

    if(root_elem.parentNode.querySelector('.pakku-foolbar')) {
        console.log('pakku foolbar: already exist');
        return;
    }

    function make_button(text,callback) {
        var elem=make_elem('button','pakku-button');
        elem.textContent=text;
        elem.addEventListener('click',callback);
        return elem;
    }

    // init dom
    var bar=make_elem('div','pakku-foolbar');
    var hint_text=make_elem('span','pakku-foolbar-prompt');
    hint_text.textContent='>>>';
    bar.appendChild(hint_text);
    var input=make_elem('input','pakku-foolbar-input');
    input.placeholder='text, str, cnt, time, color, pool, mode, size, sendtime[, uid[, exp]]'
    input.addEventListener('keypress',function(e) {
        if(e.keyCode==13) { // enter
            hint_text.textContent='...';
            setTimeout(do_execute,50);
        }
    });
    bar.appendChild(input);
    var btn_init_db=make_button('init',function() {
        init_db();
    });
    var btn_init_with_uid=make_button('+uid',function(e) {
        btn_init_with_uid.disabled=true;
        chrome.runtime.sendMessage({type: 'crack_uidhash_batch', dinfo: D}, function(newD) {
            D=newD;
            init_db();
            btn_init_with_uid.textContent='✓uid';
        });
    });
    var btn_init_with_exp=make_button('+exp',function(e) {
        btn_init_with_uid.disabled=true;
        btn_init_with_exp.disabled=true;
        chrome.runtime.sendMessage({type: 'load_userinfo_batch', dinfo: D}, function(newD) {
            D=newD;
            init_db();
            btn_init_with_uid.textContent='✓uid';
            btn_init_with_exp.textContent='✓exp';
        });
    });
    bar.appendChild(btn_init_db);
    bar.appendChild(btn_init_with_uid);
    bar.appendChild(btn_init_with_exp);
    bar.appendChild(make_button('[?]',function() {
        alert(foolbar_help_text);
    }))

    root_elem.parentNode.appendChild(bar);
}