function pacificAtlantic(heights: number[][]): number[][] {

    const ROWS = heights.length;
    const COLS = heights[0].length;

    // Intersection of both is the answer
    const pacificVisited = new Set<string>();
    const atlanticVisited = new Set<string>();

    // Running DFS on Top Row (Pacific) using 'pacificVisited'
    // AND 
    // Running DFS on Bottom Row (Pacific) using 'atlanticVisited'
    for (let col = 0; col < COLS; col += 1) {

        if (!pacificVisited.has(`${0},${col}`)) {
            matrixDFS(0, col, heights, pacificVisited, heights[0][col]);
        }

        if (!atlanticVisited.has(`${ROWS - 1},${col}`)) {
            matrixDFS(ROWS - 1, col, heights, atlanticVisited, heights[ROWS - 1][col]);
        }

    }

    // Running DFS on Left Col (Pacific) using 'pacificVisited'
    // AND
    // Running DFS on Right Col (Atlantic) using 'atlanticVisited'
    for (let row = 0; row < ROWS; row += 1) {

        if (!pacificVisited.has(`${row},${0}`)) {
            matrixDFS(row, 0, heights, pacificVisited, heights[row][0]);
        }

        if (!atlanticVisited.has(`${row},${COLS - 1}`)) {
            matrixDFS(row, COLS - 1, heights, atlanticVisited, heights[row][COLS - 1]);
        }

    }

    // Constructing the result
    const res: number[][] = [];
    for (const coords of pacificVisited) {
        if (atlanticVisited.has(coords)) {
            const [row, col] = coords.split(",").map(Number);
            res.push([row, col]);
        }
    }
    return res;
};

function matrixDFS(row: number, col: number, grid: number[][], visited: Set<string>, previousHeight: number): void {
    // Base Case 1: Out of bounds
    if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) {
        return;
    }

    // Base Case 2: visited check
    const position = `${row},${col}`;
    if (visited.has(position)) {
        return;
    }

    // Base Case 3: elevation check
    if (previousHeight > grid[row][col]) {
        return;
    }

    // Recursive Step
    visited.add(position);
    const directions: [number, number][] = [
        [-1, 0], // up
        [0, 1], // right
        [1, 0], // down
        [0, -1], // left
    ];
    for (const [rowDelta, colDelta] of directions) {
        const neighborRow = row + rowDelta;
        const neighborCol = col + colDelta;
        matrixDFS(neighborRow, neighborCol, grid, visited, grid[row][col]);
    }
    return;
}