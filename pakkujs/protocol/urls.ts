import {Egress, Ingress} from "./interface";
import {AnyObject} from "../core/types";
import {ProtobufIngressSeg, ProtobufView} from "./interface_protobuf";

const TRAD_DANMU_URL_RE=/(.+):\/\/comment\.bilibili\.com\/(?:rc\/)?(?:dmroll,[\d\-]+,)?(\d+)(?:\.xml)?$/;
const NEW_DANMU_NORMAL_URL_RE=/(.+):\/\/api\.bilibili\.com\/x\/v1\/dm\/list\.so\?oid=(\d+)$/;
const PROTO_DANMU_VIEW_URL_RE=/(.+):\/\/api\.bilibili\.com\/x\/v2\/dm\/(?:wbi\/)?(?:web|h5)\/view\?.*?oid=(\d+)&pid=(\d+).*?$/;
const PROTO_DANMU_SEG_URL_RE=/(.+):\/\/api\.bilibili\.com\/x\/v2\/dm\/(?:wbi\/)?(?:web|h5)\/seg\.so\?.*?oid=(\d+)&pid=(\d+).*?$/;
const PROTO_DANMU_HISTORY_URL_RE=/(.+):\/\/api\.bilibili\.com\/x\/v2\/dm\/web\/history\/seg\.so\?type=\d+&oid=(\d+)&date=([\d\-]+)$/;

class DanmuUrlFinder {
    protoapi_img_url: string | null = null;
    protoapi_sub_url: string | null = null;

    _cid_to_pid: AnyObject = {};

    find(url: string): [Ingress, Egress] | [ProtobufIngressSeg, ProtobufView] | null {
        if(url.includes('//comment.bilibili.com/')) {
            let res = TRAD_DANMU_URL_RE.exec(url);
            if(res)
                return [{
                    type: 'xml',
                    url: url,
                }, {
                    type: 'xml',
                    wait_finished: true,
                }];
        }
        else if(url.includes('/list.so?')) {
            let res = NEW_DANMU_NORMAL_URL_RE.exec(url);
            if(res)
                return [{
                    type: 'xml',
                    url: url,
                }, {
                    type: 'xml',
                    wait_finished: true,
                }];
        }
        else if(url.includes('/history/seg.so?')) {
            let res = PROTO_DANMU_HISTORY_URL_RE.exec(url);
            if(res) {
                let date = res[3];
                if(date.startsWith('197')) // magic reload use timestamp near 0
                    return [{
                        type: 'proto_seg',
                        is_magicreload: true,
                        cid: res[2],
                        pid: this._cid_to_pid[res[2]] || '0',
                        static_img_url: this.protoapi_img_url,
                        static_sub_url: this.protoapi_sub_url,
                    }, {
                        type: 'proto_seg',
                        wait_finished: true,
                        segidx: null,
                        ps: null,
                        pe: null,
                    }];
                else // real history
                    return [{
                        type: 'proto_history',
                        url: url,
                    }, {
                        type: 'proto_seg',
                        wait_finished: true,
                        segidx: null,
                        ps: null,
                        pe: null,
                    }];
            }
        }
        else if(url.includes('/seg.so?')) {
            let res = PROTO_DANMU_SEG_URL_RE.exec(url);
            if(res) {
                this._cid_to_pid[res[2]] = res[3];

                let url_param=new URLSearchParams(url.split('?')[1] || '');

                let segidx = parseInt(url_param.get('segment_index') || '1');
                let ps_str = url_param.get('ps');
                let pe_str = url_param.get('pe');

                return [{
                    type: 'proto_seg',
                    is_magicreload: false,
                    cid: res[2],
                    pid: res[3],
                    static_img_url: this.protoapi_img_url,
                    static_sub_url: this.protoapi_sub_url,
                }, {
                    type: 'proto_seg',
                    wait_finished: true,
                    segidx: segidx,
                    ps: ps_str ? parseInt(ps_str) : null,
                    pe: pe_str ? parseInt(pe_str) : null,
                }];
            }
        }
        else if(url.includes('/view?')) {
            let res = PROTO_DANMU_VIEW_URL_RE.exec(url);
            if(res) {
                this._cid_to_pid[res[2]] = res[3];

                return [{
                    type: 'proto_seg',
                    is_magicreload: false,
                    cid: res[2],
                    pid: res[3],
                    static_img_url: this.protoapi_img_url,
                    static_sub_url: this.protoapi_sub_url,
                }, {
                    type: 'proto_view',
                }];
            }
        }

        return null;
    }
}

export let url_finder = new DanmuUrlFinder();