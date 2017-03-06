var ed_counts = new Int16Array (0x10ffff);

function edit_distance (P, Q) {
    'use strict';

    // TODO: Make this less hacky
    if (P.length + Q.length < 7)
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

    var best_time, best_str = null;

    if (this.root != null) {
        var queue = [this.root];

        while (queue.length) {
            var u = queue.pop ();
            var dist = edit_distance (u.val, str);
            
            if (dist < MAX_DIST && u.time > time_lim)
                return u;

            u.children.forEach (function (value, key) {
                if (dist - MAX_DIST <= key && key <= dist + MAX_DIST)
                    queue.push (value);
            });
        }
    }

    return null;
}
