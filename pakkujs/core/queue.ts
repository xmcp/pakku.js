import {int} from "./types";

export class Queue<T> {
    storage: {[k: int]: T};
    index_l: int; index_r: int; // [l, r)
    constructor(init: T[] = []) {
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
    size() {
        return this.index_r - this.index_l;
    }
    [Symbol.iterator]() {
        let self = this;
        let index = self.index_l;
        return {
            next() {
                if(index>=self.index_r)
                    return {done: true, value: undefined};
                return {done: false, value: self.storage[index++]};
            }
        } as IterableIterator<T>;
    }
}