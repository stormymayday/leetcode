function shortestPathBinaryMatrix(grid: number[][]): number {

    // Edge Case: blocked start or end
    if(grid[0][0] === 1 || grid[grid.length - 1][grid[0].length - 1] === 1) {
        return -1;
    }

    return matrixBFS(grid);
    
};

function matrixBFS(grid: number[][]): number {

    const ROWS = grid.length;
    const COLS = grid[0].length;

    let queue: [number, number, number][] = [];
    queue.push([0, 0, 1]); // [row, col, distance]

    const visited: boolean[][] = new Array(ROWS);
    for(let row = 0; row < ROWS; row += 1) {
        visited[row] = new Array(COLS).fill(false);
    }
    visited[0][0] = true;

    while(queue.length > 0) {

        const nextQueue: [number, number, number][] = [];

        for(let i = 0; i < queue.length; i += 1) {

            const [currRow, currCol, currDist] = queue[i];

            if(currRow === ROWS - 1 && currCol === COLS - 1) {
                return currDist;
            }

            const directions: [number, number][] = [
                [-1, -1],[-1, 0],[-1, 1],
                [0, -1],          [0, 1],
                [1, -1], [1, 0], [1, 1]
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
                    // clear path check
                    grid[neighborRow][neighborCol] === 0
                ) {
                    visited[neighborRow][neighborCol] = true;
                    nextQueue.push([neighborRow, neighborCol, currDist + 1]);
                }
            }

        }

        if(nextQueue.length > 0) {
            queue = nextQueue;
        } else {
            break;
        }

    }

    return -1;
}