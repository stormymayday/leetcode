function shortestBridge(grid: number[][]): number {
    // 1. Looking for the first island
    const firstIsland = new Set<string>();
    for(let r = 0; r < grid.length; r += 1) {
        for(let c = 0; c < grid[0].length; c += 1) {
            // Found a piece of land
            if(grid[r][c] === 1) {
                // 2. Explore the first island to capture it's position/coordinates
                dfs(grid, r, c, firstIsland);
                // 3. Run bfs from the first island towards the second island
                return bfs(grid, firstIsland);
            }
        }
    }
    
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

    // const visited = new Set();

    const queue = [];
    for(const position of firstIsland) {
        // unpacking the position string into numbers
        const rowCol = position.split(",");
        // enqueueing the position as integers and adding distance of 0
        queue.push([parseInt(rowCol[0]), parseInt(rowCol[1]), 0]);
    }

    while(queue.length > 0) {

        const [row, col, distance] = queue.shift();

        const deltas = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        for(const delta of deltas) {
            const [rowDelta, colDelta] = delta;
            const neighborRow = rowDelta + row;
            const neighborCol = colDelta + col;
            const neighborPosition = `${neighborRow},${neighborCol}`;
            // Out of bounds or Visited
            if(isInBounds(grid, neighborRow, neighborCol) === false || firstIsland.has(neighborPosition)) {
                continue;
            }

            // If it's a land then we found the second island
            if(grid[neighborRow][neighborCol] === 1) {
                return distance;
            }
            
            // Otherwise, mark as visited and enqueue the neighbor increasing the distance
            firstIsland.add(neighborPosition);
            queue.push([neighborRow, neighborCol, distance + 1]);
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