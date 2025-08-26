function swimInWater(grid: number[][]): number {

    const ROWS = grid.length;
    const COLS = grid[0].length;
    
    // 1. Initaliza a priortiy queue with starting node (row = 0, col = 0) and it's elevation value
    const minPQ = new CustomMinPriorityQueue<[number, number]>(); // val: [row, col], prio: currMaxElevation
    minPQ.push([0, 0], grid[0][0]);

    // 2. Set up a visited set
    const visited = new Set<string>(); // key -> `${row},${col}`

    // 3. Perform Dijkstra's on a matrix
    while(minPQ.length > 0) {

        const { val: [row, col], prio: currMaxElevation } = minPQ.pop();

        if(row === ROWS - 1 && col == COLS - 1) {
            return currMaxElevation;
        }

        if(visited.has(`${row},${col}`)) {
            continue;
        }

        visited.add(`${row},${col}`);

        const deltas: [number, number][] = [
            [-1, 0], // up
            [0, 1], // right
            [1, 0], // down
            [0, -1] // left
        ];
        for(const [rowDelta, colDelta] of deltas) {
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
                const neighborElevation = grid[neighborRow][neighborCol];
                const newMaxElevation = Math.max(currMaxElevation, neighborElevation);
                minPQ.push([neighborRow, neighborCol], newMaxElevation);
            }
        }

    }

    return - 1; // should not trigger
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