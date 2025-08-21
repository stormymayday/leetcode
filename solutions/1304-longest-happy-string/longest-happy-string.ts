function longestDiverseString(a: number, b: number, c: number): string {
    const maxPQ = new CustomMaxPriorityQueue<string>();
    if(a > 0) {
        maxPQ.push("a", a);
    }
    if(b > 0) {
        maxPQ.push("b", b);
    }
    if(c > 0) {
        maxPQ.push("c", c);
    }

    const res: string[] = [];
    while(maxPQ.length > 0) {
        let {val: topChar, prio: topCount} = maxPQ.pop();
        if(res.length > 1 && res[res.length - 1] === topChar && res[res.length - 2] === topChar) {
            if(maxPQ.length === 0) {
                break;
            } else {
                let {val: nextChar, prio: nextCount} = maxPQ.pop();
                res.push(nextChar);
                nextCount -= 1;
                if(nextCount > 0) {
                    maxPQ.push(nextChar, nextCount);
                }
            }
        } else {
            res.push(topChar);
            topCount -= 1;
        }
        if(topCount > 0) {
            maxPQ.push(topChar, topCount);
        }
    }
    return res.join("");
};

class PriorityQueueNode<T> {
    val: T;
    prio: number;
    constructor(val: T, prio: number) {
        this.val = val;
        this.prio = prio;
    }
}

class CustomMaxPriorityQueue<T> {
    private data: PriorityQueueNode<T>[];
    public length: number;
    constructor() {
        this.data = [];
        this.length = 0;
    }
    push(val: T, prio: number): void {
        const newNode = new PriorityQueueNode<T>(val, prio);
        this.data.push(newNode);
        this.length += 1;
        let currIdx = this.length - 1;
        let parentIdx = Math.floor((currIdx - 1) / 2);
        while(currIdx > 0 && this.data[currIdx].prio > this.data[parentIdx].prio) {
            this.swap(currIdx, parentIdx);
            currIdx = parentIdx;
            parentIdx = Math.floor((currIdx - 1) / 2);
        }
    }
    pop(): PriorityQueueNode<T> | null {
        if(this.length === 0) {
            return null;
        }
        if(this.length === 1) {
            this.length = 0;
            return this.data.pop();
        }
        const root = this.data[0];
        this.data[0] = this.data.pop();
        this.length -= 1;
        this.siftDown(0);
        return root;
    }
    siftDown(idx: number): void {
        let currIdx = idx;
        while(currIdx < this.length - 1) {
            const leftChildIdx = currIdx * 2 + 1;
            const rightChildIdx = currIdx * 2 + 2;
            const leftChildPrio = this.data[leftChildIdx] === undefined ? -Infinity : this.data[leftChildIdx].prio;
            const rightChildPrio = this.data[rightChildIdx] === undefined ? -Infinity : this.data[rightChildIdx].prio;
            const largerChildIdx = leftChildPrio > rightChildPrio ? leftChildIdx : rightChildIdx;
            const largerChildPrio = leftChildPrio > rightChildPrio ? leftChildPrio : rightChildPrio;
            if(this.data[currIdx].prio < largerChildPrio) {
                this.swap(currIdx, largerChildIdx);
                currIdx = largerChildIdx;
            } else {
                break;
            }
        }
    }
    top(): number | null {
        return this.length > 0 ? this.data[0].prio : null;
    }
    heapify(values: PriorityQueueNode<T>[]): void {
        this.data = [...values];
        this.length = values.length;
        let currIdx = Math.floor((this.length - 2) / 2);
        while(currIdx >= 0) {
            this.siftDown(currIdx);
            currIdx -= 1;
        }
    }
    swap(idx1: number, idx2: number): void {
        const temp = this.data[idx1];
        this.data[idx1] = this.data[idx2];
        this.data[idx2] = temp;
    }
}