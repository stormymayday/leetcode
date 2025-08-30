function findShortestWay(maze: number[][], ball: number[], hole: number[]): string {
    
    const ROWS = maze.length;
    const COLS = maze[0].length;

    // 1. Initalize a (naive) priority queue
    const minPQ: [number, string, number, number][] = []; // [distance, path, row, col]
    minPQ.push([0, "", ball[0], ball[1]]);

    // 2. Simple visited set
    const visited = new Map<string, [number, string]>(); // key: `${row},${col}` -> [distance, path]

    // 3. Run Dijkstra's
    while(minPQ.length > 0) {

        minPQ.sort((a, b) => {
            if(a[0] !== b[0]) {
                return a[0] - b[0];
            } else {
                return a[1].localeCompare(b[1]);
            }
        });

        const [distance, path, row, col] = minPQ.shift();

        if(row === hole[0] && col === hole[1]) {
            return path;
        }

        const position = `${row},${col}`;
        if(visited.has(position)) {
            continue;
        }
        visited.set(position, [distance, path]);

        const directions: [number, number, string][] = [
            [-1, 0, "u"], // up
            [0, 1, "r"], // right
            [1, 0, "d"], // down
            [0, -1, "l"], // left
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
            ) {

                currRow += rowDelta;
                currCol += colDelta;
                currDist += 1;

                if(currRow === hole[0] && currCol === hole[1]) {
                    break;
                }
            }

            const currPosition = `${currRow},${currCol}`;
            if(
                // position has not been visited
                !visited.has(currPosition) ||
                // position has been visited BUT with greater distance
                visited.get(currPosition)[0] > currDist + distance ||
                // position has been visited with same distane BUT via a lexographically greater path
                (visited.get(currPosition)[0] === currDist + distance && visited.get(currPosition)[1] > path + direction)

            ) {
                minPQ.push([currDist + distance, path + direction, currRow, currCol]);
            }
        }

    }

    return "impossible";

};