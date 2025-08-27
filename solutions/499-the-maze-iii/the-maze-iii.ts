function findShortestWay(maze: number[][], ball: number[], hole: number[]): string {

    const ROWS = maze.length;
    const COLS = maze[0].length;

    // [distance, directions, row, col]
    const heap: [number, string, number, number][] = [[0, "", ball[0], ball[1]]];

    const visited = new Map<string, [number, string]>(); // key: `${row},${col}` -> [distance, directions]
    visited.set(`${ball[0]},${ball[1]}`, [0, ""]);

    while(heap.length > 0) {

        heap.sort((a, b) => {
            if(a[0] !== b[0]) {
                return a[0] - b[0];
            } else {
                return a[1].localeCompare(b[1]);
            }
        });

        const [startingDist, startingDir, startingRow, startingCol] = heap.shift() as [number, string, number, number];

        if(startingRow === hole[0] && startingCol === hole[1]) {
            return startingDir;
        }

        const deltas: [number, number, string][] = [
            [-1, 0, "u"], // up
            [0, 1, "r"], // right
            [1, 0, "d"], // down
            [0, -1, "l"], // left
        ];
        for(const [rowDelta, colDelta, dir] of deltas) {

            let currentRow: number = startingRow;
            let currentCol: number = startingCol;
            let currentDistance: number = startingDist;

            while(
                // out of bounds check
                0 <= (currentRow + rowDelta) && (currentRow + rowDelta) < ROWS &&
                0 <= (currentCol + colDelta) && (currentCol + colDelta) < COLS &&
                // wall check
                maze[currentRow + rowDelta][currentCol + colDelta] !== 1
            ) {
                // Advance
                currentRow += rowDelta;
                currentCol += colDelta;
                currentDistance += 1;
                // Hole check
                if(currentRow === hole[0] && currentCol === hole[1]) {
                    break;
                }
            }

            const currentPosition = `${currentRow},${currentCol}`;
            const newPath = startingDir + dir;

            if(
                // Position has not been visited
                !visited.has(currentPosition) || 
                // Visited but currentDistance is smaller than the previously recorded one
                visited.get(currentPosition)[0] > currentDistance || 
                // Visited and distances are equal but current direction is lexicographically smaller than the previously recorded one
                (visited.get(currentPosition)[0] === currentDistance && visited.get(currentPosition)[1] > newPath)
            ) {
                visited.set(currentPosition, [currentDistance, newPath]);
                heap.push([currentDistance, newPath, currentRow, currentCol]);
            }

        }
        

    }

    return "impossible";

};