function shortestBridge(grid: number[][]): number {
    let firstIsland = null;
    outer: for(let r = 0; r < grid.length; r += 1) {
        for(let c = 0; c < grid[0].length; c += 1) {
            if(grid[r][c] === 1) {
                firstIsland = dfs(grid, r, c, new Set());
                break outer;
            }
        }
    }

    return bfs(grid, firstIsland);
};

function dfs(grid, r, c, visited) {
    if(isInBounds(grid, r, c) === false) {
        return visited;
    }

    if(grid[r][c] === 0) {
        return visited;
    }

    const position = `${r},${c}`;
    if(visited.has(position)) {
        return visited;
    }

    visited.add(position);
    
    dfs(grid, r - 1, c, visited);
    dfs(grid, r + 1, c, visited);
    dfs(grid, r, c - 1, visited);
    dfs(grid, r, c + 1, visited);

    return visited;
}

function bfs(grid, firstIsland) {
    const visited = new Set(firstIsland);
    // visited.add(firstIsland);
    const queue = [];
    for(const position of firstIsland) {
        const [r, c] = position.split(',').map(Number);
        queue.push({row: r, col: c, distance: 0});
    }
    while(queue.length > 0) {

        const {row, col, distance} = queue.shift();
        
        const position = `${row},${col}`;
        if(grid[row][col] === 1 && !firstIsland.has(position)) {
            return distance - 1;
        }

        const deltas = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        for(const delta of deltas) {
            const [rowDelta, colDelta] = delta;
            const neighborRow = row + rowDelta;
            const neighborCol = col + colDelta;
            const neighborPosition = `${neighborRow},${neighborCol}`;
            if(
                isInBounds(grid, neighborRow, neighborCol) === true
                && !visited.has(neighborPosition)
            ) {
                visited.add(neighborPosition);
                queue.push({
                    row: neighborRow,
                    col: neighborCol,
                    distance: distance + 1
                });
            }
        }

    }
}

function isInBounds(grid, r, c) {
    const rowInBounds = 0 <= r && r < grid.length;
    const colInBounds = 0 <= c && c < grid[0].length;
    return rowInBounds && colInBounds;
}