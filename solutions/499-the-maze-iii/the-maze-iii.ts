function findShortestWay(maze: number[][], ball: number[], hole: number[]): string {
    
    const ROWS = maze.length;
    const COLS = maze[0].length;

    // [distance, path, row, col]
    const heap: [number, string, number, number][] = [[0, "", ball[0], ball[1]]];

    const visited = new Set<string>();

    while(heap.length > 0) {

        heap.sort((a, b) => {
            if(a[0] !== b[0]) {
                return a[0] - b[0];
            } else {
                return a[1].localeCompare(b[1]);
            }
        });

        const [distance, path, row, col] = heap.shift();

        if(row === hole[0] && col === hole[1]) {
            return path;
        }

        const currPosition = `${row},${col}`;
        if(visited.has(currPosition)) {
            continue;
        }
        visited.add(currPosition);

        const directions: [number, number, string][] = [
            [-1, 0, "u"], // up
            [0, 1, "r"], // right
            [1, 0, "d"], // down
            [0, -1, "l"] // left
        ];
        for(const [rowDelta, colDelta, direction] of directions) {

            let currRow = row;
            let currCol = col;
            let currDist = 0;

            while(
                // out of bounds check
                0 <= currRow + rowDelta && currRow + rowDelta < ROWS &&
                0 <= currCol + colDelta && currCol + colDelta < COLS &&
                // wall check
                maze[currRow + rowDelta][currCol + colDelta] !== 1
            ){
                currRow += rowDelta;
                currCol += colDelta;
                currDist += 1;

                // Hole check
                if(currRow === hole[0] && currCol === hole[1]) {
                    break;
                }

            }

            heap.push([currDist + distance, path + direction, currRow, currCol]);

        }

    }

    return "impossible";

};