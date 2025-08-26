function shortestDistance(maze: number[][], start: number[], destination: number[]): number {

    const ROWS: number = maze.length;
    const COLS: number = maze[0].length;

    // Initialize distance 2D Array with Infinity values
    const distances: number[][] = new Array(ROWS);
    for(let i = 0; i < ROWS; i += 1) {
        distances[i] = new Array(COLS).fill(Infinity);
    }
    
    // Set starting position distance to 0
    distances[start[0]][start[1]] = 0;
    
    // Run Dijkstra's algorithm
    dijkstra(maze, start, distances);
    
    // Return result: -1 if unreachable, otherwise the shortest distance
    return distances[destination[0]][destination[1]] === Infinity ? -1 : distances[destination[0]][destination[1]];
}

function dijkstra(maze, start, distances) {

    const ROWS: number = maze.length;
    const COLS: number = maze[0].length;
    
    // Initialize a min Priority queue with starting position and distnace of zero
    const minPQ = new CustomMinPriorityQueue<[number, number]>(); // val: [row, col] , prio: distance
    minPQ.push([start[0], start[1]], 0);
    
    while (minPQ.length > 0) {

        const {val: [startingRow, startingCol], prio: currDist } = minPQ.pop();
        
        // Skip if we've already found a shorter path to this position
        if (distances[startingRow][startingCol] < currDist) {
            continue;
        }
        
        // Explore all four directions
        const deltas = [
            [-1, 0], // up
            [0, 1], // right
            [1, 0], // down
            [0, -1] // left
        ];
        for (const [rowDelta, colDelta] of deltas) {
            let currentRow = rowDelta + startingRow;
            let currentCol = colDelta + startingCol;
            let distance = 0;
            
            // Roll the ball until it hits a wall or boundary
            while (
                // out of bounds check
                0 <= currentRow && currentRow < ROWS &&
                0 <= currentCol && currentCol < COLS &&
                // wall check
                maze[currentRow][currentCol] !== 1
                ) {
                currentRow += rowDelta;
                currentCol += colDelta;
                distance += 1;
            }
            
            // When the loop exits when the next position would be invalid (wall or out of bounds)
            // Therefore, we need to step back to the last valid position
            const endingRow = currentRow - rowDelta;
            const endingCol = currentCol - colDelta;
            
            // If we found a shorter path to this stopping position
            const newDistance = distances[startingRow][startingCol] + distance;
            if (newDistance < distances[endingRow][endingCol]) {
                distances[endingRow][endingCol] = newDistance;
                minPQ.push([endingRow, endingCol], newDistance);
            }
        }
    }
}

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