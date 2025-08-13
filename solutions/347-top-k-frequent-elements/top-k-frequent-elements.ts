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
    const pq = new CustomMinPriorityQueue<number>();
    for(const [num, frequency] of frequencyCount.entries()) {
        if(pq.length < k) {
            pq.push(num, frequency);
        } else {
            if(frequency > pq.peek()) {
                pq.pop();
                pq.push(num, frequency);
            }
        }
    }

    // 3. Result
    const result: number[] = [];
    while(pq.length !== 0) {
        const queueNode = pq.pop();
        result.push(queueNode.val);
    }
    return result;
};

class QueueNode<T> {
    val: T;
    priority: number;
    constructor(val: T, priority: number) {
        this.val = val;
        this.priority = priority;
    }
}

class CustomMinPriorityQueue<T> {
    private heap: QueueNode<T>[];
    public length: number;
    constructor() {
        this.heap = [];
        this.length = 0;
    }
    push(val: T, priority: number): void {
        const newNode = new QueueNode(val, priority);
        this.heap.push(newNode);
        this.length += 1;
        let currIdx = this.heap.length - 1;
        this.siftUp(currIdx);
    }
    siftUp(idx: number): void {
        let currIdx = idx;
        let parentIdx = Math.floor((currIdx - 1) / 2);
        while(currIdx > 0 && this.heap[currIdx].priority < this.heap[parentIdx].priority) {
            const temp = this.heap[currIdx];
            this.heap[currIdx] = this.heap[parentIdx];
            this.heap[parentIdx] = temp;
            currIdx = parentIdx;
            parentIdx = Math.floor((currIdx - 1) / 2);
        }
    }
    pop(): QueueNode<T> | null {
        if(this.heap.length === 0) {
            return null;
        }
        if(this.heap.length === 1) {
            this.length -= 1;
            return this.heap.pop();
        }
        const result = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.length -= 1;
        this.siftDown(0);
        return result;
    }
    siftDown(idx: number):void {
        let currIdx = idx;
        while(currIdx < this.heap.length - 1) {
            const leftChildIdx = currIdx * 2 + 1;
            const rightChildIdx = currIdx * 2 + 2;
            const leftChildPriority = this.heap[leftChildIdx] === undefined ? Infinity : this.heap[leftChildIdx].priority;
            const rightChildPriority = this.heap[rightChildIdx] === undefined ? Infinity : this.heap[rightChildIdx].priority;
            const smallerChildPrioIdx = leftChildPriority < rightChildPriority ? leftChildIdx : rightChildIdx;
            const smallerChildPrio = leftChildPriority < rightChildPriority ? leftChildPriority : rightChildPriority;
            if(this.heap[currIdx].priority > smallerChildPrio) {
                const temp = this.heap[currIdx];
                this.heap[currIdx] = this.heap[smallerChildPrioIdx];
                this.heap[smallerChildPrioIdx] = temp;
                currIdx = smallerChildPrioIdx;
            } else {
                break;
            }
        }
    }
    peek():number | null {
        return this.length > 0 ? this.heap[0].priority : null;
    }
}