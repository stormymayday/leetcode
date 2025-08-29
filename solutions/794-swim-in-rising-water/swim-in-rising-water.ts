function swimInWater(grid: number[][]): number {

    const n = grid.length;

    // 1. Initialze a priority queue (Naive Priority Queue)
    const minPQ: [number, number, number][] = []; // [maxElevation, row, col]
    minPQ.push([grid[0][0], 0, 0]);

    // 2. Visited set
    const visited = new Set<string>();

    // 3. Run Dijkstra's on matrix
    while(minPQ.length > 0) {

        // Immitating a priority queue
        minPQ.sort((a, b) => a[0] - b[0]);

        const [maxElevation, row, col] = minPQ.shift();

        if(row === n - 1 && col === n - 1) {
            return maxElevation;
        }
        
        const position = `${row},${col}`;
        if(visited.has(position)) {
            continue;
        }
        visited.add(position);

        const directions: [number, number][] = [
            [-1, 0], // up
            [0, 1], // right
            [1, 0], // down
            [0, -1], // left
        ];
        for(const [rowDelta, colDelta] of directions) {

            const neighborRow = row + rowDelta;
            const neighborCol = col + colDelta;
            const neighborPosition = `${neighborRow},${neighborCol}`;

            if(
                // out of bounds check
                0 <= neighborRow && neighborRow < n &&
                0 <= neighborCol && neighborCol < n &&
                // visited check
                !visited.has(neighborPosition)
            ) {

                const newMaxElevation = Math.max(maxElevation, grid[neighborRow][neighborCol]);
                minPQ.push([newMaxElevation, neighborRow, neighborCol]);

            }

        }
    }
    
};