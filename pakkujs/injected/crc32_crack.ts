import {int} from "../core/types";

function make_crc32_cracker() {
    const POLY = 0xedb88320;

    let crc32_table = new Uint32Array(256);

    function make_table() {
        for(let i = 0; i < 256; i++) {
            let crc = i;

            for(let _ = 0; _ < 8; _++) {
                if(crc & 1) {
                    crc = ((crc >>> 1) ^ POLY) >>> 0;
                } else {
                    crc = crc >>> 1;
                }
            }

            crc32_table[i] = crc;
        }
    }

    make_table();

    function update_crc(by: int, crc: int) {
        return ((crc >>> 8) ^ crc32_table[(crc & 0xff) ^ by]) >>> 0;
    }

    function compute(arr: int[], init?: int) {

        let crc = init || 0;

        for(let i = 0; i < arr.length; i++) {
            crc = update_crc(arr[i], crc);
        }

        return crc;
    }


    function make_rainbow(N: int) {
        let rainbow = new Uint32Array(N);
        for(let i = 0; i < N; i++) {
            let arr = [].slice.call(i.toString()).map(Number);
            rainbow[i] = compute(arr);
        }
        return rainbow;
    }

    console.time('pakku crc32: rainbow');

    let rainbow_0 = make_rainbow(100000);
    let five_zeros = Array(5).fill(0);
    let rainbow_1 = rainbow_0.map(function(crc) {
        return compute(five_zeros, crc);
    });

    let rainbow_pos = new Uint32Array(65537);
    let rainbow_hash = new Uint32Array(200000);

    function make_hash() {
        for(let i = 0; i < rainbow_0.length; i++) {
            rainbow_pos[rainbow_0[i] >>> 16]++;
        }

        for(let i = 1; i <= 65536; i++) {
            rainbow_pos[i] += rainbow_pos[i - 1];
        }

        for(let i = 0; i <= rainbow_0.length; i++) {
            let po = --rainbow_pos[rainbow_0[i] >>> 16];
            rainbow_hash[po << 1] = rainbow_0[i];
            rainbow_hash[po << 1 | 1] = i;
        }
    }

    function lookup(crc: int) {
        let results = [];
        let first = rainbow_pos[crc >>> 16], last = rainbow_pos[1 + (crc >>> 16)];
        for(let i = first; i < last; i++) {
            if(rainbow_hash[i << 1] === crc)
                results.push(rainbow_hash[i << 1 | 1]);
        }
        return results;
    }

    make_hash();

    console.timeEnd('pakku crc32: rainbow');

    function crack(maincrc: int, max_digit: int) {
        let results = [];

        maincrc = (~maincrc) >>> 0;

        let basecrc = 0xffffffff;

        for(let ndigits = 1; ndigits <= max_digit; ndigits++) {
            basecrc = update_crc(0x30, basecrc);

            if(ndigits < 6) {
                let first_uid = Math.pow(10, ndigits - 1), last_uid = Math.pow(10, ndigits);

                for(let uid = first_uid; uid < last_uid; uid++) {
                    if(maincrc === ((basecrc ^ rainbow_0[uid]) >>> 0)) {
                        results.push(uid);
                    }
                }

            } else {
                let first_prefix = Math.pow(10, ndigits - 6);
                let last_prefix = Math.pow(10, ndigits - 5);

                for(let prefix = first_prefix; prefix < last_prefix; prefix++) {
                    let rem = (maincrc ^ basecrc ^ rainbow_1[prefix]) >>> 0;
                    let items = lookup(rem);
                    items.forEach(function(z) {
                        results.push(prefix * 100000 + z);
                    })
                }
            }
        }

        return results;
    }

    return crack;
}

let _crc32_cracker: null | ((maincrc: int, max_digit: int) => int[])  = null;

export function crack_uidhash(uidhash: string, max_digit: int): int[] {
    _crc32_cracker = _crc32_cracker || make_crc32_cracker();
    return _crc32_cracker(parseInt(uidhash, 16), max_digit);
}