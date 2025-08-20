function leastInterval(tasks: string[], n: number): number {
    // frequency count map
    const freqMap = new Map<string, number>(); // task -> count
    for(let i = 0; i < tasks.length; i += 1) {
        freqMap.set(tasks[i], (freqMap.get(tasks[i]) || 0) + 1);
    }

    // priority queue
    const maxPQ = new CustomMaxPriorityQueue<string>();
    for(const [task, count] of freqMap.entries()) {
        maxPQ.push(task, count);
    }

    // main logic
    const cooldownQueue = new CustomQueue<[string, number, number]>(); // [task, count, coolDown]
    let time = 0;
    while(maxPQ.length > 0 || cooldownQueue.length > 0) {
        time += 1;
        if(maxPQ.length > 0) {
            let {val: task, prio: count} = maxPQ.pop();
            count -= 1;
            if(count > 0) {
                cooldownQueue.enqueue([task, count, time + n]);
            }
        }
        if(cooldownQueue.length > 0 && time >= cooldownQueue.peek()[2]) {
            const [task, count, cooldown] = cooldownQueue.dequeue();
            maxPQ.push(task, count);
        }
    }
    return time;
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
    swap(idx1: number, idx2: number): void {
        const temp = this.data[idx1];
        this.data[idx1] = this.data[idx2];
        this.data[idx2] = temp;
    }
}

class QueueNode<T> {
    val: T;
    next: QueueNode<T> | null;
    constructor(val: T) {
        this.val = val;
        this.next = null;
    }
}

class CustomQueue<T> {
    start: QueueNode<T> | null;
    end: QueueNode<T> | null;
    length: number;
    constructor() {
        this.start = null;
        this.end = null;
        this.length = 0;
    }
    enqueue(val: T): void {
        const newNode = new QueueNode<T>(val);
        if(this.length === 0) {
            this.start = newNode;
            this.end = newNode;
        } else {
            this.end.next = newNode;
            this.end = newNode;
        }
        this.length += 1;
    }
    dequeue(): T | null {
        if(this.length === 0) {
            return null;
        }
        const temp = this.start;
        this.start = this.start.next;
        temp.next = null;
        this.length -= 1;
        if(this.length === 0) {
            this.end = null;
        }
        return temp.val;
    }
    peek(): T | null {
        return this.length > 0 ? this.start.val : null;
    }
}