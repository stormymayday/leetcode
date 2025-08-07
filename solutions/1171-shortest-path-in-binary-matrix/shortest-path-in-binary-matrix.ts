function shortestPathBinaryMatrix(grid: number[][]): number {
    // Edge Case: starting cell is 1
    if(grid[0][0] === 1) {
        return -1;
    }
    return matrixBFS(grid);
};

function matrixBFS(grid:number[][]):number {
    const visited = new Set<string>();
    visited.add(`${0},${0}`);
    const queue: [number, number, number][] = [[0, 0, 1]]; // row, col, distance
    while(queue.length > 0) {
        const [row, col, distance] = queue.shift();
        if(row === grid.length - 1 && col === grid[0].length - 1) {
            return distance;
        }
        const deltas = [
            [-1, -1],[-1, 0],[-1,1],
            [0, -1],         [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];
        for(const delta of deltas) {
            const [rowDelta, colDelta] = delta;
            const neighborRow = rowDelta + row;
            const neighborCol = colDelta + col;
            const neighborPosition = `${neighborRow},${neighborCol}`;
            if(
                0 <= neighborRow && neighborRow < grid.length &&
                0 <= neighborCol && neighborCol < grid[0].length &&
                !visited.has(neighborPosition) &&
                grid[neighborRow][neighborCol] !== 1
            ) {
                visited.add(neighborPosition);
                queue.push([neighborRow, neighborCol, distance + 1]);
            }
        }
    }
    return -1; // not found
}