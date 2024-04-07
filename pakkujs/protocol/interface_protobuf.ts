import protogen from "./proto-bili-gen";
import md5 from "md5";
import {AnyObject, DanmuChunk, DanmuObject, int, MissingData} from "../core/types";

type proto_seg = protogen.bilibili.community.service.dm.v1.DmSegMobileReply;

let proto_seg = protogen.bilibili.community.service.dm.v1.DmSegMobileReply;
let proto_view = protogen.bilibili.community.service.dm.v1.DmWebViewReply;

export interface ProtobufIngressHistory {
    type: 'proto_history';
    url: string;
}

export interface ProtobufIngressSeg {
    type: 'proto_seg';
    is_magicreload: boolean;
    cid: string;
    pid: string;
    static_img_url: string | null;
    static_sub_url: string | null;
}

export interface ProtobufEgress {
    type: 'proto';
    segidx: number | null;
    ps: number | null;
    pe: number | null;
}

export function protobuf_to_obj(segidx: int, chunk: proto_seg): DanmuChunk<DanmuObject> {
    return {
        objs: chunk.elems.map((item): DanmuObject =>({
            'time_ms': item.stime!,
            'mode': item.mode!,
            'fontsize': item.size!,
            'color': item.color!,
            'sender_hash': item.uhash!,
            'content': item.text!,
            'sendtime': item.date!,
            'weight': item.weight!,
            'id': item.dmid!,
            'pool': item.pool!,
            'extra': {
                'proto_attr': item.attr,
                'proto_action': item.action,
                'proto_animation': item.animation,
                'proto_colorful': item.colorful,
                'proto_oid': item.oid,
            },
        })),
        extra: {
            'proto_segidx': segidx,
            'proto_colorfulsrc': chunk.colorfulSrc,
        },
    };
}

export function obj_to_protobuf(egress: ProtobufEgress, chunk: DanmuChunk<DanmuObject>): Uint8Array {
    let objs = chunk.objs;

    if(egress.ps || egress.pe) {
        let ps = egress.ps || 0;
        let pe = egress.pe || 999999999999;
        objs = objs.filter((item, idx) => ps<=item.time_ms && item.time_ms<pe);
    }

    let res = objs.map((item) => ({
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
        "action": item.extra.proto_action || null,
        "animation": item.extra.proto_animation || null,
        "colorful": item.extra.proto_colorful,
        "oid": item.extra.proto_oid,
    }));
    return proto_seg.encode({elems: res, colorfulSrc: chunk.extra.proto_colorfulsrc}).finish();
}

function protoapi_sign_req(e: AnyObject, protoapi_img_url: string | null, protoapi_sub_url: string | null): AnyObject {
    let static_img_url = "https://i0.hdslb.com/bfs/wbi/5a6f002d0bb14fc9848fc64157648ad4.png";
    let static_sub_url = "https://i0.hdslb.com/bfs/wbi/0503a77b29d7409d9548fb44fe9daa1a.png";

    e.web_location = 1315873;
    let t = protoapi_img_url || static_img_url;
    let r = protoapi_sub_url || static_sub_url;

    let n = function(e) {
        let t: any[] = [];
        // noinspection CommaExpressionJS
        return [46, 47, 18, 2, 53, 8, 23, 32, 15, 50, 10, 31, 58, 3, 45, 35, 27, 43, 5, 49, 33, 9, 42, 19, 29, 28, 14, 39, 12, 38, 41, 13, 37, 48, 7, 16, 24, 55, 40, 61, 26, 17, 0, 1, 60, 51, 30, 4, 22, 25, 54, 21, 56, 59, 6, 63, 57, 62, 11, 36, 20, 34, 44, 52].forEach((function(r) {
            e.charAt(r) && t.push(e.charAt(r))
        })),
        t.join("").slice(0, 32)
    }(t.substring(t.lastIndexOf("/") + 1, t.length).split(".")[0] + r.substring(r.lastIndexOf("/") + 1, r.length).split(".")[0]);
    let i = Math.round(Date.now() / 1e3);
    let o = Object.assign({}, e, {
        wts: i
    });
    let a = Object.keys(o).sort();
    let s = [];
    for(let c = 0; c < a.length; c++) {
        let p = a[c], h = o[p];
        null != h && s.push("".concat(encodeURIComponent(p), "=").concat(encodeURIComponent(h)))
    }
    let y = s.join("&");
    let m = md5(y + n);
    return Object.assign(e, {
        w_rid: m,
        wts: i.toString()
    });
}

async function protoapi_get_segcount(ingress: ProtobufIngressSeg): Promise<int | null> {
    let res = await fetch(
        `https://api.bilibili.com/x/v2/dm/web/view?type=1&oid=${encodeURIComponent(ingress.cid)}&pid=${encodeURIComponent(ingress.pid)}`,
        {credentials: 'include'}
    );
    let buffer = await res.arrayBuffer();
    let arr = new Uint8Array(buffer)

    if(process.env.PAKKU_CHANNEL==='firefox') {
        // have to clone this uint8array otherwise `arr instanceof Uint8Array` will be false
        // https://medium.com/@simonwarta/limitations-of-the-instanceof-operator-f4bcdbe7a400
        let arr2 = new Uint8Array(arr.byteLength);
        arr2.set(arr);
        arr = arr2;
    }

    let d = proto_view.decode(arr);
    console.log('pakku protobuf api: got view', d);

    if(d.dmSge && d.dmSge.total && d.dmSge.total < 200)
        return d.dmSge.total as int;
    else
        return null;
}

async function protoapi_get_url(url: string): Promise<proto_seg> {
    let res = await fetch(url, {credentials: 'include'});
    let buffer = await res.arrayBuffer();
    let arr = new Uint8Array(buffer);

    if(process.env.PAKKU_CHANNEL==='firefox') {
        // have to clone this uint8array otherwise `arr instanceof Uint8Array` will be false
        // https://medium.com/@simonwarta/limitations-of-the-instanceof-operator-f4bcdbe7a400
        let arr2 = new Uint8Array(arr.byteLength);
        arr2.set(arr);
        arr = arr2;
    }

    return proto_seg.decode(arr);
}

async function protoapi_get_seg(ingress: ProtobufIngressSeg, segidx: int): Promise<proto_seg> { // return dm list
    let param = protoapi_sign_req({
        'type': '1',
        'oid': ingress.cid,
        'pid': ingress.pid,
        'segment_index': segidx,
    }, ingress.static_img_url, ingress.static_sub_url);

    let param_list = [];
    for(let key in param) {
        param_list.push(key + '=' + encodeURIComponent(param[key]));
    }
    let param_str = param_list.join('&');

    return await protoapi_get_url('https://api.bilibili.com/x/v2/dm/wbi/web/seg.so?'+param_str);
}

export async function ingress_proto_history(ingress: ProtobufIngressHistory, chunk_callback: (idx: int, chunk: DanmuChunk<DanmuObject>)=>Promise<void>): Promise<void> {
    let d = await protoapi_get_url(ingress.url);
    await chunk_callback(1, protobuf_to_obj(1, d));
}

export async function ingress_proto_seg(ingress: ProtobufIngressSeg, chunk_callback: (idx: int, chunk: DanmuChunk<DanmuObject>)=>Promise<void>): Promise<void> {
    async function return_from_resp(idx: int, resp: Promise<proto_seg>): Promise<void> {
        await chunk_callback(idx, protobuf_to_obj(idx, await resp));
    }

    // preload first 2 chunks to increase responsiveness
    let chunk_1_req = protoapi_get_seg(ingress, 1);
    let chunk_2_req = protoapi_get_seg(ingress, 2);
    let pages = await protoapi_get_segcount(ingress);

    if(pages) {
        if(pages<=1) {
            await return_from_resp(1, chunk_1_req);
            return;
        }
        // noinspection ES6MissingAwait
        let jobs = [return_from_resp(1, chunk_1_req), return_from_resp(2, chunk_2_req)];
        for(let i=3; i<=pages; i++)
            jobs.push(return_from_resp(i, protoapi_get_seg(ingress, i)));
        await Promise.all(jobs);
    } else { // guess page numbers
        console.log('pakku protobuf api: guessing page numbers');

        // noinspection ES6MissingAwait
        let req= [chunk_1_req, chunk_2_req, protoapi_get_seg(ingress, 3)];

        async function work(idx: int): Promise<void> {
            let d = await req.shift()!;
            if(d.elems.length) {
                await chunk_callback(idx, protobuf_to_obj(idx, d));
                req.push(protoapi_get_seg(ingress, idx+3));
                await work(idx+1);
            } else { // finished?
                let dd = await req.shift()!;
                if(dd.elems.length) { // no
                    await chunk_callback(idx, protobuf_to_obj(idx, d));
                    await chunk_callback(idx+1, protobuf_to_obj(idx+1, dd));
                    req.push(protoapi_get_seg(ingress, idx+3));
                    req.push(protoapi_get_seg(ingress, idx+4));
                    await work(idx+2);
                } else { // probably yes
                    console.log('pakku protobuf api: ASSUMING total', idx-1, 'pages');
                    return;
                }
            }
        }
        await work(1);
    }
}

export function egress_proto(egress: ProtobufEgress, num_chunks: int, chunks: Map<int, DanmuChunk<DanmuObject>>): Uint8Array | typeof MissingData {
    if(egress.segidx===null) { // want all chunks
        if(!num_chunks || num_chunks!==chunks.size)
            return MissingData; // not finished

        let chunk = {
            objs: [...chunks.values()].flatMap(c=>c.objs),
            extra: {},
        };
        return obj_to_protobuf(egress, chunk);

    } else { // want specific chunk
        let chunk = chunks.get(egress.segidx);
        if(!chunk)
            return MissingData;

        return obj_to_protobuf(egress, chunk);
    }
}