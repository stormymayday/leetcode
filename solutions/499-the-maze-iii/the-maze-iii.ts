function findShortestWay(
    maze: number[][],
    ball: number[],
    hole: number[]
): string {
    const ROWS = maze.length;
    const COLS = maze[0].length;

    // Min-heap: [distance, path, row, col]
    const heap: [number, string, number, number][] = [[0, "", ball[0], ball[1]]];
    // Track visited positions
    const visited = new Set<string>();

    while (heap.length > 0) {
        // Sort heap by distance, then lexicographically by path
        heap.sort((a, b) => a[0] !== b[0] ? a[0] - b[0] : a[1].localeCompare(b[1]));
        const [currDist, path, row, col] = heap.shift()!;

        const key = `${row},${col}`;
        if (visited.has(key)) continue;
        if (row === hole[0] && col === hole[1]) return path;
        visited.add(key);

        // Get neighbors from current position
        const directions: [number, number, string][] = [
            [-1, 0, 'u'], // up
            [0, 1, 'r'], // right
            [1, 0, 'd'], // down
            [0, -1, 'l'], // left
        ];
        for (const [rowDelta, colDelta, direction] of directions) {
            let currRow = row;
            let currCol = col;
            let distance = 0;

            // Roll the ball until it hits a wall or the hole
            while (
                // Out of bounds check
                0 <= currRow + rowDelta && currRow + rowDelta < ROWS &&
                0 <= currCol + colDelta && currCol + colDelta < COLS &&
                // Wall check
                maze[currRow + rowDelta][currCol + colDelta] === 0) {
                currRow += rowDelta;
                currCol += colDelta;
                distance++;
                // Stop if we reached the hole
                if (currRow === hole[0] && currCol === hole[1]) {
                    break;
                }
            }

            heap.push([currDist + distance, path + direction, currRow, currCol]);
        }
    }

    return "impossible";
}