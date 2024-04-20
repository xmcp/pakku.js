import {AnyObject, DanmuChunk, DanmuObject, int, MissingData} from "../core/types";

export interface XmlIngress {
    type: 'xml';
    url: string;
}

export interface XmlContentIngress {
    type: 'xml_content';
    content: string;
}

export interface XmlEgress {
    type: 'xml';
}

// extracted from bilibiliPlayer.min.js
function parse_xml_magic(k: string) {
	try {
		k = k.replace(/[\x00-\x08\x0b-\x0c\x0e-\x1f\x7f]/g, '');
	} catch (c) {}
	return (new window.DOMParser).parseFromString(k, 'text/xml');
}

function xml_to_chunk(xmlstr: string): DanmuChunk<DanmuObject> {
    let dom = parse_xml_magic(xmlstr);
    let res = [];
    let conf: AnyObject = {};
    let root_elem = dom.children[0];
    if(root_elem.tagName.toLowerCase()!=='i')
        throw new Error('root_elem tagname is not i');

    for(let elem of root_elem.children) {
        if(elem.tagName.toLowerCase()==='d') { // danmu
            let attr = elem.getAttribute('p')!.split(',');
            let str = elem.childNodes[0] ? (elem.childNodes[0] as Text).data : '';
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
            conf['xml_'+elem.tagName.toLowerCase()] = (elem.childNodes[0] as Text).data;
        }
    }
    return {
        objs: res,
        extra: conf,
    };
}

function chunk_to_xml(chunk: DanmuChunk<DanmuObject>): string {
    let parser = new DOMParser();
    let dom_str = (
        '<i>' +
        '<chatserver>chat.bilibili.com</chatserver>' +
        `<chatid>${chunk.extra.xml_chatid || 0}</chatid>` +
        '<mission>0</mission>' +
        `<maxlimit>${chunk.extra.xml_maxlimit || chunk.objs.length+1}}</maxlimit>` +
        '<state>0</state>' +
        '<real_name>0</real_name>' +
        '</i>'
    );
    let dom = parser.parseFromString(dom_str, 'text/xml');
    let i_elem=dom.childNodes[0];

    for(let d of chunk.objs) {
        let elem = dom.createElement('d');
        let tn = dom.createTextNode(d.content);
        let attr = [
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
    }
    
    let serializer = new XMLSerializer();
    let s = serializer.serializeToString(dom);

    // prettify
    return s.replace(/<d p=/g, '\n  <d p=').replace(/<\/i>/g, '\n</i>');
}

export async function ingress_xml(ingress: XmlIngress, chunk_callback: (idx: int, chunk: DanmuChunk<DanmuObject>)=>Promise<void>): Promise<void> {
    let res = await fetch(ingress.url, {credentials: 'include'});
    let txt = await res.text();
    await chunk_callback(1, xml_to_chunk(txt));
}

export async function ingress_xml_content(ingress: XmlContentIngress, chunk_callback: (idx: int, chunk: DanmuChunk<DanmuObject>)=>Promise<void>): Promise<void> {
    await chunk_callback(1, xml_to_chunk(ingress.content));
}

export function egress_xml(egress: XmlEgress, num_chunks: int, chunks: Map<int, DanmuChunk<DanmuObject>>): string | typeof MissingData {
    if(!num_chunks || num_chunks!==chunks.size)
        return MissingData; // not finished

    let c: DanmuChunk<DanmuObject> = {
        objs: [],
        extra: chunks.get(1)!.extra,
    };
    for(let idx of [...chunks.keys()].sort((a, b) => a - b)) {
        c.objs.push(...chunks.get(idx)!.objs);
    }

    return chunk_to_xml(c);
}