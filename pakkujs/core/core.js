// (C) 2017 @xmcp. THIS PROJECT IS LICENSED UNDER GPL VERSION 3. SEE `LICENSE.txt`.

var LOG_VERBOSE=false;
var LOG_DISPVAL=false;

var DISPVAL_THRESHOLD=70,SHRINK_TIME_THRESHOLD=3;

var ENDING_CHARS=gen_set('.。,，/?？!！…~～@^、+=-_♂♀ ');
var trim_space_re=/[ 　]+/g;
var WIDTH_TABLE={};

(function() {
    var before='　１２３４５６７８９０!＠＃＄％＾＆＊（）－＝＿＋［］｛｝;＇:＂,．／＜＞?＼｜｀～ｑｗｅｒｔｙｕｉｏｐａｓｄｆｇｈｊｋｌｚｘｃｖｂｎｍＱＷＥＲＴＹＵＩＯＰＡＳＤＦＧＨＪＫＬＺＸＣＶＢＮＭ';
    var after=' 1234567890！@#$%^&*()-=_+[]{}；\'："，./<>？\\|`~qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    if(before.length !== after.length) throw 1;
    for(var i=0;i<before.length;i++)
        WIDTH_TABLE[before[i]]=after[i];
})();

function parse(dom,tabid,S,D) {
    TAOLUS_len=TAOLUS.length;
    WHITELIST_len=WHITELIST.length;
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
        if(count<=10)
            return 1;
        else {
            S.enlarge++;
            return Math.log10(count);
        }
    }
    
    // https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript
    var _get_width_cvs=document.createElement('canvas');
    function get_width(text,size) {
        var ctx=_get_width_cvs.getContext('2d');
        ctx.font=parseInt(size)+'pt 黑体';
        return ctx.measureText(text).width;
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
        
        for(var i=0;i<TAOLUS_len;i++)
            if(TAOLUS[i][0].test(text)) {
                S.taolu++;
                return TAOLUS[i][1];
            }
        return text;
    }
    
    function whitelisted(text) {
        for(var i=0;i<WHITELIST_len;i++)
            if(WHITELIST[i][0].test(text))
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
        return text.replace(/\/n/g,''); // remove "/n"
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
    
    function dispval(str) {
        return Math.sqrt(str.length);
    }

    var parser=new DOMParser();
    var new_dom=parser.parseFromString('<i></i>','text/xml');
    var i_elem=new_dom.childNodes[0];
    
    function apply_danmu(elem,desc,peers,dispstr) {
        i_elem.appendChild(elem);
        D.push({
            text: dispstr || elem.textContent,
            desc: desc,
            peers: peers || []
        });
    }
    
    var danmus=[],out_danmus=[];
    [].slice.call(dom.childNodes[0].children).forEach(function(elem) {
        if(elem.tagName=='d') { // danmu
            var attr=elem.attributes['p'].value.split(',');
            var str=elem.childNodes[0] ? elem.childNodes[0].data : '';
            var mode=attr[1];

            if(mode!=='8' && blacklisted(str)) {
                S.blacklist++;
                return; // aka continue
            }
            
            if(!PROC_TYPE7 && mode=='7') { // special danmu
                S.type7++;
                apply_danmu(elem,['已忽略特殊弹幕，可以在选项中修改']);
            } else if(!PROC_TYPE4 && mode=='4') { // bottom danmu
                S.type4++;
                apply_danmu(elem,['已忽略底部弹幕，可以在选项中修改']);
            } else if(mode=='8') { // code danmu
                if(REMOVE_SEEK && str.indexOf('Player.seek(')!=-1) {
                    S.player_seek++;
                    elem.childNodes[0].data='/*! 已删除跳转脚本: '+str.replace(/\//g,'|')+' */';
                }
                S.script++;
                apply_danmu(elem,['已忽略代码弹幕']);
            } else if(whitelisted(str)) {
                S.whitelist++;
                apply_danmu(elem,['命中白名单']);
            } else {
                var disp_str=mode=='7' ? ext_special_danmu(str) : str;
                danmus.push({
                    attr: attr, // thus we can build it into new_dom again
                    str: detaolu(disp_str),
                    orig_str: str,
                    disp_str: disp_str,
                    time: parseFloat(attr[0]),
                    mode: mode,
                    size: parseFloat(attr[2]),
                    desc: [], // for D
                    peers: []
                });
            }
        } else // not danmu
            i_elem.appendChild(elem);
    });
    danmus.sort(function(x,y) {return x.time-y.time;});

    var danmu_chunk=Array();
    var last_time=0;
    var counter=0;

    danmus.forEach(function(dm) {
        while(danmu_chunk.length && dm.time-danmu_chunk[0].time>THRESHOLD)
            out_danmus.push(danmu_chunk.shift());
        
        if(LOG_VERBOSE)
            console.log(dm.attr[7],dm.str);
        for(var i=0;i<danmu_chunk.length;i++) {
            var sim=similar(dm.str,danmu_chunk[i].str,S);
            if(sim) {
                if(LOG_VERBOSE) {
                    console.log(sim,dm.attr[7],'to',danmu_chunk[i].attr[7]);
                }
                danmu_chunk[i].peers.push(make_peers_node(dm,sim));
                return; // aka continue
            }
        }
        dm.peers.push(make_peers_node(dm,'ORIG'));
        danmu_chunk.push(dm);
    });
    for(var i=0;i<danmu_chunk.length;i++)
        out_danmus.push(danmu_chunk[i]);

    var last_log_dispval_time=-100;
    if(SHRINK) {
        var out_danmus_len=out_danmus.length,dispval_base=Math.sqrt(DISPVAL_THRESHOLD);
        var chunkl=0,chunkr=0,chunkval=0;
        out_danmus.forEach(function(dm) {
            while(dm.time-out_danmus[chunkl].time>SHRINK_TIME_THRESHOLD) {
                chunkval-=dispval(danmus[chunkl].str);
                chunkl++;
            }
            while(chunkr<out_danmus_len && out_danmus[chunkr].time-dm.time<SHRINK_TIME_THRESHOLD) {
                chunkval+=dispval(danmus[chunkr].str);
                chunkr++;
            }
            S.maxdispval=Math.max(S.maxdispval,chunkval);
            
            if(LOG_DISPVAL)
                if(dm.time-last_log_dispval_time>=.25) {
                    var rate=1/(chunkval>DISPVAL_THRESHOLD?Math.min(Math.sqrt(chunkval)/dispval_base,2):1);
                    var logger=new_dom.createElement('d');
                    
                    // type=7(SPECIAL) size=50px color=0xFFFF00
                    logger.setAttribute('p',dm.time+',7,50,16776960,0,0,0,0');
                    // pos=(0,50%)->(0,50%) alpha=1->0 keep_time=0.8s
                    logger.textContent=
                        '[0,0,"1-0",0.8,'+
                        '" dispval '+chunkval.toFixed(1)+'/n size '+rate.toFixed(2)+'"'+
                        ',0,0.5,0,0.5,0,0,true,"Consolas",1]';
                    
                    apply_danmu(logger,['LOG_DISPVAL helper'],[]);
                    last_log_dispval_time=dm.time;
                }
            
            if(chunkval>DISPVAL_THRESHOLD) {
                if(LOG_VERBOSE)
                    console.log('time',dm.time,'val',chunkval,'rate',Math.sqrt(chunkval)/dispval_base);
                S.shrink++;
                var shrink_rate=Math.min(Math.sqrt(chunkval)/dispval_base,2);
                dm.size/=shrink_rate;
                dm.desc.push('已缩小 '+shrink_rate.toFixed(2)+' 倍：弹幕密度为 '+chunkval.toFixed(1));
            }
        });        
    }
    
    out_danmus.forEach(function(dm) {
        counter+=dm.peers.length-1;
        S.maxcombo=Math.max(S.maxcombo,dm.peers.length);
        
        if(HIDE_THRESHOLD && HIDE_THRESHOLD<dm.peers.length) {
            S.count_hide+=1;
            counter+=1;
            return; // aka continue
        }
        
        var d=new_dom.createElement('d');
        var tn=new_dom.createTextNode(build_text(dm));
        d.appendChild(tn);
        
        if(ENLARGE) {
            var enlarge_rate=enlarge(dm.peers.length);
            if(enlarge_rate>1.0001)
                dm.desc.push('已放大 '+enlarge_rate.toFixed(2)+' 倍：合并数量为 '+(dm.peers.length));
            dm.size*=enlarge_rate;
        }
        
        var attr=dm.attr.slice();
        if(SCROLL_THRESHOLD && (attr[1]=='4'||attr[1]=='5')) {
            var width=get_width(dm.disp_str,dm.size);
            if(width>SCROLL_THRESHOLD) {                
                dm.desc.push('转换为滚动弹幕：宽度为 '+Math.floor(width)+' px');
                tn.textContent=dm.disp_str=(attr[1]=='4'?'↓':'↑')+dm.disp_str;
                attr[1]='1';
                S.scroll+=1;
            }
        }
        attr[2]=Math.ceil(dm.size);
        d.setAttribute('p',attr.join(','));
        
        if(dm.mode==7)
            dm.disp_str=dm.disp_str.replace(/\/n/g,'');
        
        apply_danmu(d,dm.desc,dm.peers,dm.disp_str);
    });
    
    console.timeEnd('parse');
    
    S.total=danmus.length+S.blacklist;
    S.onscreen=danmus.length-counter;
    
    if(!REMOVE_SEEK && S.player_seek==0) S.player_seek='已禁用';
    if(PROC_TYPE7 && S.type7==0) S.type7='已禁用';
    if(PROC_TYPE4 && S.type4==0) S.type4='已禁用';
    if(!ENLARGE && S.enlarge==0) S.enlarge='已禁用';
    if(!SHRINK && S.shrink==0) S.shrink='已禁用';
    if(!SHRINK && S.maxdispval==0) S.maxdispval='已禁用';
    if(!HIDE_THRESHOLD && S.count_hide==0) S.count_hide='已禁用';
    if(!SCROLL_THRESHOLD && S.scroll==0) S.scroll='已禁用';
    
    var serializer=new XMLSerializer();
    return serializer.serializeToString(new_dom);
}
