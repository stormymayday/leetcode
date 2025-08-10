function minCostConnectPoints(points: number[][]): number {
    // 1. Creating a weighted edge list
    const weightedEdgeList: [number,number,number][] = [];
    for(let currNode = 0; currNode < points.length - 1; currNode += 1) {
        for(let nextNode = currNode + 1; nextNode < points.length; nextNode += 1) {
            const weight = Math.abs(points[currNode][0] - points[nextNode][0]) +
                           Math.abs(points[currNode][1] - points[nextNode][1]);
            weightedEdgeList.push([currNode, nextNode,weight]);
        }
    }

    // 2. Initiallizing a priority queue
    const pq = new CustomPriorityQueue<[number, number]>();
    for(const edge of weightedEdgeList) {
        const [src, dst, weight] = edge;
        pq.push([src, dst], weight);
    }

    // 3. 
    const uf = new UnionFind(points.length);
    let edgesUsed = 0; // should be n - 1
    let mstCost = 0;
    while(edgesUsed !== points.length - 1) {
        const queueNode = pq.pop();
        if(queueNode !== null) {
            const [src, dst] = queueNode.val;
            const weight = queueNode.priority;
            if(uf.union(src, dst) === true) {
                edgesUsed += 1;
                mstCost += weight;
            }
        }
    }
    return mstCost;
};

class QueueNode<T> {
    val: T;
    priority: number;
    constructor(val: T, priority: number) {
        this.val = val;
        this.priority = priority;
    }
}

class CustomPriorityQueue<T> {
    private heap: QueueNode<T>[];
    public length: number;
    constructor() {
        this.heap = [];
        this.length = 0;
    }
    push(val: T, priority: number): void {
        const newNode = new QueueNode(val, priority);
        this.heap.push(newNode);
        this.length += 1;
        let currIdx = this.heap.length - 1;
        let parentIdx = Math.floor((currIdx - 1) / 2);
        while(currIdx > 0 && this.heap[currIdx].priority < this.heap[parentIdx].priority) {
            const temp = this.heap[currIdx];
            this.heap[currIdx] = this.heap[parentIdx];
            this.heap[parentIdx] = temp;
            currIdx = parentIdx;
            parentIdx = Math.floor((currIdx - 1) / 2);
        }
    }
    pop(): QueueNode<T> | null {
        if(this.heap.length === 0) {
            return null;
        }
        if(this.heap.length === 1) {
            this.length -= 1;
            return this.heap.pop();
        }
        const result = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.length -= 1;
        this.siftDown(0);
        return result;
    }
    siftDown(idx: number):void {
        let currIdx = idx;
        while(currIdx < this.heap.length - 1) {
            const leftChildIdx = currIdx * 2 + 1;
            const rightChildIdx = currIdx * 2 + 2;
            const leftChildPriority = this.heap[leftChildIdx] === undefined ? Infinity : this.heap[leftChildIdx].priority;
            const rightChildPriority = this.heap[rightChildIdx] === undefined ? Infinity : this.heap[rightChildIdx].priority;
            const smallerChildPrioIdx = leftChildPriority < rightChildPriority ? leftChildIdx : rightChildIdx;
            const smallerChildPrio = leftChildPriority < rightChildPriority ? leftChildPriority : rightChildPriority;
            if(this.heap[currIdx].priority > smallerChildPrio) {
                const temp = this.heap[currIdx];
                this.heap[currIdx] = this.heap[smallerChildPrioIdx];
                this.heap[smallerChildPrioIdx] = temp;
                currIdx = smallerChildPrioIdx;
            } else {
                break;
            }
        }
    }
}

class UnionFind {
    private roots: Map<number, number>;
    private sizes: Map<number, number>;
    constructor(n: number) {
        this.roots = new Map();
        this.sizes = new Map();
        for(let i = 0; i < n; i += 1) {
            this.roots.set(i, i);
            this.sizes.set(i, 1);
        }
    }
    find(x: number):number {
        const root = this.roots.get(x);
        if(root !== x) {
            this.roots.set(x, this.find(root));
        }
        return this.roots.get(x);
    }
    union(x: number, y: number): boolean {
        const rootX = this.find(x);
        const rootY = this.find(y);
        if(rootX === rootY) {
            return false;
        } else {
            if(this.sizes.get(rootX) >= this.sizes.get(rootY)) {
                this.roots.set(rootY, rootX);
                this.sizes.set(rootX, this.sizes.get(rootX) + this.sizes.get(rootY));
            } else {
                this.roots.set(rootX, rootY);
                this.sizes.set(rootY, this.sizes.get(rootY) + this.sizes.get(rootX));
            }
            return true;
        }
    }
}
