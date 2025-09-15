function maxProbability(n: number, edges: number[][], succProb: number[], start_node: number, end_node: number): number {

    const edgeList: [number, number, number][] = [];
    for(let i = 0; i < edges.length; i += 1) {
        const [src, dst] = edges[i];
        const cost = succProb[i];
        edgeList.push([src, dst, cost]);
    }

    const adjList = buildAdjList(n, edgeList);

    const maxPQ = new CustomMaxPriorityQueue<number>(); // val: node (number)
    maxPQ.push(start_node, 1);

    const visited = new Set<number>();

    while(maxPQ.length > 0) {

        const { val: currNode, prio: currCost } = maxPQ.pop();

        if(currNode === end_node) {
            return currCost;
        }

        if(visited.has(currNode)) {
            continue;
        }

        visited.add(currNode);

        for(const [neighbor, neighborCost] of adjList.get(currNode)) {
            if(!visited.has(neighbor)) {
                maxPQ.push(neighbor, currCost * neighborCost);
            }
        }

    }

    return 0;
    
};

function buildAdjList(n: number, edges: [number, number, number][]): Map<number, [number, number][]> {
    const adjList = new Map();
    for(let i = 0; i < n; i += 1) {
        adjList.set(i, []);
    }
    for(const [src, dst, cost] of edges) {
        adjList.get(src).push([dst, cost]);
        adjList.get(dst).push([src, cost]);
    }
    return adjList;
}

class PriorityQueueNode<T> {
    public val: T;
    public prio: number;
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
        const newNode = new PriorityQueueNode(val, prio);
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
    pop(): PriorityQueueNode<T> | undefined {
        if(this.length === 0) {
            return undefined;
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
    heapify(vals: PriorityQueueNode<T>[]): void {
        this.data = [...vals];
        this.length = vals.length;
        let currIdx = Math.floor((this.length - 2) / 2);
        while(currIdx >= 0) {
            this.siftDown(currIdx);
            currIdx -= 1;
        }
    }
    top(): number | undefined {
        return this.length > 0 ? this.data[0].prio : undefined;
    }
    swap(idx1: number, idx2: number): void {
        const temp = this.data[idx1];
        this.data[idx1] = this.data[idx2];
        this.data[idx2] = temp;
    }
}