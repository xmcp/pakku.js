// (C) 2017 @dramforever. THIS PROJECT IS LICENSED UNDER GPL VERSION 3. SEE `LICENSE.txt`.

var MIN_DANMU_SIZE=10;

var counts_P = new Int16Array (0x110000);
var counts_Q = new Int16Array (0x110000);

function get_edit_distance (score, P, Q) {
    'use strict';

    for (var i = 0; i < P.length; i ++) counts_P[P.charCodeAt (i)] ++;
    for (var i = 0; i < Q.length; i ++) counts_Q[Q.charCodeAt (i)] ++;

    var ans = 0;

    function worker (S, A) {
        for (var i = 0; i < S.length; i ++) {
            var c = S.charCodeAt (i);
            if (A[c]) {
                ans += score (counts_P[c], counts_Q[c]);
                counts_P[c] = 0;
                counts_Q[c] = 0;
            }
        }
    }

    worker (P, counts_P);
    worker (Q, counts_Q);

    return ans;
}

function new_score (m, n) {
    return Math.abs (m - n) / (m + n);
}

function old_score (m, n) {
    return Math.abs (m - n);
}

function edit_distance (P, Q) {
    // TODO: Make this less hacky
    if (P.length + Q.length < MIN_DANMU_SIZE)
        return (MAX_DIST + 1) * +(P != Q);

    var scoreFunc = NEW_DIST ? new_score : old_score;

    /*
    var ans_new = get_edit_distance (new_score, P, Q);
    var ans_old = get_edit_distance (old_score, P, Q);

    console.log ("%o ~~ %o, new = %o, old = %o", P, Q, ans_new, ans_old);
    */

    return get_edit_distance (scoreFunc, P, Q);
}

function BKTree () {
    this.root = null;
    this.count = 0;
}

BKTree.prototype.insert = function (new_str, time) {
    'use strict';

    this.count ++;
    

    var new_node = { val: new_str, time: time, children: new Map () };

    if (this.root == null)
        this.root = new_node;
    else {
        var node = this.root;
        var dist = edit_distance (node.val, new_str);
        while (node.children.has (dist)) {
            node = node.children.get (dist);
            dist = edit_distance (node.val, new_str);
        }
        node.children.set (dist, new_node);
    }

    return new_node;
};

BKTree.prototype.find = function (str, time_lim) {
    'use strict';

    //var best_time, best_str = null;

    if (this.root != null) {
        var queue = [this.root];

        while (queue.length) {
            var u = queue.pop ();
            var dist = edit_distance (u.val, str);
            
            if (dist <= MAX_DIST && u.time > time_lim)
                return u;

            u.children.forEach (function (value, key) {
                if (dist - MAX_DIST <= key && key <= dist + MAX_DIST)
                    queue.push (value);
            });
        }
    }

    return null;
};