function shortestBridge(grid: number[][]): number {
    // 1. Looking for the first island
    const firstIsland = new Set<string>();
    outer: for(let r = 0; r < grid.length; r += 1) {
        for(let c = 0; c < grid[0].length; c += 1) {
            // Found a piece of land
            if(grid[r][c] === 1) {
                // 2. Explore the first island to capture it's position/coordinates
                dfs(grid, r, c, firstIsland);
                break outer;
            }
        }
    }

    // 3. Run bfs from the first island towards the second island
    return bfs(grid, firstIsland);
};

function dfs(grid: number[][], r: number, c:number, visited) {
    // Base Case: out of bounds
    if(isInBounds(grid, r, c) === false) {
        return;
    }

    // Base Case: water
    if(grid[r][c] === 0) {
        return;
    }

    // Base Case: visited
    const position = `${r},${c}`;
    if(visited.has(position)) {
        return;
    }

    // Save current position
    visited.add(position);

    dfs(grid, r - 1, c, visited);
    dfs(grid, r + 1, c, visited);
    dfs(grid, r, c - 1, visited);
    dfs(grid, r, c + 1, visited);

    // must return here!
    return;
}

function bfs(grid:number[][], firstIsland: Set<string>):number {

    const visited = new Set();

    const queue = [];
    for(const position of firstIsland) {
        // unpacking the position string into numbers
        const rowCol = position.split(",");
        // enqueueing the position as integers and adding distance of 0
        queue.push([parseInt(rowCol[0]), parseInt(rowCol[1]), 0]);
    }

    while(queue.length > 0) {

        const [row, col, distance] = queue.shift();

        // Check if we are on a piece of land AND it's not the first island
        if(grid[row][col] === 1 && !firstIsland.has(`${row},${col}`)) {
            // Found the second island!
            return distance - 1;
        }

        const deltas = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        for(const delta of deltas) {
            const [rowDelta, colDelta] = delta;
            const neighborRow = rowDelta + row;
            const neighborCol = colDelta + col;
            const neighborPosition = `${neighborRow},${neighborCol}`;
            if(
                isInBounds(grid, neighborRow, neighborCol) === true
                && !visited.has(neighborPosition)
                // Note: must explore water as well
                // && grid[neighborRow][neighborCol] !== 0
            ) {
                visited.add(neighborPosition);
                queue.push([
                    neighborRow,
                    neighborCol,
                    distance + 1
                ]);
            }
        }

    }

    // Optinal: there should be a second island
    return -1;

}

function isInBounds(grid: number[][], r: number, c: number):boolean {
    const rowInBounds = 0 <= r && r < grid.length;
    const colInBounds = 0 <= c && c < grid[0].length;
    return rowInBounds === true && colInBounds === true;
}