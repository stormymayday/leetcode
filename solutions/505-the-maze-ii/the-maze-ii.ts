function shortestDistance(maze: number[][], start: number[], destination: number[]): number {

    const ROWS = maze.length;
    const COLS = maze[0].length;

    // [distance, row, col]
    const heap: [number, number, number][] = [[0, start[0], start[1]]];

    // const visited = new Map<string, number>(); // key `${row},${col}` -> distance
    // Track visited positions
    const visited = new Set<string>();

    while (heap.length > 0) {

        heap.sort((a, b) => {
            return a[0] - b[0];
        });

        const [startingDistance, startingRow, startingCol] = heap.shift();

        if (startingRow === destination[0] && startingCol === destination[1]) {
            return startingDistance;
        }

        const currentPosition = `${startingRow},${startingCol}`;
        if (visited.has(currentPosition)) {
            continue;
        }
        visited.add(currentPosition);

        const deltas = [
            [-1, 0], // up
            [0, 1], // right
            [1, 0], // down
            [0, -1], // left
        ];
        for (const [rowDelta, colDelta] of deltas) {

            let currRow = startingRow;
            let currCol = startingCol;
            let distance = 0;

            while (
                // out of bounds check
                0 <= currRow + rowDelta && currRow + rowDelta < ROWS &&
                0 <= currCol + colDelta && currCol + colDelta < COLS &&
                // wall check
                maze[currRow + rowDelta][currCol + colDelta] !== 1
            ) {
                currRow += rowDelta;
                currCol += colDelta;
                distance += 1;
            }
            heap.push([startingDistance + distance, currRow, currCol]);
        }

    }

    return -1;

};