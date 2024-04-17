import {int} from "./types";

export class Queue<T> {
    storage: {[k: int]: T};
    index_l: int; index_r: int; // [l, r)
    constructor(init: T[]) {
        this.storage = {...init};
        this.index_l = 0;
        this.index_r = init.length;
    }
    push(item: T) {
        this.storage[this.index_r++] = item;
    }
    pop() {
        delete this.storage[this.index_l++];
    }
    peek(): T | null {
        if(this.index_l===this.index_r)
            return null;
        return this.storage[this.index_l];
    }
}