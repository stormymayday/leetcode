function findMaximizedCapital(k: number, w: number, profits: number[], capital: number[]): number {
    
    // Combine profits and capital
    const combined: [number, number][] = [];
    for(let i = 0; i < profits.length; i += 1) {
        const prof = profits[i];
        const cap = capital[i];
        combined.push([prof, cap]);
    }

    const maxProf = new MaxHeap(); // prio: profit
    const minCap = new CustomMinPriorityQueue<number>(); // val: profit prio: capital

    // Heapify (minPQ) by capital
    const pqNodes: PriorityQueueNode<number>[] = [];
    for(const [prof, cap] of combined) {
        const newNode = new PriorityQueueNode<number>(prof, cap);
        pqNodes.push(newNode);
    }
    minCap.heapify(pqNodes);

    for(let i = 0; i < k; i += 1) {
        while(minCap.length > 0 && w >= minCap.top()) {
            const {val: prof, prio: cap} = minCap.pop();
            maxProf.push(prof);
        }
        if(maxProf.length > 0) {
            const prof = maxProf.pop();
            w += prof;
        }
    }

    return w;

};

class PriorityQueueNode<T> {
    val: T;
    prio: number;
    constructor(val: T, prio: number) {
        this.val = val;
        this.prio = prio;
    }
}

class CustomMinPriorityQueue<T> {
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
        while(currIdx > 0 && this.data[currIdx].prio < this.data[parentIdx].prio) {
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
            const leftChildPrio = this.data[leftChildIdx] === undefined ? Infinity : this.data[leftChildIdx].prio;
            const rightChildPrio = this.data[rightChildIdx] === undefined ? Infinity : this.data[rightChildIdx].prio;
            const smallerChildIdx = leftChildPrio < rightChildPrio ? leftChildIdx : rightChildIdx;
            const smallerChildPrio = leftChildPrio < rightChildPrio ? leftChildPrio : rightChildPrio;
            if(this.data[currIdx].prio > smallerChildPrio) {
                this.swap(currIdx, smallerChildIdx);
                currIdx = smallerChildIdx;
            } else {
                break;
            }
        }
    }
    heapify(vals: PriorityQueueNode<T>[]): void {
        this.data = [...vals];
        this.length = vals.length;
        let currIdx = Math.floor((this.length - 2) / 2);
        while(currIdx >= 0) {
            this.siftDown(currIdx);
            currIdx -= 1;
        }
    }
    top(): number | null {
        return this.length > 0 ? this.data[0].prio : null;
    }
    swap(idx1: number, idx2: number): void {
        const temp = this.data[idx1];
        this.data[idx1] = this.data[idx2];
        this.data[idx2] = temp;
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
    heapify(vals: PriorityQueueNode<T>[]): void {
        this.data = [...vals];
        this.length = vals.length;
        let currIdx = Math.floor((this.length - 2) / 2);
        while(currIdx >= 0) {
            this.siftDown(currIdx);
            currIdx -= 1;
        }
    }
    top(): number | null {
        return this.length > 0 ? this.data[0].prio : null;
    }
    swap(idx1: number, idx2: number): void {
        const temp = this.data[idx1];
        this.data[idx1] = this.data[idx2];
        this.data[idx2] = temp;
    }
}

class MaxHeap {
    private data: number[];
    public length: number;
    constructor() {
        this.data = [];
        this.length = 0;
    }
    push(val: number): void {
        this.data.push(val);
        this.length += 1;
        let currIdx = this.length - 1;
        let parentIdx = Math.floor((currIdx - 1) / 2);
        while(currIdx > 0 && this.data[currIdx] > this.data[parentIdx]) {
            this.swap(currIdx, parentIdx);
            currIdx = parentIdx;
            parentIdx = Math.floor((currIdx - 1) / 2);
        }
    }
    pop(): number | null {
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
            const leftChildVal = this.data[leftChildIdx] === undefined ? -Infinity : this.data[leftChildIdx];
            const rightChildVal = this.data[rightChildIdx] === undefined ? -Infinity : this.data[rightChildIdx];
            const largerChildIdx = leftChildVal > rightChildVal ? leftChildIdx : rightChildIdx;
            const largerChildVal = leftChildVal > rightChildVal ? leftChildVal : rightChildVal;
            if(this.data[currIdx] < largerChildVal) {
                this.swap(currIdx, largerChildIdx);
                currIdx = largerChildIdx;
            } else {
                break;
            }
        }
    }
    heapify(vals: number[]): void {
        this.data = [...vals];
        this.length = vals.length;
        let currIdx = Math.floor((this.length - 2) / 2);
        while(currIdx >= 0) {
            this.siftDown(currIdx);
            currIdx -= 1;
        }
    }
    top(): number | null {
        return this.length > 0 ? this.data[0] : null;
    }
    swap(idx1: number, idx2: number): void {
        const temp = this.data[idx1];
        this.data[idx1] = this.data[idx2];
        this.data[idx2] = temp;
    }
}