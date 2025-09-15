function minimumEffortPath(heights: number[][]): number {

    const ROWS = heights.length;
    const COLS = heights[0].length;

    const minPQ = new CustomMinPriorityQueue<[number, number]>(); // val: [row, col], prio: max absolute difference
    minPQ.push([0, 0], 0); // starting with effort of 0

    const visited = new Set<string>();

    let minEffort = 0;
    while(minPQ.length > 0) {

        const { val: [row, col], prio: currMaxAbsDiff } = minPQ.pop();

        if(row === ROWS - 1 && col === COLS - 1) {
            minEffort = currMaxAbsDiff;
            break;
        }

        const currPosition = `${row},${col}`;
        if(visited.has(currPosition)) {
            continue;
        }
        visited.add(currPosition);

        const directions: [number, number][] = [
            [-1, 0], // up
            [0, 1], // right
            [1, 0], // down
            [0, -1], // left
        ];
        for(const [rowDelta, colDelta] of directions) {
            const neighborRow = row + rowDelta;
            const neighborCol = col + colDelta;
            const neighborPosition = `${neighborRow},${neighborCol}`;
            if(
                // Out of bounds check
                0 <= neighborRow && neighborRow < ROWS &&
                0 <= neighborCol && neighborCol < COLS &&
                // visited check
                !visited.has(neighborPosition)
            ) {
                
                const currAbsDiff = Math.abs(heights[row][col] - heights[neighborRow][neighborCol]);
                const newMaxAbsDiff = Math.max(currMaxAbsDiff, currAbsDiff);

                minPQ.push([neighborRow, neighborCol], newMaxAbsDiff);

            }
        }

    }
    return minEffort;
    
};

class PriorityQueueNode<T> {
    public val: T;
    public prio: number;
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
        while(currIdx > 0 && this.data[currIdx].prio < this.data[parentIdx].prio) {
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
    top(): number | undefined {
        return this.length > 0 ? this.data[0].prio : undefined;
    }
    swap(idx1: number, idx2: number): void {
        const temp = this.data[idx1];
        this.data[idx1] = this.data[idx2];
        this.data[idx2] = temp;
    }
}