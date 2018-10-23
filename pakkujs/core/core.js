// (C) 2018 @xmcp. THIS PROJECT IS LICENSED UNDER GPL VERSION 3. SEE `LICENSE.txt`.

var LOG_VERBOSE=false;
var LOG_DISPVAL=false;

var DISPVAL_THRESHOLD=70,SHRINK_TIME_THRESHOLD=3;

var ENDING_CHARS=gen_set('.。,，/?？!！…~～@^、+=-_♂♀ ');
var trim_space_re=/[ 　]+/g;

var WIDTH_TABLE={}; // '１': '1'
(function() {
    var before='　１２３４５６７８９０!＠＃＄％＾＆＊（）－＝＿＋［］｛｝;＇:＂,．／＜＞?＼｜｀～ｑｗｅｒｔｙｕｉｏｐａｓｄｆｇｈｊｋｌｚｘｃｖｂｎｍＱＷＥＲＴＹＵＩＯＰＡＳＤＦＧＨＪＫＬＺＸＣＶＢＮＭ';
    var after=' 1234567890！@#$%^&*()-=_+[]{}；\'："，./<>？\\|`~qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    if(before.length !== after.length) throw 1;
    for(var i=0;i<before.length;i++)
        WIDTH_TABLE[before[i]]=after[i];
})();

var PINYIN_TABLE={}; // '周': [symbols['zh'], symbols['ou']], '啊': [symbols['a']]
(function() {
    var symbols={}; // 'a': '\ue000'
    var symbol_idx=0xe000; // U+E000 ~ U+F8FF: Private Use Area

    for(var phonetic_raw in PINYIN_DICT_RAW) {
        var phonetics=phonetic_raw.split('-').map(function(phonetic) {
            if(!symbols[phonetic])
                return (symbols[phonetic]=String.fromCharCode(symbol_idx++));
            else
                return symbols[phonetic];
        }).join('');

        var str=PINYIN_DICT_RAW[phonetic_raw];
        for(var i=str.length-1;i>=0;i--)
            PINYIN_TABLE[str[i]]=phonetics;
    }

    delete PINYIN_DICT_RAW;
})();

function generate_ctx(tabid) {
    window.FORCELIST_ctx=[];
    window.WHITELIST_ctx=[];
    if(TEMPRULES[tabid]) {
        /*for-firefox:
    
        // `can't access dead object`
        TEMPRULES[tabid]=JSON.parse(JSON.stringify(TEMPRULES[tabid]));
        
        */
        TEMPRULES[tabid].FORCELIST.forEach(function(item) {
            window.FORCELIST_ctx.push([new RegExp('^.*'+item+'.*$'),'[临时]'+item]);
        });
        TEMPRULES[tabid].WHITELIST.forEach(function(item) {
            window.WHITELIST_ctx.push([new RegExp(item),'']);
        });
    }
    window.FORCELIST_ctx=window.FORCELIST_ctx.concat(FORCELIST);
    window.WHITELIST_ctx=window.WHITELIST_ctx.concat(WHITELIST);
}

function parse(dom,tabid,S,D) {
    generate_ctx(tabid);

    FORCELIST_len=FORCELIST_ctx.length;
    WHITELIST_len=WHITELIST_ctx.length;
    BLACKLIST_len=BLACKLIST.length;
    
    console.time('parse');
    
    function make_peers_node(obj,reason) {
        return { // clone the obj without some attributes
            attr: obj.attr,
            time: obj.time,
            orig_str: obj.orig_str,
            mode: obj.mode,
            reason: reason
        };
    }
    
    function enlarge(count) {
        if(count<=5)
            return 1;
        else {
            S.enlarge++;
            return Math.log(count)/MATH_LOG5;
        }
    }
    
    // https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript
    var _get_width_cvs=document.createElement('canvas');
    function get_width_if_exceeds(text,size,threshold) {
        if(text.length*size<threshold) // speedup
            return 0;
        var ctx=_get_width_cvs.getContext('2d');
        ctx.font=parseInt(size)+'pt 黑体';
        return ctx.measureText(text.replace(/\/n/g,'')).width;
    }

    function make_mark(txt,cnt) {
        function make_cnt(cnt) {
            if(DANMU_SUBSCRIPT)
                return '₍'+to_subscript(cnt)+'₎';
            else
                return '[x'+cnt+']';
        }
        return DANMU_MARK=='suffix' ? txt+make_cnt(cnt) :
               DANMU_MARK=='prefix' ? make_cnt(cnt)+txt :
               txt;
    }
    
    function detaolu(inp) {
        var len=inp.length;
        var text='';
        if(TRIM_ENDING) {
            while(ENDING_CHARS[inp.charAt(len-1)]!==undefined) // assert str.charAt(-1)==''
                len--;
            if(len==0) len=inp.length;
        }
        for(var i=0;i<len;i++) {
            var to=TRIM_WIDTH ? WIDTH_TABLE[inp.charAt(i)] : undefined;
            if(to!==undefined)
                text+=to;
            else
                text+=inp.charAt(i);
        }
        if(TRIM_SPACE)
            text=text.replace(trim_space_re,' ');
        
        for(var i=0;i<FORCELIST_len;i++)
            if(FORCELIST_ctx[i][0].test(text)) {
                S.taolu++;
                return text.replace(new RegExp(FORCELIST_ctx[i][0],'g'),FORCELIST_ctx[i][1]);
            }
        return text;
    }
    
    function whitelisted(text) {
        for(var i=0;i<WHITELIST_len;i++)
            if(WHITELIST_ctx[i][0].test(text))
                return true;
        return false;
    }
    function blacklisted(text) {
        for(var i=0;i<BLACKLIST_len;i++)
            if(BLACKLIST[i][0].test(text))
                return true;
        return false;
    }
    
    function ext_special_danmu(text) {
        try {
            text=JSON.parse(text)[4];
        } catch(e) {}
        return text.replace(/\/n/g,'');
    }
    
    function build_text(elem) {
        var count=elem.peers.length;
        var dumped=null;
        if(elem.mode=='7') // special danmu, need more parsing
            try {
                dumped=JSON.parse(elem.orig_str);
            } catch(e) {}
        
        if(dumped) {
            dumped[4]=count<=MARK_THRESHOLD?dumped[4]:make_mark(elem.str,count);
            elem.disp_str=dumped[4];
            return JSON.stringify(dumped);
        } else // normal case
            return elem.disp_str= count<=MARK_THRESHOLD ? elem.orig_str : make_mark(elem.str,count);
    }
    
    function dispval(dm) {
        return Math.sqrt(dm.disp_str.length)*Math.pow(Math.min(dm.size/25,2.5),1.5);
    }

    function trim_pinyin(s) {
        return Array.from(s.toLowerCase()).map(function(c) {
            return PINYIN_TABLE[c] || c;
        }).join('');
    }

    var parser=new DOMParser();
    var new_dom=parser.parseFromString('<i></i>','text/xml');
    var i_elem=new_dom.childNodes[0];
    
    function apply_danmu(elem,desc,peers,dispstr) {
        S.onscreen++;
        i_elem.appendChild(elem);
        D.push({
            text: dispstr || elem.textContent,
            desc: desc,
            xml_src: elem.outerHTML,
            peers: peers || []
        });
    }
    
    // easter egg for eriri
    (function(date) {
        if(_ADVANCED_USER && !TEST_MODE && 1+date.getMonth()==3 && date.getDate()==20) {
            // 皮这么一下很开心
            var d=new_dom.createElement('d');
            var tn=new_dom.createTextNode('/* 英梨梨生日快乐 */');
            var attr=['0','8','0','11135770',Math.floor((+new Date())/1000),'0','91d6b7d0','0'];
            var peer={
                attr: attr,
                time: 0,
                orig_str: '英梨梨是我的，你们都不要抢。',
                mode: '8',
                reason: 'PAKKU'
            }
            d.appendChild(tn);
            d.setAttribute('p',attr.join(','));
            apply_danmu(
                d,
                ['3月20日是知名同人画师柏木英理（澤村・スペンサー・英梨々，泽村·斯潘塞·英梨梨）的生日。'],
                Array(20).fill(peer)
            );
            S.onscreen--; // it should not be counted
        }
    })(new Date());

    // load danmus
    var danmus=[],out_danmus=[];
    [].slice.call(dom.childNodes[0].children).forEach(function(elem) {
        if(elem.tagName==='d') { // danmu
            S.total++;

            var attr=elem.attributes['p'].value.split(',');
            var str=elem.childNodes[0] ? elem.childNodes[0].data : '';
            var mode=attr[1];
            var disp_str=mode==='7' ? ext_special_danmu(str) : str.replace(/\/n/g,'');   
            var detaolued=detaolu(disp_str);
            var str_pinyin=TRIM_PINYIN ? trim_pinyin(detaolued) : null;

            var dm_obj={
                attr: attr, // thus we can build it into new_dom again
                str: detaolued, // used when count>1
                orig_str: str, // used when count==1 and for special danmus
                disp_str: disp_str, // will be overrode by build_text

                str_pinyin: str_pinyin, // used to compare similarity
                str_2gram: gen_2gram_array(str),
                
                time: parseFloat(attr[0]),
                mode: mode,
                size: parseFloat(attr[2]),
                desc: [], // for D
                peers: [],

                self_dispval: null
            };

            if(!PROC_POOL1 && attr[5]==='1') {
                S.batch_ignore++;
                apply_danmu(elem,['已忽略字幕弹幕，可以在选项中修改'],[make_peers_node(dm_obj,'IGN')],disp_str);
                return;
            }
            if(mode!=='8' && mode !== '9' && blacklisted(disp_str)) {
                S.blacklist++;
                return;
            }
            if(!PROC_TYPE7 && mode==='7') { // special danmu
                S.batch_ignore++;
                apply_danmu(elem,['已忽略特殊弹幕，可以在选项中修改'],[make_peers_node(dm_obj,'IGN')],disp_str);
                return;
            }
            if(!PROC_TYPE4 && mode==='4') { // bottom danmu
                S.batch_ignore++;
                apply_danmu(elem,['已忽略底部弹幕，可以在选项中修改'],[make_peers_node(dm_obj,'IGN')],disp_str);
                return;
            }
            if(mode==='8') { // code danmu
                if(REMOVE_SEEK && str.indexOf('Player.seek(')!==-1) {
                    S.player_seek++;
                    elem.childNodes[0].data='/*! 已删除跳转脚本: '+str.replace(/\//g,'|')+' */';
                }
                S.script++;
                apply_danmu(elem,['代码弹幕'],[make_peers_node(dm_obj,'IGN')]);
                return;
            }
            if(mode==='9') { // bas danmu
                S.script++;
                apply_danmu(elem,['BAS弹幕'],[make_peers_node(dm_obj,'IGN')]);
                return;
            }
            if(whitelisted(disp_str)) {
                S.whitelist++;
                apply_danmu(elem,['命中白名单'],[make_peers_node(dm_obj,'IGN')],disp_str);
                return;
            }
            // finaly,
            danmus.push(dm_obj);
            return;
        } else // not danmu
            i_elem.appendChild(elem);
    });
    danmus.sort(function(x,y) {return x.time-y.time;});

    // iterate through danmus to combine similar ones
    var danmu_chunk=Array();
    
    danmus.forEach(function(dm) {
        while(danmu_chunk.length && dm.time-danmu_chunk[0].time>THRESHOLD)
            out_danmus.push(danmu_chunk.shift());
        
        if(LOG_VERBOSE)
            console.log(dm.attr[7],dm.str);
        for(var i=0;i<danmu_chunk.length;i++) {
            var another=danmu_chunk[i];
            if(!CROSS_MODE && dm.mode!=another.mode) continue;
            var sim=similar_memorized(
                dm.str, another.str,
                dm.str_2gram, another.str_2gram,
                dm.str_pinyin, another.str_pinyin,
                S
            );
            if(sim!==false) { // do combine
                if(LOG_VERBOSE) {
                    console.log(sim,dm.attr[7],'to',another.attr[7]);
                }
                another.peers.push(make_peers_node(dm,sim));
                if(MODE_ELEVATION && (
                    (dm.mode=='4' && (another.mode=='5' || another.mode=='1')) ||
                    (dm.mode=='5' && another.mode=='1')
                )) {
                    another.mode=dm.mode;
                }
                return; // aka continue
            }
        }
        dm.peers.push(make_peers_node(dm,'ORIG'));
        danmu_chunk.push(dm);
    });
    for(var i=0;i<danmu_chunk.length;i++)
        out_danmus.push(danmu_chunk[i]);

    // apply representative if is not the first one
    if(REPRESENTATIVE_PERCENT!=0)
        out_danmus.forEach(function(dm) {
            if(dm.peers.length) {
                var representative=dm.peers[
                    Math.min(Math.floor(dm.peers.length*REPRESENTATIVE_PERCENT/100),dm.peers.length-1)
                ];
                dm.time=representative.time;
                dm.attr=representative.attr;
                dm.mode=representative.mode;
            }
        });

    // process SHRINK and ENLARGE
    var out_danmus_len=out_danmus.length,dispval_base=Math.sqrt(DISPVAL_THRESHOLD);
    var chunkl=0,chunkr=0,chunkval=0;
    out_danmus.forEach(function(dm) {
        while(chunkr<out_danmus_len && out_danmus[chunkr].time-dm.time<SHRINK_TIME_THRESHOLD) {
            var dmr=out_danmus[chunkr];
            if(ENLARGE) {
                var enlarge_rate=enlarge(dmr.peers.length);
                if(enlarge_rate>1.0001)
                    dmr.desc.push('已放大 '+enlarge_rate.toFixed(2)+' 倍：合并数量为 '+(dmr.peers.length));
                dmr.size*=enlarge_rate;
            }
            chunkval+=(dmr.self_dispval=dispval(dmr));
            chunkr++;
        }
        while(dm.time-out_danmus[chunkl].time>SHRINK_TIME_THRESHOLD) {
            chunkval-=out_danmus[chunkl].self_dispval;
            chunkl++;
        }
        S.maxdispval=Math.max(S.maxdispval,chunkval);
        
        if(SHRINK) {
            if(LOG_DISPVAL) {
                var prefix=chunkval.toFixed(0)+' ['+dm.self_dispval.toFixed(0)+'] ';
                dm.str=prefix+dm.str;
                dm.orig_str=prefix+dm.orig_str;
            }
            
            if(chunkval>DISPVAL_THRESHOLD) {
                if(LOG_VERBOSE)
                    console.log('time',dm.time,'val',chunkval,'rate',Math.sqrt(chunkval)/dispval_base);
                S.shrink++;
                var shrink_rate=Math.min(Math.sqrt(chunkval)/dispval_base,2);
                dm.size/=shrink_rate;
                dm.desc.push('已缩小 '+shrink_rate.toFixed(2)+' 倍：弹幕密度为 '+chunkval.toFixed(1));
            }
        }
    });
    
    // process other stuffs and apply them
    out_danmus.forEach(function(dm) {
        S.maxcombo=Math.max(S.maxcombo,dm.peers.length);
        
        if(HIDE_THRESHOLD && HIDE_THRESHOLD<dm.peers.length) {
            S.count_hide+=1;
            return; // aka continue
        }

        var d=new_dom.createElement('d');
        var tn=new_dom.createTextNode(build_text(dm));
        d.appendChild(tn);
        
        var attr=dm.attr.slice();
        attr[1]=dm.mode;
        if(SCROLL_THRESHOLD && (attr[1]==='4'||attr[1]==='5')) {
            var width=get_width_if_exceeds(dm.disp_str,dm.size,SCROLL_THRESHOLD);
            if(width>SCROLL_THRESHOLD) {                
                dm.desc.push('转换为滚动弹幕：宽度为 '+Math.floor(width)+' px');
                tn.textContent=dm.disp_str=(attr[1]==='4'?'↓':'↑')+dm.disp_str;
                attr[1]='1';
                S.scroll+=1;
            }
        }
        attr[2]=Math.ceil(dm.size);
        d.setAttribute('p',attr.join(','));
        
        if(dm.mode===7)
            dm.disp_str=dm.disp_str.replace(/\/n/g,'');
        
        apply_danmu(d,dm.desc,dm.peers,dm.disp_str);
    });
    
    console.timeEnd('parse');
    
    if(!REMOVE_SEEK && S.player_seek==0) S.player_seek='';
    if(PROC_TYPE7 && PROC_TYPE4 && PROC_POOL1 && S.batch_ignore==0) S.batch_ignore='';
    if(!ENLARGE && S.enlarge==0) S.enlarge='';
    if(!SHRINK && S.shrink==0) S.shrink='';
    if(!SHRINK && S.maxdispval==0) S.maxdispval='';
    if(!HIDE_THRESHOLD && S.count_hide==0) S.count_hide='';
    if(!SCROLL_THRESHOLD && S.scroll==0) S.scroll='';
    if(!BLACKLIST_len && S.blacklist==0) S.blacklist='';
    if(!WHITELIST_len && S.whitelist==0) S.whitelist='';
    if(!FORCELIST_len && S.taolu==0) S.taolu='';
    
    var serializer=new XMLSerializer();
    return serializer.serializeToString(new_dom);
}
