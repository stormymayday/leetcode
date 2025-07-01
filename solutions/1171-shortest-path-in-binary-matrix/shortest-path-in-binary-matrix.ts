function shortestPathBinaryMatrix(grid: number[][]): number {
    const visited = new Set<string>();
    return bfs(grid, 0, 0, visited);
};

function bfs(grid: number[][], r: number, c: number, visited: Set<string>):number {
    // Edge Case: starting position is a wall
    if(grid[r][c] === 1) {
        return -1;
    }

    visited.add(`${r},${c}`);
    const queue = [[r, c, 1]];
    while(queue.length > 0) {
        const [row, col, distance] = queue.shift();
        if(row === grid.length -1 && col === grid[0].length - 1) {
            return distance;
        }
        const deltas = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1], [1, 0],   [1, 1]
        ];
        for(const delta of deltas) {
            const [rowDelta, colDelta] = delta;
            const neighborRow = row + rowDelta;
            const neighborCol = col + colDelta;
            const neighborPosition = `${neighborRow},${neighborCol}`;
            if(
                isInBounds(grid, neighborRow, neighborCol) === true
                && !visited.has(neighborPosition)
                && grid[neighborRow][neighborCol] !== 1
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
    return -1;
}

function isInBounds(grid:number[][], r: number, c: number):boolean {
    const rowInBounds:boolean = 0 <= r && r < grid.length;
    const colInBounds:boolean = 0 <= c && c < grid[0].length;
    return rowInBounds === true && colInBounds === true;
}