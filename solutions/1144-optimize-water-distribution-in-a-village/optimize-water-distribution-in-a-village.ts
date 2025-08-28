function minCostToSupplyWater(n: number, wells: number[], pipes: number[][]): number {
    
    // 1. Add virtual node 0
    for(let i = 0; i < wells.length; i += 1) {
        pipes.push([0, i + 1, wells[i]]);
    }

    // 2. Create a weighted adjacency list
    const adjList = new Map<number, [number, number][]>(); // key: src -> val: [[dst, cost], ...]
    for(let i = 0; i <= n; i += 1) { // extra node
        adjList.set(i, []);
    }
    for(const [src, dst, cost] of pipes) {
        adjList.get(src).push([dst, cost]);
        adjList.get(dst).push([src, cost]);
    }

    // 3. Pick a starting node, mark it as visited, queue up it's neighbors
    const visited = new Set<number>();
    visited.add(0);
    const minPQ = new CustomMinPriorityQueue<[number, number]>(); // val: [src, dst], prio: cost
    for(const [neighbor, cost] of adjList.get(0)) {
        minPQ.push([0, neighbor], cost);
    }

    // 4. Perform Prim's
    let mstCost = 0;
    let edgesUsed = 0;
    while(minPQ.length > 0) {
        const { val: [src, currNode], prio: cost } = minPQ.pop();

        if(visited.has(currNode)) {
            continue;
        }
        visited.add(currNode);
        mstCost += cost;
        edgesUsed += 1;
        if(edgesUsed === n) { // extra node
            return mstCost;
        }

        for(const [neighbor, neighborCost] of adjList.get(currNode)) {
            if(!visited.has(neighbor)) {
                minPQ.push([currNode, neighbor], neighborCost);
            }
        }
    }
    return -1;

};

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
        const newNode = new PriorityQueueNode<T>(val, prio);
        this.data.push(newNode);
        this.length += 1;
        let currIdx = this.length - 1;
        let parentIdx = Math.floor((currIdx - 1) / 2);
        while(currIdx > 0 && this.data[currIdx].prio < this.data[parentIdx].prio) {
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
            const leftChildPrio = this.data[leftChildIdx] === undefined ? Infinity : this.data[leftChildIdx].prio;
            const rightChildPrio = this.data[rightChildIdx] === undefined ? Infinity : this.data[rightChildIdx].prio;
            const smallerChildIdx = leftChildPrio < rightChildPrio ? leftChildIdx : rightChildIdx;
            const smallerChildPrio = leftChildPrio < rightChildPrio ? leftChildPrio : rightChildPrio;
            if(this.data[currIdx].prio > smallerChildPrio) {
                this.swap(currIdx, smallerChildIdx);
                currIdx = smallerChildIdx; 
            } else {
                break;
            }
        }
    }
    heapify(vals: PriorityQueueNode<T>[]): void {
        this.data = [...vals];
        this.length = vals.length;
        let currIdx = Math.floor((this.length - 2) / 2);
        while(currIdx >= 0) {
            this.siftDown(currIdx);
            currIdx -= 1;
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