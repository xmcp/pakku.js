// 2017-2020 @xmcp. THIS PROJECT IS LICENSED UNDER GPL VERSION 3. SEE `LICENSE.txt`.

var LOG_VERBOSE=false;
var LOG_DISPVAL=false;
var LOG_WEIGHT=false;

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

function parse(ir,tabid,S,D) {
    generate_ctx(tabid);

    FORCELIST_len=FORCELIST_ctx.length;
    WHITELIST_len=WHITELIST_ctx.length;
    BLACKLIST_len=BLACKLIST.length;
    
    var start_time=+new Date();
    
    function make_peers_node(obj,reason) {
        return {
            reason: reason,
            str: obj.str,
            ir_obj: obj.ir_obj,
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
        if(elem.mode===7) // special danmu, need more parsing
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

    var out_ir={
        danmakus: [],
        cid: ir.cid,
        maxlimit: ir.maxlimit,
    };
    
    function apply_danmu(elem,desc,peers,dispstr) {
        S.onscreen++;
        out_ir.danmakus.push(elem);
        D.push({
            text: dispstr || elem.content,
            desc: desc,
            peers: peers || [],
            ir_obj: elem, 
        });
    }

    // load danmus
    var danmus=[],out_danmus=[];
    ir.danmakus.forEach(function(elem) {
        S.total++;

        var str=elem.content;
        var mode=elem.mode;
        var disp_str=mode===7 ? ext_special_danmu(str) : str.replace(/\/n/g,'');   
        var detaolued=detaolu(disp_str);
        var str_pinyin=TRIM_PINYIN ? trim_pinyin(detaolued) : null;

        var dm_obj={
            str: detaolued, // used when count>1
            orig_str: str, // used when count==1 and for special danmus
            disp_str: disp_str, // will be overrode by build_text

            str_pinyin: str_pinyin, // used to compare similarity
            str_2gram: gen_2gram_array(detaolued),
            
            time: elem.time_ms/1000,
            mode: mode,
            size: elem.fontsize,
            desc: [], // for D
            peers: [],

            self_dispval: null,

            ir_obj: elem,
        };

        if(!PROC_POOL1 && elem.pool===1) {
            S.batch_ignore++;
            apply_danmu(elem,['已忽略字幕弹幕，可以在选项中修改'],[make_peers_node(dm_obj,'IGN')],disp_str);
            return;
        }
        if(mode!==8 && mode!==9 && blacklisted(disp_str)) {
            S.blacklist++;
            return;
        }
        if(!PROC_TYPE7 && mode===7) { // special danmu
            S.batch_ignore++;
            apply_danmu(elem,['已忽略特殊弹幕，可以在选项中修改'],[make_peers_node(dm_obj,'IGN')],disp_str);
            return;
        }
        if(!PROC_TYPE4 && mode===4) { // bottom danmu
            S.batch_ignore++;
            apply_danmu(elem,['已忽略底部弹幕，可以在选项中修改'],[make_peers_node(dm_obj,'IGN')],disp_str);
            return;
        }
        if(mode===8) { // code danmu
            if(REMOVE_SEEK && str.indexOf('Player.seek(')!==-1) {
                S.player_seek++;
                elem.content='/*! 已删除跳转脚本: '+str.replace(/\//g,'|')+' */';
            }
            S.script++;
            apply_danmu(elem,['代码弹幕'],[make_peers_node(dm_obj,'IGN')]);
            return;
        }
        if(mode===9) { // bas danmu
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
    });
    danmus.sort(function(x,y) {return x.time-y.time;});

    // iterate through danmus to combine similar ones
    var danmu_chunk=Array();
    
    danmus.forEach(function(dm) {
        while(danmu_chunk.length && dm.time-danmu_chunk[0].time>THRESHOLD)
            out_danmus.push(danmu_chunk.shift());
        
        if(LOG_VERBOSE)
            console.log(dm.ir_obj.id,dm.str);
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
                    console.log(sim,dm.ir_obj.id,'to',another.ir_obj.id);
                }
                another.peers.push(make_peers_node(dm,sim));
                if(MODE_ELEVATION && (
                    (dm.mode===4 && (another.mode===5 || another.mode===1)) ||
                    (dm.mode===5 && another.mode===1)
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
                dm.time=representative.ir_obj.time_ms/1000;
                dm.mode=representative.ir_obj.mode;
                dm.size=representative.ir_obj.fontsize;
                dm.ir_obj=representative.ir_obj;
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
            return; // continue
        }
        
        var outmode=dm.mode;

        // pick most frequent text
        if(outmode!=7 && dm.peers.length>=3) {
            var text_cnts={}, most_idx=0, most_cnt=-1;
            dm.peers.forEach(function(p,idx) {
                if(!text_cnts[p.str])
                    text_cnts[p.str]=0;
                
                if(++text_cnts[p.str]>most_cnt) {
                    most_cnt=text_cnts[p.str];
                    most_idx=idx;
                }
            });
            if(dm.peers[most_idx].str!=dm.str)
                dm.desc.push('采用第 '+(most_idx+1)+' 条文本：出现了 '+most_cnt+' 次');
            dm.str=dm.peers[most_idx].str;
        }

        var outtext=build_text(dm);

        // convert mode to scroll if too long
        if(SCROLL_THRESHOLD && (outmode===4||outmode===5)) {
            var width=get_width_if_exceeds(dm.disp_str,dm.size,SCROLL_THRESHOLD);
            if(width>SCROLL_THRESHOLD) {                
                dm.desc.push('转换为滚动弹幕：宽度为 '+Math.floor(width)+' px');
                outtext=dm.disp_str=(outmode===4?'↓':'↑')+dm.disp_str;
                outmode=1; // scroll
                S.scroll+=1;
            }
        }
        
        // `/n` text fix for special danmu
        if(dm.mode===7)
            dm.disp_str=dm.disp_str.replace(/\/n/g,'');

        // adjust weight
        var outweight=dm.ir_obj.weight;
        dm.peers.forEach(function(peer) {
            outweight=Math.max(outweight,peer.ir_obj.weight);
        });

        if(LOG_WEIGHT)
            outtext='[W'+outweight+'] '+outtext;
        
        apply_danmu({
            "id_protobuf_int": dm.ir_obj.id_protobuf_int,
            "time_ms": Math.floor(dm.time*1000),
            "mode": outmode,
            "fontsize": Math.ceil(dm.size),
            "color": dm.ir_obj.color,
            "sender_hash": dm.ir_obj.sender_hash,
            "content": outtext,
            "sendtime": dm.ir_obj.sendtime,
            "weight": outweight,
            "id": dm.ir_obj.id,
            "pool": dm.ir_obj.pool,
        },dm.desc,dm.peers,dm.disp_str);
    });
    
    S.parse_time_ms=(+new Date())-start_time;
    
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
    
    return out_ir;
}
