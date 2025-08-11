function kWeakestRows(mat: number[][], k: number): number[] {
    // 1. Count one's in each row
    const onesCount = new Map<number, number>();
    for(let row = 0; row < mat.length; row += 1) {
        if(!onesCount.has(row)) {
            onesCount.set(row, 0);
        }
        for(let col = 0; col < mat[0].length; col += 1) {
            if(mat[row][col] === 1) {
                onesCount.set(row, onesCount.get(row) + 1);
            }
        }
    }

    // 2. PriorityQueue
    const pq = new CustomMaxPriorityQueue<number>();
    for(const [row, count] of onesCount.entries()) {

        // Create composite priority for tie-breaking: count * maxRows + row
        const priority = count * mat.length + row;

        if(pq.length < k) {
            pq.enqueue(row, priority);
        }  else {
            const topNode = pq.peek();
            if(topNode) {  // Null safety check
                if(priority < topNode) {
                    pq.dequeue();
                    pq.enqueue(row, priority);
                }
            }
        }
    }

    // 3. Result
    const result: number[] = [];
    while(pq.length !== 0) {
        const queueNode: QueueNode<number> = pq.dequeue();
        result.push(queueNode.value);
    }
    return result.reverse();
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
    enqueue(val: T, priority: number):void {
        const newNode = new QueueNode(val, priority);
        this.data.push(newNode);
        this.length += 1;
        let currIdx = this.length - 1;
        let parentIdx = Math.floor((currIdx - 1)/2);
        while(currIdx > 0 && this.data[currIdx].priority > this.data[parentIdx].priority) {
            const temp = this.data[currIdx];
            this.data[currIdx] = this.data[parentIdx];
            this.data[parentIdx] = temp;
            currIdx = parentIdx;
            parentIdx = Math.floor((currIdx - 1)/2);
        }
    }
    dequeue():QueueNode<T> | null {
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