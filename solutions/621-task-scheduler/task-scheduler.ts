class MaxHeap {
    values: number[];
    constructor() {
        this.values = [];
    }
    push(val:number):void {
        this.values.push(val);
        let current = this.values.length - 1;
        // sift up
        while(current > 0) {
            const parentIndex = Math.floor((current - 1)/2);
            if(this.values[current] > this.values[parentIndex]) {
                this.swap(current, parentIndex);
                current = parentIndex;
            } else {
                break;
            }
        }
    }
    pop(): number | undefined {
        if(this.values.length === 0) {
            return undefined;
        }
        if(this.values.length === 1) {
            return this.values.pop();
        }
        const max = this.values[0];
        this.values[0] = this.values.pop();
        this.siftDown(0);
        return max;
    }
    heapify(nums: number[]):void {
        this.values = nums;
        let current = Math.floor((this.values.length - 2)/2);
        while(current >= 0) {
            this.siftDown(current);
            current -= 1;
        }
    }
    siftDown(index: number):void {
        let current = index;
        while(current < this.values.length - 1) {
            const leftChildIndex = 2 * current + 1;
            const rightChildIndex = 2 * current + 2;
            const leftChildValue = this.values[leftChildIndex] === undefined ? -Infinity : this.values[leftChildIndex];
            const rightChildValue = this.values[rightChildIndex] === undefined ? -Infinity : this.values[rightChildIndex];
            const largerChildIndex = leftChildValue > rightChildValue ? leftChildIndex : rightChildIndex;
            const largerChildValue = leftChildValue > rightChildValue ? leftChildValue : rightChildValue;
            if(this.values[current] < largerChildValue) {
                this.swap(current, largerChildIndex);
                current = largerChildIndex;
            } else {
                break;
            }
        }
    }
    swap(index1:number, index2:number):void {
        const temp = this.values[index1];
        this.values[index1] = this.values[index2];
        this.values[index2] = temp;
    }
    size():number {
        return this.values.length;
    }
}
function leastInterval(tasks: string[], n: number): number {
    // Count frequency of each task
    const freqMap = new Map();
    for(const task of tasks) {
        if(!freqMap.has(task)) {
            freqMap.set(task, 1);
        } else {
            freqMap.set(task, freqMap.get(task) + 1);
        }
    }

    // Extract frequencies and push them to the heap
    const maxHeap = new MaxHeap();
    for(const [task, frequency] of freqMap.entries()) {
        maxHeap.push(frequency);
    }

    // track time
    let time = 0;

    const queue = new CustomQueue<[number, number]>(); // [frequency, nextAvailableTime]

    // iterate while either heap or queue have items
    while(maxHeap.size() > 0 || queue.length > 0) {
        // increment time with each iteration
        time += 1;

        // If we have tasks available in the heap, execute one
        if(maxHeap.size() > 0) {
            const frequency = maxHeap.pop() - 1; // Decrease frequency by 1
            if(frequency > 0) {
                // Task still has remaining executions, add to cooldown queue
                queue.enqueue([frequency, time + n]);
            }
        }

        // Check if any task in the queue is ready to be executed again
        if(queue.length > 0 && queue.peek()[1] === time) {
            // deque and push it back to the heap
            const [frequency, nextAvailableTime] = queue.deque();
            maxHeap.push(frequency);
        }

    }

    return time;
};

type Node<T> = {
    value: T;
    next?: Node<T>;
};

class CustomQueue<T> {
    public length: number;

    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.head = this.tail = undefined;
        this.length = 0;
    }

    enqueue(item: T): void {
        const node = { value: item } as Node<T>;
        this.length++;
        if (!this.tail) {
            this.tail = this.head = node;
            return;
        }

        this.tail.next = node;
        this.tail = node;
    }

    deque(): T | undefined {
        if (!this.head) {
            return undefined;
        }

        this.length--;

        const head = this.head;
        this.head = this.head.next;

        // free
        head.next = undefined;

        if (this.length === 0) {
            this.tail = undefined;
        }

        return head.value;
    }

    peek(): T | undefined {
        return this.head?.value;
    }
}