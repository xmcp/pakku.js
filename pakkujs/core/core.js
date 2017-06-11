// (C) 2017 @xmcp. THIS PROJECT IS LICENSED UNDER GPL VERSION 3. SEE `LICENSE.txt`.

var trim_ending_re=/^(.+?)[\.。,，/\?？!！~～@\^、+=\-_♂♀ ]*$/;
var trim_space_re=/[ 　]/g;
var LOG_VERBOSE=false;

function parse(dom,tabid) {
    TAOLUS_len=TAOLUS.length;
    WHITELIST_len=WHITELIST.length;
    
    chrome.browserAction.setTitle({
        title: '正在处理弹幕…', // if u can see this, pakku might not be working correctly :)
        tabId: tabid
    });
    
    console.time('parse');
    
    function enlarge(size,count) {
        return count<=10 ? size : Math.floor(size*Math.log10(count));
    }

    
    function make_mark(txt,cnt) {
        return DANMU_MARK=='suffix' ? txt+' [x'+cnt+']' :
               DANMU_MARK=='prefix' ? '[x'+cnt+'] '+txt : txt;
    }
    
    function detaolu(text) {
        for(var i=0;i<TAOLUS_len;i++)
            if(TAOLUS[i][0].test(text))
                return TAOLUS[i][1];
        text = TRIM_ENDING ? text.replace(trim_ending_re,'$1') : text;
        text = TRIM_SPACE ? text.replace(trim_space_re,'') : text;
        return text;
    }
    
    function whitelisted(text) {
        for(var i=0;i<WHITELIST_len;i++)
            if(WHITELIST[i][0].test(text))
                return true;
        return false;
    }
    
    function ext_special_danmu(text) {
        try {
            return JSON.parse(text)[4];
        } catch(e) {
            return text;
        }
    }
    
    function build_text(elem) {
        var count=elem.count;
        var dumped=null;
        if(elem.mode=='7') // special danmu, need more parsing
            try {
                dumped=JSON.parse(elem.orig_str);
            } catch(e) {}
        
        if(dumped) {
            dumped[4]=count==1?dumped[4]:make_mark(elem.str,count);
            return JSON.stringify(dumped);
        } else // normal case
            return count==1?elem.orig_str:make_mark(elem.str,count);
    }

    var parser=new DOMParser();
    var new_dom=parser.parseFromString('<i></i>','text/xml');
    var i_elem=new_dom.childNodes[0];

    var danmus=[];
    [].slice.call(dom.childNodes[0].children).forEach(function(elem) {
        if(elem.tagName=='d') { // danmu
            var attr=elem.attributes['p'].value.split(',');
            var str=elem.childNodes[0] ? elem.childNodes[0].data : '';

            if(!PROC_TYPE7 && attr[1]=='7') // special danmu
                i_elem.appendChild(elem);
            else if(!PROC_TYPE4 && attr[1]=='4') // bottom danmu
                i_elem.appendChild(elem);
            else if(attr[1]=='8') { // code danmu
                if(REMOVE_SEEK && str.indexOf('Player.seek(')!=-1)
                    elem.childNodes[0].data='/* player.seek filtered by pakku */';
                i_elem.appendChild(elem);
            } else if(whitelisted(str)) {
                i_elem.appendChild(elem);
            } else
                danmus.push({
                    attr: attr, // thus we can build it into new_dom again
                    str: attr[1]=='7' ? detaolu(ext_special_danmu(str)) : detaolu(str),
                    time: parseFloat(attr[0]),
                    orig_str: str,
                    mode: attr[1],
                    count: 1,
                });
        } else
            i_elem.appendChild(elem);
    });
    danmus.sort(function(x,y) {return x.time-y.time;});

    var danmu_chunk=Array();
    var last_time=0;
    var counter=0;

    function apply_item(dm) {
        counter+=dm.count-1;
        var d=new_dom.createElement('d');
        var tn=new_dom.createTextNode(build_text(dm));

        d.appendChild(tn);
        if(ENLARGE)
            dm.attr[2]=''+enlarge(parseInt(dm.attr[2]),dm.count);
        d.setAttribute('p',dm.attr.join(','));
        i_elem.appendChild(d);
    }
    
    danmus.forEach(function(dm) {
        while(danmu_chunk.length && dm.time-danmu_chunk[0].time>THRESHOLD)
            apply_item(danmu_chunk.shift());
        
        for(var i=0;i<danmu_chunk.length;i++) {
            if(similar(dm.str,danmu_chunk[i].str)) {
                if(LOG_VERBOSE) {
                    if(edit_distance(dm.str,danmu_chunk[i].str)>MAX_DIST)
                        console.log('cosine_dis',dm.str,'to',danmu_chunk[i].str);
                    else
                        console.log('edit_dis',dm.str,'to',danmu_chunk[i].str);
                }
                danmu_chunk[i].count++;
                return; // aka continue
            }
        }
        danmu_chunk.push(dm);
    });
    for(var i=0;i<danmu_chunk.length;i++)
        apply_item(danmu_chunk[i]);

    setbadge((
            POPUP_BADGE=='count' ? ''+counter :
            POPUP_BADGE=='percent' ? (danmus.length ? (counter*100/danmus.length).toFixed(0)+'%' : '0%') :
            ''
        ),SUCCESS_COLOR,tabid
    );
    chrome.browserAction.setTitle({
        title: '已过滤 '+counter+'/'+danmus.length+' 弹幕',
        tabId: tabid
    });
    var serializer=new XMLSerializer();
    console.timeEnd('parse');
    return serializer.serializeToString(new_dom);
}
