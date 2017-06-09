// (C) 2017 @dramforever, @xmcp, @fanthos. THIS PROJECT IS LICENSED UNDER GPL VERSION 3. SEE `LICENSE.txt`.

var ed_counts = new Int16Array (0x10ffff);
var ed_a = new Int16Array (0x10ffff);
var ed_b = new Int16Array (0x10ffff);

var MIN_DANMU_SIZE=10;

function hash(a, b) {
    return (a*1047+b)%0x10ffff;
}

function edit_distance (P, Q) {
    'use strict';
    // TODO: Make this less hacky

    if (P.length + Q.length < MIN_DANMU_SIZE)
        return (MAX_DIST + 1) * +(P != Q);

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

function cosine_distance (P, Q) {
    'use strict';

	ed_a[hash(P.charCodeAt(P.length - 1), P.charCodeAt(0))] = 1;
	ed_b[hash(Q.charCodeAt(Q.length - 1), Q.charCodeAt(0))] = 1;

	var hashes = [];
	for (var i = 0; i < P.length - 1; i++) {
		var h1 = hash(P.charCodeAt(i), P.charCodeAt(i + 1));
		hashes.push(h1);
		ed_a[h1] += 1;
	}
	for (var i = 0; i < Q.length - 1; i++) {
		var h1 = hash(Q.charCodeAt(i), Q.charCodeAt(i + 1));
		hashes.push(h1);
		ed_b[h1] += 1;
	}
	var data = Array();

	var x = 0, y = 0, z = 0;

	for (var i = 0; i < hashes.length; i++) {
		var h1 = hashes[i];
		if (ed_a[h1]) {
			y += ed_a[h1] * ed_a[h1];
			if (ed_b[h1]) {
                x += ed_a[h1] * ed_b[h1];
                z += ed_b[h1] * ed_b[h1];
				ed_b[h1] = 0;
			}
			ed_a[h1] = 0;
		}
		else {
			if (ed_b[h1]) {
                z += ed_b[h1] * ed_b[h1];
				ed_b[h1] = 0;
			};
		}
	}
	return x*x/y/z;
}

function similar(P,Q) {
    var edit_dis=edit_distance(P,Q), cosine_dis=cosine_distance(P,Q);
    //console.log(P,Q,edit_dis,cosine_dis);
    return edit_dis<=MAX_DIST || cosine_dis*100>=MAX_COSINE;
}
