function nearestExit(maze: string[][], entrance: number[]): number {
    return matrixBFS(entrance[0], entrance[1], maze);
};

function matrixBFS(row: number, col: number, grid: string[][]): number {

    const ROWS = grid.length;
    const COLS = grid[0].length;

    let queue: [number, number, number][] = [];
    queue.push([row, col, 0]);

    const visited: boolean[][] = new Array(ROWS);
    for(let row = 0; row < ROWS; row += 1) {
        visited[row] = new Array(COLS).fill(false);
    }
    visited[row][col] = true;

    while(queue.length > 0) {

        const nextQueue: [number, number, number][] = [];

        for(let i = 0; i < queue.length; i += 1) {

            const [currRow, currCol, currDist] = queue[i];

            // Check if we have reached an exit
            if(
                // (cell on the border)
                (currRow === 0 || currRow === ROWS - 1 || currCol === 0 || currCol === COLS - 1) &&
                // AND not the entrance
                !(currRow === row && currCol === col)
                ) {
                return currDist;
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
                    visited[neighborRow][neighborCol] === false &&
                    // wall check
                    grid[neighborRow][neighborCol] !== '+'
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