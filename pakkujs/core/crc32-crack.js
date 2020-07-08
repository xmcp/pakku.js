// 2017-2020 @dramforever. THIS PROJECT IS LICENSED UNDER GPL VERSION 3. SEE `LICENSE.txt`.
// Note: This file can be distributed under the CRC32 Cracker Exception. SEE `LICENSE.txt`.

function make_crc32_cracker () {

    var POLY = 0xedb88320;

    var crc32_table = new Uint32Array(256);

    function make_table() {
        for (var i = 0; i < 256; i ++) {
            var crc = i;

            for (var _ = 0; _ < 8; _ ++) {
                if (crc & 1) {
                    crc = ((crc >>> 1) ^ POLY) >>> 0;
                } else {
                    crc = crc >>> 1;
                }
            }
            
            crc32_table[i] = crc;
        }
    }

    make_table();

    function update_crc(by, crc) {
        return ((crc >>> 8) ^ crc32_table[(crc & 0xff) ^ by]) >>> 0;
    }
    
    function compute(arr, init) {

        var crc = init||0;
    
        for (var i = 0; i < arr.length; i ++) {
            crc = update_crc(arr[i], crc);
        }
        
        return crc;
    }
    
    
    function make_rainbow(N) {
        var rainbow = new Uint32Array(N);
        for (var i = 0; i < N; i ++) {
            var arr = [].slice.call(i.toString()).map(Number);
            rainbow[i] = compute(arr);
        }
        return rainbow;
    }

    console.time('rainbow');
    
    var rainbow_0 = make_rainbow(100000);
    var five_zeros = Array(5).fill(0);
    var rainbow_1 = rainbow_0.map(function (crc) {
        return compute(five_zeros, crc);
    });
    
    var rainbow_pos = new Uint32Array(65537);
    var rainbow_hash = new Uint32Array(200000);
    
    function make_hash() {
        for (var i = 0; i < rainbow_0.length; i ++) {
            rainbow_pos[rainbow_0[i] >>> 16] ++;
        }
        
        for (var i = 1; i <= 65536; i ++) {
            rainbow_pos[i] += rainbow_pos[i - 1];
        }
        
        for (var i = 0; i <= rainbow_0.length; i ++) {
            var po = -- rainbow_pos[rainbow_0[i] >>> 16];
            rainbow_hash[po << 1] = rainbow_0[i];
            rainbow_hash[po << 1 | 1] = i;
        }
    }
    
    function lookup(crc) {
        var results = [];
        var first = rainbow_pos[crc >>> 16], last = rainbow_pos[1 + (crc >>> 16)];
        for (var i = first; i < last; i ++) {
            if (rainbow_hash[i << 1] == crc) 
                results.push(rainbow_hash[i << 1 | 1]);
        }
        return results;
    }
    
    make_hash();
    
    console.timeEnd('rainbow');
    
    function crack(maincrc) {
        var results = [];
        
        maincrc = (~ maincrc) >>> 0;

        var basecrc = 0xffffffff;
        
        for (var ndigits = 1; ndigits < 10; ndigits ++) {
            basecrc = update_crc(0x30, basecrc);

            if (ndigits < 6) {
                var first_uid = Math.pow(10, ndigits - 1), last_uid = Math.pow(10, ndigits);
                
                for (var uid = first_uid; uid < last_uid; uid ++) {
                    if (maincrc == ((basecrc ^ rainbow_0[uid]) >>> 0)) {
                        results.push(uid);
                    }
                }

            } else {
                var first_prefix = Math.pow(10, ndigits - 6);
                var last_prefix = Math.pow(10, ndigits - 5);

                for (var prefix = first_prefix; prefix < last_prefix; prefix ++) {
                    var rem = (maincrc ^ basecrc ^ rainbow_1[prefix]) >>> 0;
                    var items = lookup(rem);
                    items.forEach(function(z) { results.push(prefix * 100000 + z); })
                }
            }
        }
        
        return results;
    }
    
    return {
        crack: crack
    };
}

var _crc32_cracker=null;
function crack_uidhash(uidhash) {
    _crc32_cracker=_crc32_cracker||make_crc32_cracker();
    return _crc32_cracker.crack(parseInt(uidhash,16));
}