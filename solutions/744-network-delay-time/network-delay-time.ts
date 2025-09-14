function networkDelayTime(times: number[][], n: number, k: number): number {

    const adjList = buildAdjList(n, times);

    const minPQ = new CustomMinPriorityQueue<number>(); // val: number
    minPQ.push(k, 0);

    const distances = new Map<number, number>();
    let maxDistance = 0
    while (minPQ.length > 0) {

        const { val: currNode, prio: currDist } = minPQ.pop();

        if (distances.has(currNode)) {
            continue;
        }

        distances.set(currNode, currDist);
        maxDistance = currDist;

        for (const [neighbor, neighborDist] of adjList.get(currNode)) {
            // if (!distances.has(neighbor)) {
                minPQ.push(neighbor, currDist + neighborDist);
            // }

        }
    }

    if (distances.size !== n) {
        return -1; // didn't visit all the nodes
    } else {
        return maxDistance;
    }

};

function buildAdjList(n: number, edges: number[][]): Map<number, [number, number][]> {
    const adjList = new Map();
    for (let i = 1; i <= n; i += 1) {
        adjList.set(i, []);
    }
    for (const [src, dst, weight] of edges) {
        adjList.get(src).push([dst, weight]);
    }
    return adjList;
}

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
        const newNode = new PriorityQueueNode(val, prio);
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
    pop(): PriorityQueueNode<T> | undefined {
        if (this.length === 0) {
            return undefined;
        }
        if (this.length === 1) {
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
        while (currIdx < this.length - 1) {
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
    top(): number | undefined {
        return this.length > 0 ? this.data[0].prio : undefined;
    }
    heapify(vals: PriorityQueueNode<T>[]): void {
        this.data = [...vals];
        this.length = vals.length;
        let currIdx = Math.floor((this.length - 2) / 2);
        while (currIdx >= 0) {
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