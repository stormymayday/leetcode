function shortestDistance(grid: number[][]): number {

    const ROWS = grid.length;
    const COLS = grid[0].length;

    // 1. Count number of houses
    let numHouses = 0;
    for (let row = 0; row < ROWS; row += 1) {
        for (let col = 0; col < COLS; col += 1) {
            if (grid[row][col] === 1) {
                numHouses += 1;
            }
        }
    }

    // 2. Run BFS from every 'empty land' cell and get the minDistance
    let minDistance = Infinity;
    for (let row = 0; row < ROWS; row += 1) {
        for (let col = 0; col < COLS; col += 1) {
            if (grid[row][col] === 0) {
                const currMin = matrixBFS(row, col, grid, numHouses);
                minDistance = Math.min(minDistance, currMin);
            }
        }
    }

    if (minDistance === Infinity) {
        return -1;
    } else {
        return minDistance;
    }

};

function matrixBFS(row: number, col: number, grid: number[][], numHouses: number): number {

    const ROWS = grid.length;
    const COLS = grid[0].length;

    let queue: [number, number, number][] = []; // [row, col, distance]
    queue.push([row, col, 0]); // starting distance zero
    // const visited = new Set<string>();
    // visited.add(`${row},${col}`);
    const visited = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
    visited[row][col] = true;

    let housesReached = 0;
    let totalDistance = 0;

    outer: while (queue.length > 0) {

        const n = queue.length;
        const nextQueue: [number, number, number][] = [];

        for (let i = 0; i < n; i += 1) {
            const [currRow, currCol, currDist] = queue[i];
            // If this cell is a house, then add the distance from source to this cell
            if (grid[currRow][currCol] === 1) {
                totalDistance += currDist;
                housesReached += 1;
                if (housesReached === numHouses) {
                    break outer;
                }
                // and we go past from this cell.
                continue;
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
                const neighborPosition = `${neighborRow},${neighborCol}`;
                if (
                    // out of bounds check
                    0 <= neighborRow && neighborRow < ROWS &&
                    0 <= neighborCol && neighborCol < COLS &&
                    // visited check
                    // !visited.has(neighborPosition) &&
                    visited[neighborRow][neighborCol] === false &&
                    // obstacle check
                    grid[neighborRow][neighborCol] !== 2
                ) {
                    // visited.add(neighborPosition);
                    visited[neighborRow][neighborCol] = true;
                    nextQueue.push([neighborRow, neighborCol, currDist + 1]);
                }
            }
        }

        if (nextQueue.length > 0) {
            queue = nextQueue;
        } else {
            break;
        }

    }

    if (housesReached === numHouses) {
        return totalDistance;
    } else {
        // If we did not reach all houses, then any cell visited also cannot reach all houses.
        // Set all cells visted to 2 so we do not check them again and return MAX_VALUE.
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
                // if (grid[row][col] == 0 && visited.has(`${row},${col}`)) {
                if (grid[row][col] == 0 && visited[row][col] === true) {
                    grid[row][col] = 2;
                }
            }
        }
        return Infinity;
    }
}