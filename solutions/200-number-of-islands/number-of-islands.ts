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
    if(!isInBounds(grid, r, c)) {
        return false;
    }
    if(grid[r][c] === '0') {
        return false;
    }
    const position = `${r},${c}`;
    if(visited.has(position)) {
        return false;
    } else {
        visited.add(position);
    }

    matrixDFS(grid, r - 1, c, visited);
    matrixDFS(grid, r + 1, c, visited);
    matrixDFS(grid, r, c - 1, visited);
    matrixDFS(grid, r, c + 1, visited);

    return true;
}

function isInBounds(grid, r, c) {
    const rowInBounds = 0 <= r && r < grid.length;
    const colInBounds = 0 <= c && c < grid[0].length;
    return rowInBounds && colInBounds;
}