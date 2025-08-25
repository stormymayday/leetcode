function maxProbability(n: number, edges: number[][], succProb: number[], start_node: number, end_node: number): number {

    // 1. Create a weighted adjacency list
    const adjList = new Map<number, [number, number][]>(); // src -> [[dst, prob], ...]
    for(let i = 0; i < n; i += 1) {
        adjList.set(i, []);
    }
    for(let i = 0; i < edges.length; i += 1) {
        const [src, dst] = edges[i];
        adjList.get(src).push([dst, succProb[i]]);
        adjList.get(dst).push([src, succProb[i]]);
    }

    // 2. Set up a visited set
    const visited = new Set<number>();

    // 3. Initialize a max priority queue with souce node and probability of 1!
    const maxPQ = new CustomMaxPriorityQueue<number>(); // val: node, prio: probability
    maxPQ.push(start_node, 1);

    // 4. Perform Dijkstra's
    while(maxPQ.length > 0) {
        const { val: currNode, prio: currProb } = maxPQ.pop();

        if(currNode === end_node) {
            return currProb;
        }

        if(visited.has(currNode)) {
            continue;
        }

        visited.add(currNode);

        for(const [neighbor, neighborProb] of adjList.get(currNode)) {
            if(!visited.has(neighbor)) {
                maxPQ.push(neighbor, currProb * neighborProb);
            }
        }
    }
    
    // there is no path from start to end
    return 0;
};

class PriorityQueueNode<T> {
    val: T;
    prio: number;
    constructor(val: T, prio: number) {
        this.val = val;
        this.prio = prio;
    }
}

class CustomMaxPriorityQueue<T> {
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
        while(currIdx > 0 && this.data[currIdx].prio > this.data[parentIdx].prio) {
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
            const leftChildPrio = this.data[leftChildIdx] === undefined ? -Infinity : this.data[leftChildIdx].prio;
            const rightChildPrio = this.data[rightChildIdx] === undefined ? -Infinity : this.data[rightChildIdx].prio;
            const largerChildIdx = leftChildPrio > rightChildPrio ? leftChildIdx : rightChildIdx;
            const largerChildPrio = leftChildPrio > rightChildPrio ? leftChildPrio : rightChildPrio;
            if(this.data[currIdx].prio < largerChildPrio) {
                this.swap(currIdx, largerChildIdx);
                currIdx = largerChildIdx;
            } else {
                break;
            }
        }
    }
    top(): number | null {
        return this.length > 0 ? this.data[0].prio : null;
    }
    heapify(values: PriorityQueueNode<T>[]): void {
        this.data = [...values];
        this.length = values.length;
        let currIdx = Math.floor((this.length - 2) / 2);
        while(currIdx >= 0) {
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