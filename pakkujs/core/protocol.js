// 2017-2022 @xmcp. THIS PROJECT IS LICENSED UNDER GPL VERSION 3. SEE `LICENSE.txt`.

var proto_seg=protobuf.roots.default.bilibili.community.service.dm.v1.DmSegMobileReply;
var proto_view=protobuf.roots.default.bilibili.community.service.dm.v1.DmWebViewReply;

function xml_to_ir(xmlstr) {
    var dom=parse_xml_magic(xmlstr);
    var res=[];
    var conf={};
    [].slice.call(dom.childNodes[0].children).forEach(function(elem) {
        if(elem.tagName==='d') { // danmu
            var attr=elem.attributes['p'].value.split(',');
            var str=elem.childNodes[0] ? elem.childNodes[0].data : '';
            res.push({
                "time_ms": Math.floor(parseFloat(attr[0])*1000),
                "mode": parseInt(attr[1]),
                "fontsize": parseFloat(attr[2]),
                "color": parseInt(attr[3]),
                "sender_hash": attr[6],
                "content": str,
                "sendtime": parseInt(attr[4]),
                "weight": 10, // not present in xml so fake max weight
                "id": attr[7],
                "pool": parseInt(attr[5]),
                "extra": {},
            });
        } else { // conf
            conf[elem.tagName]=elem.childNodes[0].data;
        }
    });
    return {
        danmakus: res,
        cid: conf.chatid,
        maxlimit: conf.maxlimit,
    };
}

function protobuf_to_ir(chunks,cid) {
    var res=[];
    chunks.forEach(function(chunk) {
        var segidx = chunk[0];
        chunk[1].forEach(function(item) {
            res.push({
                "time_ms": item.stime,
                "mode": item.mode,
                "fontsize": item.size,
                "color": item.color,
                "sender_hash": item.uhash,
                "content": item.text,
                "sendtime": item.date,
                "weight": item.weight,
                "id": item.dmid,
                "pool": item.pool,
                "extra": {
                    "proto_segidx": segidx,
                    "proto_attr": item.attr,
                    "proto_action": item.action,
                    "proto_animation": item.animation,
                },
            });
        });
    });
    //console.log('!! protobuf to ir', chunks, res);
    return {
        danmakus: res,
        cid: cid,
        maxlimit: res.length+1, // fake something here as we don't know
    };
}

function ir_to_xml(ir) {
    var parser=new DOMParser();
    var dom_str='<i><chatserver>chat.bilibili.com</chatserver><chatid>{{CID}}</chatid><mission>0</mission><maxlimit>{{MAXLIMIT}}</maxlimit><state>0</state><real_name>0</real_name></i>';
    dom_str=dom_str.replace('{{CID}}',ir.cid).replace('{{MAXLIMIT}}',ir.maxlimit);
    var dom=parser.parseFromString(dom_str,'text/xml');
    var i_elem=dom.childNodes[0];

    ir.danmakus.forEach(function(d) {
        var elem=dom.createElement('d');
        var tn=dom.createTextNode(d.content);
        var attr=[
            d.time_ms/1000, // 0
            d.mode, // 1
            d.fontsize, // 2
            d.color, // 3
            d.sendtime, // 4
            d.pool, // 5
            d.sender_hash, // 6
            d.id, // 7
        ];
        elem.appendChild(tn);
        elem.setAttribute('p',attr.join(','));
        i_elem.appendChild(elem);
    });
    console.log('ir to xml: len', ir.danmakus.length);
    
    var serializer=new XMLSerializer();
    return serializer.serializeToString(dom);
}

function ir_to_protobuf(ir, filter_fn) {
    var res=[];
    ir.danmakus.forEach(function(item) {
        if(filter_fn(item))
            res.push({
                "stime": item.time_ms,
                "mode": item.mode,
                "size": item.fontsize,
                "color": item.color,
                "uhash": item.sender_hash,
                "text": item.content,
                "date": item.sendtime,
                "weight": item.weight,
                "dmid": item.id,
                "attr": item.extra.proto_attr,
                "action": item.extra.proto_action,
                "animation": item.extra.proto_animation,
                "colorful": 0,
            });
    });
    console.log('ir to protobuf: ', ir, 'with len', res.length);
    var res_uint8arr=proto_seg.encode(proto_seg.create({elems: res})).finish();
    return res_uint8arr;
}

// used for #segment>1 requests
function empty_danmaku_proto_seg() {
    return ir_to_protobuf({
        danmakus: [],
        cid: -1,
        maxlimit: 0,
    });
}

window.protoapi_img_url = null;
window.protoapi_sub_url = null;

function protoapi_sign_req(e) {
    var static_img_url = "https://i0.hdslb.com/bfs/wbi/5a6f002d0bb14fc9848fc64157648ad4.png";
    var static_sub_url = "https://i0.hdslb.com/bfs/wbi/0503a77b29d7409d9548fb44fe9daa1a.png";

    e.web_location = 1315873;
    var t = window.protoapi_img_url || static_img_url;
    var r = window.protoapi_sub_url || static_sub_url;

    var n = function(e) {
        var t = [];
        return [46, 47, 18, 2, 53, 8, 23, 32, 15, 50, 10, 31, 58, 3, 45, 35, 27, 43, 5, 49, 33, 9, 42, 19, 29, 28, 14, 39, 12, 38, 41, 13, 37, 48, 7, 16, 24, 55, 40, 61, 26, 17, 0, 1, 60, 51, 30, 4, 22, 25, 54, 21, 56, 59, 6, 63, 57, 62, 11, 36, 20, 34, 44, 52].forEach((function(r) {
            e.charAt(r) && t.push(e.charAt(r))
        }
        )),
        t.join("").slice(0, 32)
    }(t.substring(t.lastIndexOf("/") + 1, t.length).split(".")[0] + r.substring(r.lastIndexOf("/") + 1, r.length).split(".")[0]);
    var i = Math.round(Date.now() / 1e3);
    var o = Object.assign({}, e, {
        wts: i
    });
    var a = Object.keys(o).sort();
    var s = [];
    for (var c = 0; c < a.length; c++) {
        var p = a[c], h = o[p];
        null != h && s.push("".concat(encodeURIComponent(p), "=").concat(encodeURIComponent(h)))
    }
    var y = s.join("&");
    var m = md5(y + n);
    return Object.assign(e, {
        w_rid: m,
        wts: i.toString()
    });
}

function protoapi_get_view(cid,pid) { // return page count
    return new Promise(function(resolve,reject) {
        var xhr=new XMLHttpRequest();
        xhr.open('get',add_pakku_fingerprint('https://api.bilibili.com/x/v2/dm/web/view?type=1&oid='+encodeURIComponent(cid)+'&pid='+encodeURIComponent(pid)),true);
        xhr.responseType='arraybuffer';
        xhr.addEventListener('load',function() {
            let d=proto_view.decode(new Uint8Array(xhr.response));
            //console.log('!! dm view', d);
            if(d.dmSge.total && d.dmSge.total<100)
                resolve(d.dmSge.total);
            else
                resolve(null);
        });
        xhr.addEventListener('error',reject);
        xhr.send();
    });
}

function protobuf_get_url(url) {
    return new Promise(function(resolve,reject) {
        var xhr=new XMLHttpRequest();
        xhr.open('get',add_pakku_fingerprint(url),true);
        xhr.responseType='arraybuffer';
        xhr.addEventListener('load',function() {
            try {
                let d=proto_seg.decode(new Uint8Array(xhr.response));
                resolve(d.elems);
            } catch(e) {
                console.error('cannot parse protobuf dm', e);
                reject(e);
            }
        });
        xhr.addEventListener('error',reject);
        xhr.send();
    });
}

function protoapi_get_seg(cid,pid,segidx) { // return dm list
    return new Promise(function(resolve,reject) {
        var param=protoapi_sign_req({
            'type': '1',
            'oid': cid,
            'pid': pid,
            'segment_index': segidx,
        });
        var param_list = [];
        for (var key in param) {
            param_list.push(key + '=' + encodeURIComponent(param[key]));
        }
        var param_str = param_list.join('&');

        protobuf_get_url('https://api.bilibili.com/x/v2/dm/wbi/web/seg.so?'+param_str)
            .then(function(ret) {
                resolve([segidx, ret]);
            })
            .catch(reject);
    });
}

function protoapi_get_segs(cid,pid,pages,first_chunk_req) { // -> [[1, [...]], [2, [...]], ...]
    if(pages) {
        console.log('protobuf api: total',pages,'pages');
        var req=[first_chunk_req];
        for(var i=2;i<=pages;i++)
            req.push(protoapi_get_seg(cid,pid,i));
        return Promise.all(req);
    } else { // guess page numbers
        console.log('protobuf api: guessing page');
        return new Promise(function(resolve,reject) {
            var req=[first_chunk_req, protoapi_get_seg(cid,pid,2), protoapi_get_seg(cid,pid,3)];
            var res=[];
            function work(idx) {
                req.shift()
                    .then(function(chunk) {
                        if(chunk[1].length) {
                            res.push(chunk);
                            req.push(protoapi_get_seg(cid,pid,idx+3));
                            work(idx+1);
                        } else {
                            req.shift()
                                .then(function(chunk) {
                                    if(chunk[1].length) {
                                        res.push(chunk);
                                        req.push(protoapi_get_seg(cid,pid,idx+3));
                                        req.push(protoapi_get_seg(cid,pid,idx+4));
                                        work(idx+2);
                                    } else { // completed
                                        console.log('protobuf api: ASSUMING total',idx-1,'pages');
                                        resolve(res);
                                    }
                                })
                                .catch(reject);
                        }
                    })
                    .catch(reject);
            }
            work(1);
        });
    }
}
