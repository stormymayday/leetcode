function shortestDistance(maze: number[][], start: number[], destination: number[]): number {

    const ROWS = maze.length;
    const COLS = maze[0].length;

    // [distance, row, col]
    const heap: [number, number, number][] = [[0, start[0], start[1]]];

    const visited = new Set<string>(); // key -> `${row},${col}`

    // Dijkstra's
    while(heap.length > 0) {

        heap.sort((a, b) => {
            return a[0] - b[0];
        });

        const [distance, row, col] = heap.shift();

        if(row === destination[0] && col === destination[1]) {
            return distance;
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

            let currRow = row;
            let currCol = col;
            let currDist = 0;

            while(
                // Out of bounds check
                0 <= currRow + rowDelta && currRow + rowDelta < ROWS &&
                0 <= currCol + colDelta && currCol + colDelta < COLS &&
                // Walls check
                maze[currRow + rowDelta][currCol + colDelta] !== 1
            ) {
                currRow += rowDelta;
                currCol += colDelta;
                currDist += 1;
            }

            heap.push([currDist + distance, currRow, currCol]);

        }

    }

    // Edge Case: ball cannot stop at destination
    return -1;
    
};