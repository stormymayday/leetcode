function findCheapestPrice(n: number, flights: number[][], src: number, dst: number, k: number): number {
    // 1. Create a weighted adjacency list from the edge list (flights)
    const adjList = new Map<number, [number, number][]>(); // src -> [[dst, cost], ...]
    for(let i = 0; i < n; i += 1) {
        adjList.set(i, []);
    }
    for(const [a, b, cost] of flights) {
        adjList.get(a).push([b, cost]);
    }

    // 2. Set up a visited hash map
    const visited = new Map<number, number>(); // node -> edgesUsed

    // 3. Initalize a priority queue and queue up the source with edgesUsed = 0, and cost = 0
    const minPQ = new CustomMinPriorityQueue<[number, number]>(); // val: [node, edgesUsed], prio: cost
    minPQ.push([src, 0], 0);

    // 4. Modified Dijkstra's
    while(minPQ.length > 0) {

        const { val: [currNode, edgesUsed], prio: currCost } = minPQ.pop();

        // The first time we visited target node, it's guaranteed to have lowest cost
        if(currNode === dst) {
            return currCost;
        }

        // If node has been visited AND it took less edges last time, skip
        if(visited.has(currNode) && visited.get(currNode) <= edgesUsed) {
            continue;
        }

        // We can use no more than k + 1 edges
        if(edgesUsed >= k + 1) {
            continue;
        }

        // Mark current node visited and how many edges was used
        visited.set(currNode, edgesUsed);

        // Otherwise, visit neighbors
        for(const [neighbor, neighborCost] of adjList.get(currNode)) {
                minPQ.push([neighbor, edgesUsed + 1], currCost + neighborCost);
        }

    }

    // Edge Case
    return -1; // there is no such route
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