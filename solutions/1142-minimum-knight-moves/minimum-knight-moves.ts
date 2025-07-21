function minKnightMoves(x: number, y: number): number {
    const visited = new Set<string>();
    visited.add(`${0},${0}`);
    const queue = [[0, 0, 0]]; // knightRow, knightCol, distance
    while(queue.length > 0) {
        const [row, col, distance] = queue.shift();
        if(row === x && col === y) {
            return distance;
        }
        const deltas = [
            [-2, -1], // up up left
            [-2, 1], // up up right
            [-1, -2], // left left up
            [1, -2], // left left down
            [2, 1], // down down right
            [2, -1], // down down left
            [-1, 2], // right right down
            [1, 2], // right right up
        ];
        for(const delta of deltas) {
            const [rowDelta, colDelta] = delta;
            const neighborRow = row + rowDelta;
            const neighborCol = col + colDelta;
            const neighborPosition = `${neighborRow},${neighborCol}`;
            if(!visited.has(neighborPosition)) {
                visited.add(neighborPosition);
                queue.push([neighborRow, neighborCol, distance + 1]);
            }
        }
    }
    return -1;
};