// (C) 2017 @xmcp. THIS PROJECT IS LICENSED UNDER GPL VERSION 3. SEE `LICENSE.txt`.

var trim_ending_re=/^(.+?)[\.。,，/\?？!！~～@\^、+=\-_♂♀ ]*$/;
var trim_space_re=/[ 　]/g;

function parse(dom,tabid) {
    chrome.browserAction.setTitle({
        title: '正在处理弹幕…', // if u can see this, pakku might not be working correctly :)
        tabId: tabid
    });
    
    console.time('parse');
    
    function make_mark(txt,cnt) {
        return DANMU_MARK=='suffix' ? txt+' [x'+cnt+']' :
               DANMU_MARK=='prefix' ? '[x'+cnt+'] '+txt : txt;
    }
    
    function detaolu(text) {
        for(var i in TAOLUS)
            if(TAOLUS[i][0].test(text))
                return TAOLUS[i][1];
        text = TRIM_ENDING ? text.replace(trim_ending_re,'$1') : text;
        text = TRIM_SPACE ? text.replace(trim_space_re,'') : text;
        return text;
    }
    
    function whitelisted(text) {
        for(var i in WHITELIST)
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
    
    function build_text(elem,text,count) {
        var dumped=null;
        if(elem.mode=='7') // special danmu, need more parsing
            try {
                dumped=JSON.parse(elem.orig_str);
            } catch(e) {}
        
        if(dumped) {
            dumped[4]=count==1?text:make_mark(text,count);
            return JSON.stringify(dumped);
        } else // normal case
            return count==1?elem.orig_str:make_mark(text,count);
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
            else if(attr[1]=='8') { // code danmu
                if(REMOVE_SEEK && str.indexOf('Player.seek(')!=-1)
                    elem.childNodes[0].data='/* player.seek filtered by pakku */';
                i_elem.appendChild(elem);
            } else if(whitelisted(str)) {
                i_elem.appendChild(elem);
            } else
                danmus.push({
                    attr: attr, // thus we can build it into new_dom again
                    str: attr[1]=='7' ? ext_special_danmu(str) : detaolu(str),
                    time: parseFloat(attr[0]),
                    orig_str: str,
                    mode: attr[1]
                });
        } else
            i_elem.appendChild(elem);
    });
    danmus.sort(function(x,y) {return x.time-y.time;});

    var danmu_hist=new Map();
    var bk=new BKTree(), bk_buf=new BKTree(); // double buffer
    var last_time=0;

    danmus.forEach(function(dm) {
        var time=dm.time;
        var str=dm.str;

        if (time-last_time>THRESHOLD) { // swap buffer
            bk=bk_buf;
            bk_buf=new BKTree();
            last_time=time;
        }

        var res=bk.find(str,time-THRESHOLD);

        if (res==null) {
            var node=bk.insert(str,time);
            danmu_hist.set(node,[dm]);
            var node_buf=bk_buf.insert(str,time);
            danmu_hist.set(node_buf,[]);
        } else {
            danmu_hist.get(res).push(dm);

            var res_buf=bk_buf.find(str,time-THRESHOLD);

            if (res_buf==null) {
                var node=bk_buf.insert(str,time);
                danmu_hist.set(node,[]);
            }
        }
    });

    var counter=0;

    danmu_hist.forEach(function(value,key) {
        if (!value.length) return; // dummy node

        var len=0, last_time=value[0].time;
        for (var i=1; i<value.length; i++)
            if(value[i].time-last_time<THRESHOLD)
                len++;
            else {
                counter+=len-1;
                var d=new_dom.createElement('d');
                var tn=new_dom.createTextNode(build_text(value[i-1],key.val,len));

                d.appendChild(tn);
                d.setAttribute('p',value[i-1].attr.join(','));
                i_elem.appendChild(d);

                last_time=value[i].time;
                len=0;
            }

        counter+=len-1;
        var d=new_dom.createElement('d');
        var tn=new_dom.createTextNode(build_text(value[i-1],key.val,len));

        d.appendChild(tn);
        d.setAttribute('p',value[i-1].attr.join(','));
        i_elem.appendChild(d);
    });

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
