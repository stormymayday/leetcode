function getOrder(tasks: number[][]): number[] {
    // Store index
    const withIndex: number[][] = [];
    for (let i = 0; i < tasks.length; i += 1) {
        const [enqueueTime, processingTime] = tasks[i];
        withIndex.push([enqueueTime, processingTime, i]);
    }
    // Sort by enqueueTime
    withIndex.sort((a, b) => a[0] - b[0]);

    // Starting time and index
    let currTime = 0;
    let currIndex = 0;

    // Working on the result
    const result: number[] = [];
    const minPQ = new CustomMinPriorityQueue<number>();

    while (minPQ.length !== 0 || currIndex < withIndex.length) {
        // Push all the tasks whose enqueueTime <= currTime into the heap.
        while (currIndex < withIndex.length && currTime >= withIndex[currIndex][0]) {
            const [enqueueTime, processingTime, index] = withIndex[currIndex];
            // Encode tie-breaking into one number: processing time first, then original index
            const combinedPriority = processingTime * 100000 + index;
            minPQ.push(index, combinedPriority);
            currIndex += 1;
        }

        if (minPQ.length === 0) {
            // No tasks available, jump to next task's enqueue time
            currTime = withIndex[currIndex][0];
        } else {
            // Process the task with shortest processing time
            const { val: index } = minPQ.pop()!;
            // Get the original processing time from the tasks array using the original index
            const processingTime = tasks[index][1];

            result.push(index);
            currTime += processingTime;
        }
    }

    return result;
}

class QueueNode<T> {
    val: T;
    prio: number;
    constructor(val: T, prio: number) {
        this.val = val;
        this.prio = prio;
    }
}

class CustomMinPriorityQueue<T> {
    private data: QueueNode<T>[];
    public length: number;

    constructor() {
        this.data = [];
        this.length = 0;
    }

    push(val: T, prio: number): void {
        const newNode = new QueueNode(val, prio);
        this.data.push(newNode);
        this.length += 1;
        let currIdx = this.length - 1;
        let parentIdx = Math.floor((currIdx - 1) / 2);
        while (currIdx > 0 && this.data[currIdx].prio < this.data[parentIdx].prio) {
            this.swap(currIdx, parentIdx);
            currIdx = parentIdx;
            parentIdx = Math.floor((currIdx - 1) / 2);
        }
    }

    pop(): QueueNode<T> | null {
        if (this.length === 0) {
            return null;
        }
        if (this.length === 1) {
            this.length = 0;
            return this.data.pop()!;
        }

        const root = this.data[0];
        this.data[0] = this.data.pop();
        this.length -= 1;
        this.siftDown(0);
        return root;
    }

    siftDown(idx: number): void {
        let currIdx = idx;
        while (currIdx < this.data.length - 1) {
            const leftChildIdx = currIdx * 2 + 1;
            const rightChildIdx = currIdx * 2 + 2;
            const leftChildPrio = this.data[leftChildIdx] === undefined ? Infinity : this.data[leftChildIdx].prio;
            const rightChildPrio = this.data[rightChildIdx] === undefined ? Infinity : this.data[rightChildIdx].prio;
            const smallerChildIdx = leftChildPrio < rightChildPrio ? leftChildIdx : rightChildIdx;
            const smallerChildPrio = leftChildPrio < rightChildPrio ? leftChildPrio : rightChildPrio;
            if (this.data[currIdx].prio > smallerChildPrio) {
                this.swap(currIdx, smallerChildIdx);
                currIdx = smallerChildIdx;
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