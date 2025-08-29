function swimInWater(grid: number[][]): number {

    const n = grid.length;

    const minPQ: [number, number, number][] = [] // [currMaxElevation, row, col]
    minPQ.push([grid[0][0], 0, 0]);
    const visited = new Set<string>();
    // let minTime = 0;
    while(minPQ.length > 0) {
        
        // Priority Queue Immitation
        minPQ.sort((a, b) => a[0] - b[0]);

        const [currElevation, row, col] = minPQ.shift();

        if(row === n - 1 && col === n - 1) {
            return currElevation;
        }

        const currPosition = `${row},${col}`;
        if(visited.has(currPosition)) {
            continue;
        }
        visited.add(currPosition);

        const directions: [number, number][] = [
            [-1, 0], // up
            [0, 1], // right
            [1, 0], // down
            [0, -1], // left
        ];
        for(const [rowDelta, colDelta] of directions) {
            const neighborRow = rowDelta + row;
            const neighborCol = colDelta + col;
            const neighborPosition = `${neighborRow},${neighborCol}`;
            if(
                // Out of bounds check
                0 <= neighborRow && neighborRow < n &&
                0 <= neighborCol && neighborCol < n &&
                // visited check
                !visited.has(neighborPosition)
            ) {

                const newMaxElevation = Math.max(currElevation, grid[neighborRow][neighborCol]);
                minPQ.push([newMaxElevation, neighborRow, neighborCol]);

            }
        }
    }
    // return minTime;
    return - 1; // just to have number return value
};