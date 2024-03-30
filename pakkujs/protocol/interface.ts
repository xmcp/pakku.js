import {egress_xml, ingress_xml, XmlEgress, XmlIngress} from "./interface_xml";
import {
    egress_proto, ingress_proto_history,
    ingress_proto_seg,
    ProtobufEgress,
    ProtobufIngressHistory,
    ProtobufIngressSeg
} from "./interface_protobuf";
import {DebugEgress, egress_debug} from "./interface_debug";
import {DanmuChunk} from "../core/types";

export type Ingress = XmlIngress | ProtobufIngressSeg | ProtobufIngressHistory;
export type Egress = XmlEgress | ProtobufEgress | DebugEgress;

function ts_assert_never(x: never): never {
    throw new Error('Unexpected object: '+x);
}

export async function ingress(ingress: Ingress): Promise<DanmuChunk[]> {
    if(ingress.type==='xml')
        return await ingress_xml(ingress);
    else if(ingress.type==='proto_seg')
        return await ingress_proto_seg(ingress);
    else if(ingress.type==='proto_history')
        return await ingress_proto_history(ingress);
    else
        return ts_assert_never(ingress);
}

export function egress(egress: Egress, chunks: DanmuChunk[]): string | Uint8Array {
    if(egress.type==='xml')
        return egress_xml(egress, chunks);
    else if(egress.type==='proto')
        return egress_proto(egress, chunks);
    else if(egress.type==='debug')
        return egress_debug(egress, chunks);
    else
        return ts_assert_never(egress);
}