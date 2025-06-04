function shortestPathBinaryMatrix(grid: number[][]): number {
    if (grid[0][0] !== 0 || grid[grid.length - 1][grid[0].length - 1] !== 0) {
        return -1;
    }
    const visited = new Set();
    return matrixBFS(grid, 0, 0, visited);
};

function matrixBFS(grid, r, c, visited) {

    const queue = [{row: r, col: c, distance: 1}];
    visited.add(`${r},${c}`);

    while(queue.length > 0) {

        const {row, col, distance} = queue.shift();

        if(row === grid.length - 1 && col === grid[0].length - 1) {
            return distance;
        }

        const deltas = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1],  [1, 0],  [1, 1]
        ];
        for(const delta of deltas) {
            const [rowDelta, colDelta] = delta;
            const neighborRow = row + rowDelta;
            const neighborCol = col + colDelta;
            const neighborPosition = `${neighborRow},${neighborCol}`;
            if(
                isInBounds(grid, neighborRow, neighborCol) === true
                && grid[neighborRow][neighborCol] !== 1
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

    return -1;
}

function isInBounds(grid, r, c) {
    const rowInBounds = 0 <= r && r < grid.length;
    const colInBounds = 0 <= c && c < grid[0].length;
    return rowInBounds && colInBounds;
}