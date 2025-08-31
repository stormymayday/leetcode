function getOrder(tasks: number[][]): number[] {

    const n = tasks.length;

    // 1. add original indecies
    const withIndex: [number, number, number][] = [];
    for (let i = 0; i < tasks.length; i += 1) {
        const [enqueueTime, processingTime] = tasks[i] 
        withIndex.push([enqueueTime, processingTime, i]);
    }

    // 2. sort tasks by enqueueTime
    withIndex.sort((a, b) => a[0] - b[0]);

    let currTime = 0;
    let currIdx = 0;
    const result: number[] = [];
    const minPQ = new CustomMinPriorityQueue<[number, number]>(); // val: [originalIndex, processingTime]  prio: processingTime * n + originalIndex

    while (currIdx < n || minPQ.length > 0) {

        while (currIdx < n && currTime >= withIndex[currIdx][0]) {
            const [enqueueTime, processingTime, originalIdx] = withIndex[currIdx];
            minPQ.push([originalIdx, processingTime], processingTime * n + originalIdx);
            currIdx += 1;
        }

        if (minPQ.length > 0) {
            
            const { val: [originalIdx, processingTime] } = minPQ.pop();
            result.push(originalIdx);
            currTime += processingTime;

        } else {
            currTime = withIndex[currIdx][0];
        }

    }

    return result;

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