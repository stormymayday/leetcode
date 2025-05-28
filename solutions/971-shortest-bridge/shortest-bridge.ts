function shortestBridge(grid: number[][]): number {
    // Step 1: Find the first island
    let firstIsland = null;
    outer: for(let r = 0; r < grid.length; r++) {
        for(let c = 0; c < grid[0].length; c++) {
            if(grid[r][c] === 1) {
                firstIsland = matrixDFS(grid, r, c, new Set());
                break outer;
            }
        }
    }

    // Step 2: BFS towards the second island
    return matrixBFS(grid, firstIsland) - 1;
};

function isInBounds(grid, r, c) {
    const rowInBounds = 0 <= r && r < grid.length;
    const colInBounds = 0 <= c && c < grid[0].length;
    return rowInBounds && colInBounds;
}

function matrixDFS(grid, r, c, visited) {
    // Base Case 1: Out of bounds
    if(isInBounds(grid, r, c) === false) {
        return visited;
    }

    // Base Case 2: Water
    if(grid[r][c] === 0) {
        return visited;
    }

    // Base Case 3: Visited
    const position = `${r},${c}`;
    if(visited.has(position)) {
        return visited;
    }

    // Recursive Step
    visited.add(position);

    // Explore four directions
    matrixDFS(grid, r - 1, c, visited);
    matrixDFS(grid, r + 1, c, visited);
    matrixDFS(grid, r, c - 1, visited);
    matrixDFS(grid, r, c + 1, visited);

    // return the set of island positions
    return visited;
}

function matrixBFS(grid, firstIslandPositions) {

    const visited = new Set(firstIslandPositions);
    const queue = [];

    for(const position of firstIslandPositions) {
        const [row, col] = position.split(',').map(Number);
        queue.push({row: row, col: col, distance: 0});
    }

    while(queue.length > 0) {

        const {row, col, distance} = queue.shift();
        const currentPosition = `${row},${col}`;
        if(grid[row][col] === 1 && !firstIslandPositions.has(currentPosition)) {
            return distance;
        }

        const deltas = [[-1, 0],[1, 0], [0, -1], [0, 1]];
        for(const delta of deltas) {
            const [rowDelta, colDelta] = delta;
            const neighborRow = row + rowDelta;
            const neighborCol = col + colDelta;
            const neighborPosition = `${neighborRow},${neighborCol}`;
            if(isInBounds(grid, neighborRow, neighborCol) && !visited.has(neighborPosition)) {
                visited.add(neighborPosition);
                queue.push({row: neighborRow, col: neighborCol, distance: distance + 1});
            }
        }

    }

    // second island is guaranteed, thus, late return is required
}