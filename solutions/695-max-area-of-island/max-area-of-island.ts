function maxAreaOfIsland(grid: number[][]): number {
    let largest = 0;
    const visited = new Set();
    for(let r = 0; r < grid.length; r++) {
        for(let c = 0; c < grid[0].length; c++) {
            largest = Math.max(largest, matrixDFS(grid, r, c, visited));
        }
    }
    return largest;
};

function matrixDFS(grid, r, c, visited) {
    // Base Case 1: Out of bounds
    const rowInBounds = 0 <= r && r < grid.length;
    const colInBounds = 0 <= c && c < grid[0].length;
    if(!rowInBounds || !colInBounds) {
        return 0;
    }

    // Base Case 2: visited
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

    // Explore Up, Down, Left, and Right
    let size = 1;
    size += matrixDFS(grid, r - 1, c, visited);
    size += matrixDFS(grid, r + 1, c, visited);
    size += matrixDFS(grid, r, c - 1, visited);
    size += matrixDFS(grid, r, c + 1, visited);
    return size;
}