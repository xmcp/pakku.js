// 2017-2020 @dramforever, @xmcp, @fanthos. THIS PROJECT IS LICENSED UNDER GPL VERSION 3. SEE `LICENSE.txt`.

var ed_a = new Int16Array (0x10ffff);
var ed_b = new Int16Array (0x10ffff);
var ed_counts = ed_a; // to save memory

var MIN_DANMU_SIZE=10;

function hash(a, b) {
    return ((a<<10)^b)&1048575;
}

function edit_distance (P, Q) { // this is NOT the edit_distance you think
    'use strict';

    for (var i = 0; i < P.length; i ++) ed_counts [P.charCodeAt (i)] ++;
    for (var i = 0; i < Q.length; i ++) ed_counts [Q.charCodeAt (i)] --;

    var ans = 0;

    for (var i = 0; i < P.length; i ++) {
        ans += Math.abs (ed_counts[P.charCodeAt (i)]);
        ed_counts[P.charCodeAt (i)] = 0;
    }

    for (var i = 0; i < Q.length; i ++) {
        ans += Math.abs (ed_counts[Q.charCodeAt (i)]);
        ed_counts[Q.charCodeAt (i)] = 0;
    }

    return ans;
}

function gen_2gram_array(P) {
    var P_length_1=P.length;
    P+=P.charAt(0);
    var res=[];
    for(var i=0;i<P_length_1;i++)
        res.push(hash(P.charCodeAt(i),P.charCodeAt(i+1)));
    return res;
}

function cosine_distance_memorized (Pgram, Qgram, Plen, Qlen) {
    'use strict';
    
    if(MAX_COSINE>100) return 0;

	for (var i = 0; i < Plen; i++)
		ed_a[Pgram[i]]++;
	for (var i = 0; i < Qlen; i++)
		ed_b[Qgram[i]]++;

	var x = 0, y = 0, z = 0;

    for (var i = 0; i < Plen; i ++) {
        var h1=Pgram[i];
        if (ed_a[h1]) {
			y += ed_a[h1] * ed_a[h1];
			if (ed_b[h1]) {
                x += ed_a[h1] * ed_b[h1];
                z += ed_b[h1] * ed_b[h1];
				ed_b[h1] = 0;
			}
			ed_a[h1] = 0;
		}
    }

    for (var i = 0; i < Qlen; i ++) {
        var h1=Qgram[i];
        if (ed_b[h1]) {
            z += ed_b[h1] * ed_b[h1];
            ed_b[h1] = 0;
        }
    }
    
	return x*x/y/z;
}

function similar_memorized(P,Q,Pgram,Qgram,Ppinyin,Qpinyin,S) {
    if(P==Q) {
        S.identical++;
        return '==';
    }

    var dis=edit_distance(P,Q);
    if((P.length+Q.length < MIN_DANMU_SIZE) ? dis<(P.length+Q.length)/MIN_DANMU_SIZE*MAX_DIST-1 : dis<=MAX_DIST) {
        S.edit_distance++;
        return '≤'+dis;
    }

    if(Ppinyin) {
        var py_dis=edit_distance(Ppinyin,Qpinyin);
        if((P.length+Q.length < MIN_DANMU_SIZE) ? py_dis<(P.length+Q.length)/MIN_DANMU_SIZE*MAX_DIST-1 : py_dis<=MAX_DIST) {
            S.pinyin_distance++;
            return 'P≤'+py_dis;
        }
    }

    if(dis>=P.length+Q.length) // they have nothing similar. cosine_distance test can be bypassed
        return false;
    var cos=~~(cosine_distance_memorized(Pgram,Qgram,P.length,Q.length)*100);
    if(cos>=MAX_COSINE) {
        S.cosine_distance++;
        return cos+'%';
    }
    return false;
}

function similar(P,Q,S) {
    return similar_memorized(P,Q,gen_2gram_array(P),gen_2gram_array(Q),S);
}