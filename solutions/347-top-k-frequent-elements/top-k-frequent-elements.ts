function topKFrequent(nums: number[], k: number): number[] {
    // 1. Set up a hash map
    const frequencyCount = new Map<number, number>();
    for(let i = 0; i < nums.length; i += 1) {
        if(!frequencyCount.has(nums[i])) {
            frequencyCount.set(nums[i], 0);
        }
        frequencyCount.set(nums[i], frequencyCount.get(nums[i]) + 1);
    }
    // 2. Priority Queue
    const pq = new CustomMaxPriorityQueue<number>();
    for(const [num, frequency] of frequencyCount.entries()) {
        pq.push(num, frequency);
    }

    // 3. Result
    const result: number[] = [];
    let i = 0;
    while(i < k) {
        const queueNode = pq.pop();
        result.push(queueNode.value);
        i += 1;
    }
    return result;
};

class QueueNode<T> {
    value: T;
    priority: number;
    constructor(value: T, priority: number) {
        this.value = value;
        this.priority = priority;
    }
}

class CustomMaxPriorityQueue<T> {
    private data: QueueNode<T>[];
    public length: number;
    constructor() {
        this.data = [];
        this.length = 0;
    }
    push(val: T, priority: number):void {
        const newNode = new QueueNode(val, priority);
        this.data.push(newNode);
        this.length += 1;
        let currIdx = this.length - 1;
        this.siftUp(currIdx);
    }
    siftUp(idx: number): void {
        let currIdx = idx;
        let parentIdx = Math.floor((currIdx - 1)/2);
        while(currIdx > 0 && this.data[currIdx].priority > this.data[parentIdx].priority) {
            const temp = this.data[currIdx];
            this.data[currIdx] = this.data[parentIdx];
            this.data[parentIdx] = temp;
            currIdx = parentIdx;
            parentIdx = Math.floor((currIdx - 1)/2);
        }
    }
    pop():QueueNode<T> | null {
        if(this.length === 0) {
            return null;
        }
        if(this.length === 1) {
            this.length -= 1;
            return this.data.pop();
        }
        const max = this.data[0];
        this.data[0] = this.data.pop();
        this.length -= 1;
        this.siftDown(0);
        return max;
    }
    siftDown(idx: number): void {
        let currIdx = idx;
        while(currIdx < this.length - 1) {
            const leftChildIdx = currIdx * 2 + 1;
            const rightChildIdx = currIdx * 2 + 2;
            const leftChildPrio = this.data[leftChildIdx] === undefined ? -Infinity : this.data[leftChildIdx].priority;
            const rightChildPrio = this.data[rightChildIdx] === undefined ? -Infinity : this.data[rightChildIdx].priority;
            const biggerChildIdx = leftChildPrio > rightChildPrio ? leftChildIdx : rightChildIdx;
            const biggerChildPrio = leftChildPrio > rightChildPrio ? leftChildPrio : rightChildPrio;
            if(this.data[currIdx].priority < biggerChildPrio) {
                const temp = this.data[currIdx];
                this.data[currIdx] = this.data[biggerChildIdx];
                this.data[biggerChildIdx] = temp;
                currIdx = biggerChildIdx;
            } else {
                break;
            }
        }
    }
    peek():number | null {
        return this.length > 0 ? this.data[0].priority : null;
    }
}