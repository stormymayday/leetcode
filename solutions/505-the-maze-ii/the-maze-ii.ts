function shortestDistance(maze: number[][], start: number[], destination: number[]): number {

    const ROWS = maze.length;
    const COLS = maze[0].length;

    // [distance, row, col]
    const heap: [number, number, number][] = [[0, start[0], start[1]]];

    const visited = new Map<string, number>(); // key `${row},${col}` -> distance

    while (heap.length > 0) {

        heap.sort((a, b) => {
            return a[0] - b[0];
        });

        const [startingDistance, startingRow, startingCol] = heap.shift();

        if (startingRow === destination[0] && startingCol === destination[1]) {
            return startingDistance;
        }

        const deltas = [
            [-1, 0], // up
            [0, 1], // right
            [1, 0], // down
            [0, -1], // left
        ];
        for (const [rowDelta, colDelta] of deltas) {

            let currentRow = startingRow;
            let currentCol = startingCol;
            let currentDistance = startingDistance;

            while (
                // out of bounds check
                0 <= currentRow + rowDelta && currentRow + rowDelta < ROWS &&
                0 <= currentCol + colDelta && currentCol + colDelta < COLS &&
                // wall check
                maze[currentRow + rowDelta][currentCol + colDelta] !== 1
            ) {
                currentRow += rowDelta;
                currentCol += colDelta;
                currentDistance += 1;
            }

            // Rollback
            // currentRow -= rowDelta;
            // currentCol -= colDelta;
            // currentDistance -= 1;
            const currentPosition = `${currentRow},${currentCol}`;

            if(!visited.has(currentPosition) || visited.get(currentPosition) > currentDistance) {
                visited.set(currentPosition, currentDistance);
                heap.push([currentDistance, currentRow, currentCol]);
            }


        }

    }

    return -1;

};