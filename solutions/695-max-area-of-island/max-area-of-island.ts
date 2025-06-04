function maxAreaOfIsland(grid: number[][]): number {
    let largest = 0;
    const visited = new Set();
    for(let r = 0; r < grid.length; r += 1) {
        for(let c = 0; c < grid[0].length; c += 1) {
            if(grid[r][c] === 1) {
                largest = Math.max(largest, matrixDFS(grid, r, c, visited));
            }
        }
    }
    return largest;
};

function matrixDFS(grid, r, c, visited) {
    if(isInBounds(grid, r, c) === false) {
        return 0;
    }

    if(grid[r][c] === 0) {
        return 0;
    }

    const position = `${r},${c}`;
    if(visited.has(position)) {
        return 0;
    }

    visited.add(position);

    let count = 1;
    count += matrixDFS(grid, r - 1, c, visited);
    count += matrixDFS(grid, r + 1, c, visited);
    count += matrixDFS(grid, r, c - 1, visited);
    count += matrixDFS(grid, r, c + 1, visited);

    return count;
}

function isInBounds(grid, r, c) {
    const rowInBounds = 0 <= r && r < grid.length;
    const colInBounds = 0 <= c && c < grid[0].length;
    return rowInBounds && colInBounds;
}