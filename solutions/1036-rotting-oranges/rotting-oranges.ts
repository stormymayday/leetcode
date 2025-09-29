function orangesRotting(grid: number[][]): number {

    const ROWS = grid.length;
    const COLS = grid[0].length;

    // 1. Scan the grid to:
    // - count number of fresh oranges
    let freshOranges = 0;
    // - Queue up rotten oranges' position with 0 initial time and mark it 'visited'
    const visited: boolean[][] = new Array(ROWS);
    for(let row = 0; row < ROWS; row += 1) {
        visited[row] = new Array(COLS).fill(false);
    }
    let queue: [number, number, number][] = [];
    for (let row = 0; row < ROWS; row += 1) {
        for (let col = 0; col < COLS; col += 1) {
            if (grid[row][col] === 1) {
                freshOranges += 1;
            }
            if (grid[row][col] === 2) {
                queue.push([row, col, 0]);
                visited[row][col] = true;
            }
        }
    }

    // Edge Case: no fresh oranges?

    // 2. Run Multi-Source BFS
    let time = 0;
    while(queue.length > 0) {

        const nextQueue: [number, number, number][] = [];
        for(let i = 0; i < queue.length; i += 1) {

            const [currRow, currCol, currTime] = queue[i];
            time = currTime;
            // freshOranges -= 1;

            const directions: [number, number][] = [
                [-1, 0], // up
                [0, 1], // right
                [1, 0], // down
                [0, -1], // left
            ];
            for(const [rowDelta, colDelta] of directions) {
                const neighborRow = currRow + rowDelta;
                const neighborCol = currCol + colDelta;
                if(
                    // out of bounds check
                    0 <= neighborRow && neighborRow < ROWS &&
                    0 <= neighborCol && neighborCol < COLS &&
                    // visited check
                    visited[neighborRow][neighborCol] === false &&
                    // fresh orange check
                    grid[neighborRow][neighborCol] === 1
                ) {
                    visited[neighborRow][neighborCol] = true;
                    nextQueue.push([neighborRow, neighborCol, currTime + 1]);
                    freshOranges -= 1;
                }
            }

        }

        if(nextQueue.length > 0) {
            queue = nextQueue;
        } else {
            break;
        }

    }

    // 3. Check if freshOranges is 0
    if(freshOranges !== 0) {
        return -1; // some fresh oranges left
    } else {
        return time; // time it took for all fresh oranges to rot
    }
    
};