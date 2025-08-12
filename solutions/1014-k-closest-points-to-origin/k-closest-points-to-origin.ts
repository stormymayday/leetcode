function kClosest(points: number[][], k: number): number[][] {
    // Optimization
    if(points.length < k) {
        return points;
    }

    const queueNodes: QueueNode<number[]>[] = [];
    for(const point of points) {
        const [x, y] = point;
        const distance = x * x + y * y;
        const newNode = new QueueNode([x,y], distance);
        queueNodes.push(newNode);
    }

    const maxPQ = new CustomMaxPriorityQueue<number[]>();
    maxPQ.heapify(queueNodes);

    while(maxPQ.length > k) {
        maxPQ.dequeue();
    }

    const result: number[][] = [];
    while(maxPQ.length !== 0) {
        const queueNode: QueueNode<number[]> = maxPQ.dequeue();
        result.push(queueNode.val);
    }
    return result;
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
    enqueue(val: T, prio: number):void {
        const newNode = new QueueNode(val, prio);
        this.data.push(newNode);
        this.length += 1;
        let currIdx = this.length - 1;
        let parentIdx = Math.floor((currIdx-1)/2);
        while(currIdx > 0 && this.data[currIdx].prio > this.data[parentIdx].prio) {
            const temp = this.data[currIdx];
            this.data[currIdx] = this.data[parentIdx];
            this.data[parentIdx] = temp;
            currIdx = parentIdx;
            parentIdx = Math.floor((currIdx-1)/2);
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
        const root = this.data[0];
        this.data[0] = this.data.pop();
        this.length -= 1;
        this.siftDown(0);
        return root;
    }
    siftDown(idx: number):void {
        let currIdx = idx;
        while(currIdx < this.length - 1) {
            const leftChildIdx = currIdx * 2 + 1;
            const rightChildIdx = currIdx * 2 + 2;
            const leftChildPrio = this.data[leftChildIdx] === undefined ? -Infinity : this.data[leftChildIdx].prio
            const rightChildPrio = this.data[rightChildIdx] === undefined ? -Infinity : this.data[rightChildIdx].prio;
            const biggerChildIdx = leftChildPrio > rightChildPrio ? leftChildIdx : rightChildIdx;
            const biggerChildPrio = leftChildPrio > rightChildPrio ? leftChildPrio : rightChildPrio;
            if(this.data[currIdx].prio < biggerChildPrio) {
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
        return this.length > 0 ? this.data[0].prio : null;
    }
    heapify(values: QueueNode<T>[]): void {
        this.data = [...values];
        this.length = values.length;
        //let currIdx = this.length - 1;
        // Optimization: skipping leaves
        let currIdx = Math.floor((this.length - 2)/2);
        while(currIdx >= 0) {
            this.siftDown(currIdx);
            currIdx -= 1;
        }
    }
}