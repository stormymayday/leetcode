function shortestDistance(maze: number[][], start: number[], destination: number[]): number {
    
    const ROWS = maze.length;
    const COLS = maze[0].length;

    // 1. Initalize a (naive) priority queue
    const minPQ: [number, number, number][] = []; // [distance, row, col]
    minPQ.push([0, start[0], start[1]]);

    // 2. Visited set
    const visited = new Set<string>();

    // 3. Dijkstra on matrix
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
            [0, -1] // left
        ];
        for(const [rowDelta, colDelta] of directions) {

            let currRow = row;
            let currCol = col;
            let currDist = 0;

            while(
                // out of bounds check
                0 <= currRow + rowDelta && currRow + rowDelta < ROWS &&
                0 <= currCol + colDelta && currCol + colDelta < COLS &&
                // wall check
                maze[currRow + rowDelta][currCol + colDelta] !== 1
            ) {

                // Advance
                currRow += rowDelta;
                currCol += colDelta;
                currDist += 1;

            }

            if(!visited.has(`${currRow},${currCol}`)) {

                minPQ.push([currDist + distance, currRow, currCol]);

            }

        }

    }

    // ball cannot stop at destination
    return -1;
};