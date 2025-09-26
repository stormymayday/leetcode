function shortestPathAllKeys(grid: string[]): number {

    const ROWS = grid.length;
    const COLS = grid[0].length;

    // Perform a linear scan on the grid to find number of keys and starting position
    let numKeys = 0;
    let startRow = 0;
    let startCol = 0;
    for (let row = 0; row < ROWS; row += 1) {
        for (let col = 0; col < COLS; col += 1) {
            if (
                grid[row][col] === 'a' ||
                grid[row][col] === 'b' ||
                grid[row][col] === 'c' ||
                grid[row][col] === 'd' ||
                grid[row][col] === 'e' ||
                grid[row][col] === 'f'
            ) {
                numKeys += 1;
            }
            if (grid[row][col] === '@') {
                startRow = row;
                startCol = col;
            }
        }
    }

    return matrixBFS(startRow, startCol, grid, numKeys);

};

function matrixBFS(row: number, col: number, grid: string[], numKeys: number): number {

    const ROWS = grid.length;
    const COLS = grid[0].length;

    let queue: [number, number, number, Set<string>][] = []; // [row, col, distance, key set]
    queue.push([row, col, 0, new Set<string>()]);

    // const visited: boolean[][] = new Array(ROWS);
    // for (let row = 0; row < ROWS; row += 1) {
    //     visited[row] = new Array(COLS).fill(false);
    // }
    // visited[row][col] = true;
    const visited = new Set<string>();
    visited.add(`${row},${col}`);

    while (queue.length > 0) {

        const nextQueue: [number, number, number, Set<string>][] = [];
        for (let i = 0; i < queue.length; i += 1) {

            const [currRow, currCol, currDist, currKeySet] = queue[i];

            if (
                grid[currRow][currCol] === 'a' ||
                grid[currRow][currCol] === 'b' ||
                grid[currRow][currCol] === 'c' ||
                grid[currRow][currCol] === 'd' ||
                grid[currRow][currCol] === 'e' ||
                grid[currRow][currCol] === 'f'
            ) {
                currKeySet.add(grid[currRow][currCol]);
                if (currKeySet.size === numKeys) {
                    return currDist;
                }
            }

            const directions: [number, number][] = [
                [-1, 0], // up
                [0, 1], // right
                [1, 0], // down
                [0, -1], // left
            ];
            for (const [rowDelta, colDelta] of directions) {
                const neighborRow = currRow + rowDelta;
                const neighborCol = currCol + colDelta;
                // const neighborPosition = `${neighborRow},${neighborCol}`;
                const sortedKeys = Array.from(currKeySet).sort().join("");
                if (
                    // out of bounds check
                    0 <= neighborRow && neighborRow < ROWS &&
                    0 <= neighborCol && neighborCol < COLS &&
                    // visited check
                    // visited[neighborRow][neighborCol] === false &&
                    !visited.has(`${neighborRow},${neighborCol},${sortedKeys}`) &&
                    // wall check
                    grid[neighborRow][neighborCol] !== '#' &&
                    // check if it's NOT a lock OR (if it is) do we have the key
                    ((
                        grid[neighborRow][neighborCol] !== 'A' &&
                        grid[neighborRow][neighborCol] !== 'B' &&
                        grid[neighborRow][neighborCol] !== 'C' &&
                        grid[neighborRow][neighborCol] !== 'D' &&
                        grid[neighborRow][neighborCol] !== 'E' &&
                        grid[neighborRow][neighborCol] !== 'F'
                    ) || currKeySet.has(grid[neighborRow][neighborCol].toLowerCase()))
                ) {
                    // visited[neighborRow][neighborCol] = true;
                    visited.add(`${neighborRow},${neighborCol},${sortedKeys}`);
                    nextQueue.push([neighborRow, neighborCol, currDist + 1, new Set(currKeySet)]);
                }
            }

        }
        if (nextQueue.length > 0) {
            queue = nextQueue;
        } else {
            break;
        }

    }
    return -1;
}