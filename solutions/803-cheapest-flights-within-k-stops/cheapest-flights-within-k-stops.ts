function findCheapestPrice(n: number, flights: number[][], src: number, dst: number, k: number): number {

    // Build adjacency list: city -> [[destination, cost], ...]
    const adjList = new Map<number, [number, number][]>();
    for (let i = 0; i < n; i++) {
        adjList.set(i, []);
    }
    for (const [start, end, cost] of flights) {
        adjList.get(start).push([end, cost]);
    }

    // Initialize visited map to track minimum edges used to reach each city
    const visited = new Map<number, number>(); // node -> edgesUsed
    
    // Min heap
    const minPQ = new CustomMinPriorityQueue<[number, number]>(); // val: [city, edgesUsed], prio: cost
    minPQ.push([src, 0], 0); //
    
    while (minPQ.length > 0) {
        
        const { val: [currNode, currEdgesUsed ], prio: currCost } = minPQ.pop();

        // The first time we visit the destination is guaranteed to be the shortest
        if(currNode === dst) {
            return currCost;
        }

        // If the node has been visited AND it took less edges to get to
        if(visited.has(currNode) && visited.get(currNode) <= currEdgesUsed) {
            continue;
        }

        // Mark currNode as visited with current number of edges used
        visited.set(currNode, currEdgesUsed);

        // We can't use more edges (can use at most k + 1 edges)
        if(currEdgesUsed >= k + 1) {
            continue;
        }

        // Explore neighbors
        for(const [neighbor, neighborCost] of adjList.get(currNode)) {
            minPQ.push([neighbor, currEdgesUsed + 1], currCost + neighborCost);
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