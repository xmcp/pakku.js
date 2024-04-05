import {egress_xml, ingress_xml, XmlEgress, XmlIngress} from "./interface_xml";
import {
    egress_proto, ingress_proto_history,
    ingress_proto_seg,
    ProtobufEgress,
    ProtobufIngressHistory,
    ProtobufIngressSeg
} from "./interface_protobuf";
import {DebugEgress, egress_debug} from "./interface_debug";
import {DanmuChunk, DanmuObject, int, MissingData} from "../core/types";

export type Ingress = XmlIngress | ProtobufIngressSeg | ProtobufIngressHistory;
export type Egress = XmlEgress | ProtobufEgress | DebugEgress;

function ts_assert_never(x: never): never {
    throw new Error('Unexpected object: '+x);
}

export async function perform_ingress(ingress: Ingress, chunk_callback: (idx: int, chunk: DanmuChunk<DanmuObject>)=>Promise<void>): Promise<void> {
    if(ingress.type==='xml')
        return await ingress_xml(ingress, chunk_callback);
    else if(ingress.type==='proto_seg')
        return await ingress_proto_seg(ingress, chunk_callback);
    else if(ingress.type==='proto_history')
        return await ingress_proto_history(ingress, chunk_callback);
    else
        return ts_assert_never(ingress);
}

export function perform_egress(egress: Egress, num_chunks: int, chunks: Map<int, DanmuChunk<DanmuObject>>): string | Uint8Array | typeof MissingData {
    if(egress.type==='xml')
        return egress_xml(egress, num_chunks, chunks);
    else if(egress.type==='proto')
        return egress_proto(egress, num_chunks, chunks);
    else if(egress.type==='debug')
        return egress_debug(egress, num_chunks, chunks);
    else
        return ts_assert_never(egress);
}