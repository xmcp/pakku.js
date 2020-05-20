var proto_seg=protobuf.roots.default.bilibili.community.service.dm.v1.DmSegMobileReply;

function xml_to_proto_seg(dom) {
    console.log('protobuf: converting xml to seg');
    var res=[];
    [].slice.call(dom.childNodes[0].children).forEach(function(elem) {
        if(elem.tagName==='d') { // danmu
            var attr=elem.attributes['p'].value.split(',');
            var str=elem.childNodes[0] ? elem.childNodes[0].data : '';
            res.push({
                "id": parseInt(attr[7]), // fixme: this is actually not present in xml responses
                "progress": Math.floor(parseInt(attr[0])*1000),
                "mode": parseInt(attr[1]),
                "fontsize": parseInt(parseInt(attr[2])),
                "color": parseInt(attr[3]),
                "midHash": attr[6],
                "content": str,
                "ctime": parseInt(attr[4]),
                "weight": 10, // todo: switch to protobuf api and use real weight here
                "idStr": attr[7],
            });
        }
    });
    var res_uint8arr=proto_seg.encode(proto_seg.create({elems: res})).finish();
    return res_uint8arr;
}