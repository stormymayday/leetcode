function shortestDistance(maze: number[][], start: number[], destination: number[]): number {

    const ROWS = maze.length;
    const COLS = maze[0].length;

    const minPQ: [number, number, number][] = []; // [distance, row, col]
    minPQ.push([0, start[0], start[1]]);

    const visited = new Set<string>();

    while(minPQ.length > 0) {

        minPQ.sort((a, b) => a[0] - b[0]);

        const [distance, row, col] = minPQ.shift();

        if(row === destination[0] && col === destination[1]) {
            return distance;
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

            let currRow = row;
            let currCol = col;
            let currDist = 0;

            while(
                // Out of bounds check
                0 <= currRow + rowDelta && currRow + rowDelta < ROWS &&
                0 <= currCol + colDelta && currCol + colDelta < COLS &&
                // Wall check
                maze[currRow + rowDelta][currCol + colDelta] !== 1
            ) {
                
                // Advance
                currRow += rowDelta;
                currCol += colDelta;
                currDist += 1;

            }

            // At the wall now
            const currPosition = `${currRow},${currCol}`;
            if(!visited.has(currPosition)) {
                minPQ.push([distance + currDist, currRow, currCol]);
            }
        }
    }

    // ball cannot stop at destination
    return -1;
};