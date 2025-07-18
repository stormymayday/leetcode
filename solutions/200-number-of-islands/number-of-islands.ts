function numIslands(grid: string[][]): number {
    const visited = new Set();
    let count = 0;
    for(let r = 0; r < grid.length; r += 1) {
        for(let c = 0; c < grid[0].length; c += 1) {
            if(grid[r][c] === '1' && !visited.has(`${r},${c}`)) {
                if(matrixBFS(grid, r, c, visited) === true) {
                    count += 1;
                }
            }
        }
    }
    return count;
};

function matrixBFS(grid, r, c, visited) {

    if(visited.has(`${r},${c}`)) {
        return false;
    }

    visited.add(`${r},${c}`);
    const queue = [[r, c]];

    while(queue.length > 0) {
        const [row, col] = queue.shift();
        const deltas = [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1]
        ];
        for(const delta of deltas) {
            const [rowDelta, colDelta] = delta;
            const neighborRow = row + rowDelta;
            const neighborCol = col + colDelta;
            const neighborPosition = `${neighborRow},${neighborCol}`;
            if(
                isInBounds(grid, neighborRow, neighborCol) === true
                && !visited.has(neighborPosition)
                && grid[neighborRow][neighborCol] === '1'
            ) {
                visited.add(neighborPosition);
                queue.push([neighborRow, neighborCol]);
            }
        }
    }
    return true;
}

function matrixDFS(grid, r, c, visited) {

    if(visited.has(`${r},${c}`)) {
        return false;
    }

    visited.add(`${r},${c}`);

    const stack = [[r,c]];
    while(stack.length > 0) {

        const [row, col] = stack.pop();

        const deltas = [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1]
        ];

        for(const delta of deltas) {
            const [rowDelta, colDelta] = delta;
            const neighborRow = row + rowDelta;
            const neighborCol = col + colDelta;
            const neighborPosition = `${neighborRow},${neighborCol}`;
            if(
                isInBounds(grid, neighborRow, neighborCol) === true
                && !visited.has(neighborPosition)
                && grid[neighborRow][neighborCol] === '1'
            ) {
                visited.add(neighborPosition);
                stack.push([neighborRow, neighborCol]);
            }
        }
        
    }
    return true;
}

function matrixRDFS(grid, r, c, visited) {
    // Base Case: out of bounds check
    if(isInBounds(grid, r, c) === false) {
        return false;
    }

    // Base Case: water check
    if(grid[r][c] === '0') {
        return false;
    }

    // Base Case: visited check
    const position = `${r},${c}`;
    if(visited.has(position)) {
        return false;
    }

    visited.add(position);

    matrixRDFS(grid, r - 1, c, visited);
    matrixRDFS(grid, r + 1, c, visited);
    matrixRDFS(grid, r, c - 1, visited);
    matrixRDFS(grid, r, c + 1, visited);

    return true;

}

function isInBounds(grid, r, c) {
    const rowInBounds = 0 <= r && r < grid.length;
    const colInBounds = 0 <= c && c < grid[0].length;
    return rowInBounds && colInBounds;
}