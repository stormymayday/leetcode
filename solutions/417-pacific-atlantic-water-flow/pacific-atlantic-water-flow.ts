function pacificAtlantic(heights: number[][]): number[][] {

    const ROWS = heights.length;
    const COLS = heights[0].length;

    // Intersection of both is the answer
    const pacificVisited = new Set<string>();
    const atlanticVisited = new Set<string>();

    // 1. Constructing 'pacificQueue' and marking coords as visited using 'pacificVisited'
    const pacificQueue: number[][] = [];
    // Top Row
    for (let col = 0; col < COLS; col += 1) {
        pacificQueue.push([0, col]);
        pacificVisited.add(`${0},${col}`);
    }
    // Left Col
    for (let row = 0; row < ROWS; row += 1) {
        pacificQueue.push([row, 0]);
        pacificVisited.add(`${row},${0}`);
    }
    // 2. Run BFS on the 'pacificQueue' using 'pacificVisited'
    matrixBFS(heights, pacificQueue, pacificVisited);

    // 3. Constructing 'atlanticQueue' and marking coords as visited using 'atlanticVisited'
    const atlanticQueue: number[][] = [];
    // Bottom Row
    for (let col = 0; col < COLS; col += 1) {
        atlanticQueue.push([ROWS - 1, col]);
        atlanticVisited.add(`${ROWS - 1},${col}`);
    }
    // Right Col
    for (let row = 0; row < ROWS; row += 1) {
        atlanticQueue.push([row, COLS - 1]);
        atlanticVisited.add(`${row},${COLS - 1}`);
    }
    // 4. Run BFS on the 'atlanticQueue' using 'atlanticVisited'
    matrixBFS(heights, atlanticQueue, atlanticVisited);

    // 5. Constructing the result
    const res: number[][] = [];
    for (const coords of pacificVisited) {
        if (atlanticVisited.has(coords)) {
            const [row, col] = coords.split(",").map(Number);
            res.push([row, col]);
        }
    }
    return res;
};

function matrixBFS(grid: number[][], queue: number[][], visited: Set<string>): void {

    const ROWS = grid.length;
    const COLS = grid[0].length;

    while (queue.length > 0) {
        const [row, col] = queue.shift();
        const directions: [number, number][] = [
            [-1, 0], // up
            [0, 1], // right
            [1, 0], // down
            [0, -1], // left
        ];
        for (const [rowDelta, colDelta] of directions) {
            const neighborRow = row + rowDelta;
            const neighborCol = col + colDelta;
            const neighborPosition = `${neighborRow},${neighborCol}`;
            if (
                // out of bounds check
                0 <= neighborRow && neighborRow < ROWS &&
                0 <= neighborCol && neighborCol < COLS &&
                // visited check
                !visited.has(neighborPosition) &&
                // elevation check
                grid[row][col] <= grid[neighborRow][neighborCol]
            ) {
                visited.add(neighborPosition);
                queue.push([neighborRow, neighborCol]);
            }
        }
    }
}