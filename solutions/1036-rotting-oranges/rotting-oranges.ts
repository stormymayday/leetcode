function orangesRotting(grid: number[][]): number {
    let freshOranges: number = 0;
    let time: number = 0;
    let queue: [number, number][] = [];
    const visited = new Set<string>();
    for(let row = 0; row < grid.length; row += 1) {
        for(let col = 0; col < grid[0].length; col += 1) {
            const current = grid[row][col];
            if(current === 1) {
                freshOranges += 1;
            }
            if(current === 2) {
                queue.push([row, col]);
                visited.add(`${row},${col}`);
            }
        }
    }
    while(queue.length > 0) {
        const n = queue.length;
        const nextLayer: [number, number][] = [];
        for(let i = 0; i < n ; i += 1) {
            const [row, col] = queue.shift();
            const deltas = [
                [-1, 0], // up
                [0, 1], // right
                [1, 0], // down
                [0, -1], // left
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
                    grid[neighborRow][neighborCol] === 1
                ) {
                    visited.add(neighborPosition);
                    freshOranges -= 1;
                    nextLayer.push([neighborRow, neighborCol]);
                }
            }
        }
        if(nextLayer.length !== 0) {
            time += 1; // avoid off by one error
        }
        queue = nextLayer;
    }
    if(freshOranges === 0) {
        return time;
    } else {
        return -1;
    }
};