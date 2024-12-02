import {int, LocalizedConfig, Stats} from "./types";

// 0x10ffff is the max unicode code point
let ed_a = new Int16Array(0x10ffff);
let ed_b = new Int16Array(0x10ffff);
let ed_counts = ed_a; // to save memory

function edit_distance(P: string, Q: string): int {
    // this is NOT the real edit_distance as in a textbook because it would be too slow
    // actually this is O(n) time

    for(let i = P.length-1; i>=0; i--) ed_counts[P.charCodeAt(i)]++;
    for(let i = Q.length-1; i>=0; i--) ed_counts[Q.charCodeAt(i)]--;

    let ans = 0;

    for(let i = P.length-1; i>=0; i--) {
        let c = P.charCodeAt(i);
        ans += Math.abs(ed_counts[c]);
        ed_counts[c] = 0;
    }

    for(let i = Q.length-1; i>=0; i--) {
        let c = Q.charCodeAt(i);
        ans += Math.abs(ed_counts[c]);
        ed_counts[c] = 0;
    }

    return ans;
}

export function gen_2gram_array(P: string): int[] {
    let P_length_1 = P.length;
    P += P.charAt(0);
    let res = [];

    let clast = P.charCodeAt(0);
    for(let i = 1; i <= P_length_1; i++) {
        let c = P.charCodeAt(i);
        res.push(((clast << 10) ^ c) & 1048575);
        clast = c;
    }
    return res;
}

function cosine_distance(Pgram: int[], Qgram: int[], Plen: int, Qlen: int) {
    for(let i = 0; i < Plen; i++)
        ed_a[Pgram[i]]++;
    for(let i = 0; i < Qlen; i++)
        ed_b[Qgram[i]]++;

    let x = 0, y = 0, z = 0;

    for(let i = 0; i < Plen; i++) {
        let h1 = Pgram[i];
        let xa = ed_a[h1];
        if(xa) {
            let xb = ed_b[h1];
            y += xa * xa;
            if(xb) {
                x += xa * xb;
                z += xb * xb;
                ed_b[h1] = 0;
            }
            ed_a[h1] = 0;
        }
    }

    for(let i = 0; i < Qlen; i++) {
        let h1 = Qgram[i];
        let xb = ed_b[h1];
        if(xb) {
            z += xb * xb;
            ed_b[h1] = 0;
        }
    }

    return x * x / y / z;
}

export function similar_meta(config: LocalizedConfig) {
    const MAX_DIST = config.MAX_DIST;
    const MAX_COSINE = config.MAX_COSINE;
    const MIN_DANMU_SIZE = Math.max(1, MAX_DIST * 2);

    return function (P: string, Q: string, Pgram: int[] | null, Qgram: int[] | null, Ppinyin: string | null, Qpinyin: string | null, S: Stats): string | null {
        if(P===Q) {
            S.combined_identical++;
            return '==';
        }

        let dis = edit_distance(P, Q);
        if(
            (P.length + Q.length < MIN_DANMU_SIZE) ?
                dis < (P.length + Q.length) / MIN_DANMU_SIZE * MAX_DIST - 1 :
                dis <= MAX_DIST
        ) {
            S.combined_edit_distance++;
            return '≤' + dis;
        }

        if(Ppinyin) {
            let py_dis = edit_distance(Ppinyin, Qpinyin!);
            if(
                (P.length + Q.length < MIN_DANMU_SIZE) ?
                    py_dis < (P.length + Q.length) / MIN_DANMU_SIZE * MAX_DIST - 1 :
                    py_dis <= MAX_DIST
            ) {
                S.combined_pinyin_distance++;
                return 'P≤' + py_dis;
            }
        }

        if(Pgram) {
            if(dis < P.length + Q.length) { // they can be similar only if they share some common chars
                let cos = ~~(cosine_distance(Pgram, Qgram!, P.length, Q.length) * 100);
                if(cos >= MAX_COSINE) {
                    S.combined_cosine_distance++;
                    return cos + '%';
                }
            }
        }

        return null;
    };
}