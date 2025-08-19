function leastInterval(tasks: string[], n: number): number {
    // 1. Create a frequency count map
    const freqCount = new Map<string, number>();
    for(let i = 0; i < tasks.length; i += 1) {
        const task = tasks[i];
        if(!freqCount.has(task)) {
            freqCount.set(task, 0);
        }
        freqCount.set(task, freqCount.get(task) + 1);
    }

    // 2. Initialze priority queue
    const maxPQ = new CustomMaxPriorityQueue<string>();
    const queueNodes: QueueNode<string>[] = [];
    for(const [char, count] of freqCount.entries()) {
        const newNode = new QueueNode<string>(char, count);
        queueNodes.push(newNode);
    }
    maxPQ.heapify(queueNodes);

    // 3. Main Logic
    const cooldownQueue: [string, number, number][] = [];
    let time = 0;
    while(maxPQ.length > 0 || cooldownQueue.length > 0) {

        // 1. start execution
        time += 1;

        // 2. pop the pq if it is not empty
        if(maxPQ.length > 0) {
            let {val: char, prio: count} = maxPQ.pop();
            // 2.1. decrement the count
            count -= 1;
            // 2.2 put char into the cooldown queue (if count is greater than 0)
            if(count > 0) {
                cooldownQueue.push([char, count, time + n]);
            }
        }

        // 3. check the cooldown queue
        if(cooldownQueue.length > 0 && cooldownQueue[0][2] <= time) {
            const [char, count, availableTime] = cooldownQueue.shift();
            // put item back into the priority queue
            maxPQ.push(char, count);
        }
    }
    return time;
};

class QueueNode<T> {
    val: T;
    prio: number;
    constructor(val: T, prio: number) {
        this.val = val;
        this.prio = prio;
    }
}

class CustomMaxPriorityQueue<T> {
    private data: QueueNode<T>[];
    public length: number;
    constructor() {
        this.data = [];
        this.length = 0;
    }
    push(val: T, prio: number): void {
        const newNode = new QueueNode<T>(val, prio);
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
    pop(): QueueNode<T> | null {
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
    heapify(values: QueueNode<T>[]): void {
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