function findCheapestPrice(n: number, flights: number[][], src: number, dst: number, k: number): number {
    // 1. Build a weighted adjacency list
    const adjList = new Map<number, [number, number][]>(); // src -> [[dst, cost], ...]
    for(let i = 0; i < n; i += 1) {
        adjList.set(i, []);
    }
    for(const [src, dst, cost] of flights) {
        adjList.get(src).push([dst, cost]);
    }

    // 2. Initialze a priority queue with the source node
    const minPQ = new CustomMinPriorityQueue<[number, number]>(); // val: [node, stops], prio: cost
    minPQ.push([src, 0], 0);

    // 3. Visited set and result
    const visited = new Set<string>(); // key is a string `${node},${steps}`

    // 4. Dijkstra's
    while(minPQ.length > 0) {
        const { val: [currNode, steps], prio: cost } = minPQ.pop();
        
        // 1. Check if already visited this (node, steps) combination
        const key = `${currNode},${steps}`;
        if (visited.has(key)) continue;
        visited.add(key);
        
        // 2. Check if we reached destination
        if (currNode === dst) {
            return cost; // Found the answer!
        }
        
        // 3. Check if we can still make more flights
        if (steps >= k + 1) continue; // Used all allowed stops
        
        // 4. Explore neighbors
        for (const [neighbor, flightCost] of adjList.get(currNode)!) {
            minPQ.push([neighbor, steps + 1], cost + flightCost);
        }
    }

    return -1; // No path found
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