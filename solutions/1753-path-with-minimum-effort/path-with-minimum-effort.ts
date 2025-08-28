function minimumEffortPath(heights: number[][]): number {

    const ROWS = heights.length;
    const COLS = heights[0].length;

    // 1. Initialize a priority queue
    const minPQ = new CustomMinPriorityQueue<[number, number]>(); // val: [row, col], prio: maxAbsDiff
    minPQ.push([0, 0], 0); // starting off with row = 0, col = 0, maxAbsDiff = 0

    // 2. Set up a visited set
    const visited = new Set<string>(); // key -> `${row},${col}`

    // 3. Perform Dijkstra's on a matrix
    while(minPQ.length > 0) {
        // Getting the top element from priority queue
        const { val: [row, col], prio: maxAbsDiff } = minPQ.pop();

        // Check if we have reached the end node
        if(row === ROWS - 1 && col === COLS - 1) {
            return maxAbsDiff;
        }

        // Check if current node has been visited
        if(visited.has(`${row},${col}`)) {
            continue; // skip
        }
        // Otherwise, mark it as visited
        visited.add(`${row},${col}`);

        // Visit neighbors (up, right, down, left)
        const deltas = [
            [-1, 0], // up
            [0, 1], // right
            [1, 0], // down
            [0, -1], // left
        ];
        for(const delta of deltas) {
            const [rowDelta, colDelta] = delta;
            const neighborRow = rowDelta + row;
            const neighborCol = colDelta + col;
            const neighborPosition = `${neighborRow},${neighborCol}`;
            if(
                // Out of bounds check
                0 <= neighborRow && neighborRow < ROWS &&
                0 <= neighborCol && neighborCol < COLS &&
                // visited check
                !visited.has(neighborPosition)
            ) {
                // Calculate current absolute difference
                const currAbsDiff = Math.abs(heights[row][col] - heights[neighborRow][neighborCol]);
                const newMaxAbsDiff = Math.max(maxAbsDiff, currAbsDiff);
                minPQ.push([neighborRow, neighborCol], newMaxAbsDiff);
            }
        }
    }

    return -1; // should not trigger
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