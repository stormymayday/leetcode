function numIslands(grid: string[][]): number {
    let count = 0;
    const visited = new Set();
    for(let r = 0; r < grid.length; r++) {
        for(let c = 0; c < grid[0].length; c++) {
            if(matrixDFS(grid, r, c, visited) === true) {
                count += 1;
            }
        }
    }
    return count;
};

function matrixDFS(grid, r, c, visited) {
    // Base Case 1: Out of bounds
    const rowInBounds = 0 <= r && r < grid.length;
    const colInBounds = 0 <= c && c < grid[0].length;
    if(!rowInBounds || !colInBounds) {
        return false;
    }

    // Base Case 2: Visited
    const position = `${r},${c}`;
    if(visited.has(position)) {
        return false;
    } else {
        visited.add(position);
    }

    // Base Case 3: Water
    if(grid[r][c] === '0') {
        return false;
    }

    matrixDFS(grid, r - 1, c, visited);
    matrixDFS(grid, r + 1, c, visited);
    matrixDFS(grid, r, c - 1, visited);
    matrixDFS(grid, r, c + 1, visited);
    return true;
}