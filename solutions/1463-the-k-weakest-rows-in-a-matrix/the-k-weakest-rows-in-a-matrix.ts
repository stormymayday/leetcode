function kWeakestRows(mat: number[][], k: number): number[] {
    // 1. Set up a hash map
    const rowToCount = new Map<number, number>(); // row -> 1s count
    for(let row = 0; row < mat.length; row +=1 ) {
        let count = 0;
        for(let col = 0; col < mat[0].length; col += 1) {
            if(mat[row][col] === 1) {
                count += 1;
            } else {
                break;
            }
        }
        rowToCount.set(row, count);
    }

    // 2. Intialize min priority queue
    const maxPQ = new CustomMaxPriorityQueue<number>(); // val: row, prio: count
    const n = mat.length; // for tie-breaking
    for(const [row, count] of rowToCount.entries()) {
        if(maxPQ.length < k) {
            // Create composite prio for tie-breaking
            maxPQ.push(row, count * n + row);
        } else {
            if((count * n + row) < maxPQ.top()) {
                maxPQ.pop();
                maxPQ.push(row, count * n + row);
            }
        }
    }

    // 3. Get the result
    const res: number[] = [];
    while(maxPQ.length > 0) {
        const { val: row } = maxPQ.pop();
        res.push(row);
    }
    return res.reverse();

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