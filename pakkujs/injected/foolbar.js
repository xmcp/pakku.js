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

function inject_foolbar() {
    inject_css(FOOLBAR_CSS);
    function init_db(db,callback) {
        if(this._initialized) return callback();
        this._initialized=true;
        console.time('pakku foolbar: init db');
        chrome.runtime.sendMessage({type: 'crack_uidhash_batch', hashes: D}, function(D) {
            db.transaction(function(tx) {
                tx.executeSql('drop table if exists danmaku');
                tx.executeSql(`create table if not exists danmaku (
                    _xml_src text,
                    text text,
                    str text,
                    count integer,
                    time real,
                    uid integer,
                    color text,
                    pool integer,
                    mode integer,
                    size integer,
                    sendtime integer
                )`);
                D.forEach(function(d) {
                    var p=d.peers[0];
                    tx.executeSql(`insert into danmaku (
                            _xml_src, text, str, count, time,
                            uid, color, pool,
                            mode, size, sendtime
                        ) values (?,?,?,?,?,?,?,?,?,?,?)
                    `,[
                        d.xml_src, d.text, p.orig_str, d.peers.length, p.time,
                        d.cracked_uid, parseInt(p.attr[3]).toString(16), parseInt(p.attr[5]),
                        parseInt(p.attr[1]), parseInt(p.attr[2]), parseInt(p.attr[4])
                    ]);
                });
                console.timeEnd('pakku foolbar: init db');
                callback();
            },function(err) {
                hint_text.textContent='!!!';
                console.log(err);
                alert(err.message);
            });
        });
    }
    function do_sql_filter(db,statement,callback) {
        db.transaction(function(tx) {
            tx.executeSql(statement,[],function(tx,res) {
                console.log(res);
                var text='';
                [].slice.call(res.rows).forEach(function(r) {
                    text+=r._xml_src;
                });
                callback(text);
            });
        },function(err) {
            hint_text.textContent='!!!';
            console.log(err);
            alert(err.message);
        });
    }
    function do_execute() {
        var nonce=''+-~~(1+Math.random()*1000000);
        init_db(db,function() {
            do_sql_filter(db,'select _xml_src from danmaku where '+input.value,function(text) {
                chrome.runtime.sendMessage({
                    type: 'foolbar',
                    nonce: nonce,
                    result: '<i>'+text+'</i>'
                }, {}, function(resp) {
                    if(resp.error===null)
                        reload_danmaku_magic(nonce);
                    else
                        alert(resp.error);
                    hint_text.textContent='>>>';
                });
            });
        });
    }

    var db=openDatabase('pakku_foolbar','1.0','Temporary database for Pakku Foolbar',1024*1024);

    if(root_elem.parentNode.querySelector('.pakku-foolbar')) {
        console.log('pakku foolbar: already exist');
        return;
    }

    var bar=make_elem('div','pakku-foolbar');
    var hint_text=make_elem('span','pakku-foolbar-prompt');
    hint_text.textContent='>>>';
    bar.appendChild(hint_text);
    var input=make_elem('input','pakku-foolbar-input');
    input.placeholder='text, str, count, time, uid, color, pool, mode, size, sendtime'
    input.addEventListener('keypress',function(e) {
        if(e.keyCode==13) { // enter
            hint_text.textContent='...';
            setTimeout(do_execute,50);
        }
    });
    bar.appendChild(input);
    root_elem.parentNode.appendChild(bar);
}