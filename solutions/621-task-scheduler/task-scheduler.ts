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

    size(): number {
        return this.length;
    }
}

function leastInterval(tasks: string[], n: number): number {
    // 1. Create a task to count map
    const taskCount = new Map();
    for(const task of tasks) {
        if(!taskCount.has(task)) {
            taskCount.set(task, 1);
        } else {
            taskCount.set(task, taskCount.get(task) + 1);
        }
    }

    // 2. Initialize a priority queue and push task count values
    const prioQueue = new MaxHeap();
    for(const [task, count] of taskCount.entries()) {
        prioQueue.push(count);
    }

    // 3. Set up a time count and a cooldown queue
    let time = 0;
    const cooldownQueue = new CustomQueue<[number, number]>(); // [count, nextAvailableTime (time + n)]

    // 4. Iterate while either priority queue or cooldown queue are not empty
    while(prioQueue.size() > 0 || cooldownQueue.size() > 0) {

        // 4.1 increment total time
        time += 1;

        // 4.2 check if there are items in the prioQueue
        if(prioQueue.size() > 0) {
            // 4.2.1 pop and decrement the count by 1 (task processed)
            const count = prioQueue.pop() - 1;
            // 4.2.2 if the count is not zero push it to the cooldown queue together with it's next available time (time + n)
            if(count > 0) {
                cooldownQueue.enqueue([count, time + n]);
            }
        }

        // 4.3 check if cooldownQueue is not empty AND the next item is off cooldown (next available time === current time)
        if(cooldownQueue.size() > 0 && cooldownQueue.peek()[1] === time) {
            // 4.3.1 pop the item and push 'count' to the prioQueue
            const [count, nextAvailableTime] = cooldownQueue.deque();
            prioQueue.push(count);
        }

    }

    // 5. return total time
    return time;
};
