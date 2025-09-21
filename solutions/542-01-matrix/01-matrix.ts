function updateMatrix(mat: number[][]): number[][] {
    
    const ROWS = mat.length;
    const COLS = mat[0].length;

    const matCopy: number[][] = new Array(ROWS);
    for(let row = 0; row < ROWS; row += 1) {
        matCopy[row] = [...mat[row]];
    }

    matrixBFS(matCopy);

    return matCopy;

};

function matrixBFS(grid: number[][]): void {

    const ROWS = grid.length;
    const COLS = grid[0].length;

    let queue: [number, number, number][] = [];
    const visited: boolean[][] = new Array(ROWS);
    for(let row = 0; row < ROWS; row += 1) {
        visited[row] = new Array(COLS).fill(false);
    }
    
    for(let row = 0; row < ROWS; row += 1) {
        for(let col = 0; col < COLS; col += 1) {
            if(grid[row][col] === 0) {
                queue.push([row, col, 0]);
                visited[row][col] = true;
            }
        }
    }

    while(queue.length > 0) {

        const nextQueue: [number, number, number][] = [];

        for(let i = 0; i < queue.length; i += 1) {

            const [currRow, currCol, currDist] = queue[i];

            if(grid[currRow][currCol] === 1) {
                grid[currRow][currCol] = currDist;
            }

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
                    visited[neighborRow][neighborCol] === false
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

}