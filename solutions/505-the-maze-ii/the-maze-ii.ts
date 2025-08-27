function shortestDistance(maze: number[][], start: number[], destination: number[]): number {
    
    const ROWS = maze.length;
    const COLS = maze[0].length;

    // [distance, row, col]
    const heap: [number, number, number][] = [[0, start[0], start[1]]];

    const visited = new Map<string, number>(); // key: `${row},${col}` -> val: distance

    while(heap.length > 0) {

        heap.sort((a, b) => {
            return a[0] - b[0];
        });

        const [distance, row, col] = heap.shift();

        if(row === destination[0] && col === destination[1]) {
            return distance;
        }

        const directions: [number, number][] = [
            [-1, 0], // up
            [0, 1], // right
            [1, 0], // down
            [0, -1], // left
        ];
        for(const [rowDelta, colDelta] of directions) {

            let currRow = row;
            let currCol = col;
            let currDist = 0;

            while(
                // Out of bounds check
                0 <= currRow && currRow < ROWS &&
                0 <= currCol && currCol < COLS &&
                // walls check
                maze[currRow][currCol] !== 1
            ) {

                currRow += rowDelta;
                currCol += colDelta;
                currDist += 1;
            }

            // Rollback
            currRow -= rowDelta;
            currCol -= colDelta;
            currDist -= 1;

            const currPosition = `${currRow},${currCol}`;

            if(!visited.has(currPosition) || visited.get(currPosition) > currDist + distance) {
                visited.set(currPosition, currDist + distance);
                heap.push([currDist + distance, currRow, currCol]);
            }

        }

    }

    return -1;
};