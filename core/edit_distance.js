/**
 *  Copyright (C) 2017 @xmcp
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var ed_counts = new Int16Array (0x10ffff);

var MIN_DANMU_SIZE=10;

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
            
            if (dist < MAX_DIST && u.time > time_lim)
                return u;

            u.children.forEach (function (value, key) {
                if (dist - MAX_DIST <= key && key <= dist + MAX_DIST)
                    queue.push (value);
            });
        }
    }

    return null;
};
