function maxAreaOfIsland(grid: number[][]): number {
    let max = -Infinity;
    const visited = new Set();
    for(let r = 0; r < grid.length; r++) {
        for(let c = 0; c < grid[0].length; c++) {
            max = Math.max(max, matrixDFS(grid, r, c, visited));
        }
    }
    return max;
};

function matrixDFS(grid, r, c, visited) {
    // Base Case 1: Out of bounds
    const rowInBounds = 0 <= r && r < grid.length;
    const colInBounds = 0 <= c && c < grid[0].length;
    if(!rowInBounds || !colInBounds) {
        return 0;
    }

    // Base Case 2: Visited
    const position = `${r},${c}`;
    if(visited.has(position)) {
        return 0;
    } else {
        visited.add(position);
    }

    // Base Case 3: Water
    if(grid[r][c] === 0) {
        return 0;
    }

    let size = 1;
    size += matrixDFS(grid, r - 1, c, visited);
    size += matrixDFS(grid, r + 1, c, visited);
    size += matrixDFS(grid, r, c - 1, visited);
    size += matrixDFS(grid, r, c + 1, visited);
    return size;
}