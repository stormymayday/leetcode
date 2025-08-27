function findShortestWay(
    maze: number[][],
    ball: number[],
    hole: number[]
): string {
    const ROWS = maze.length;
    const COLS = maze[0].length;

    // Helper: check if a cell is valid
    function valid(row: number, col: number) {
        return row >= 0 && row < ROWS && col >= 0 && col < COLS && maze[row][col] === 0;
    }

    // Helper: get neighbors from current position
    function getNeighbors(row: number, col: number) {
        const directions: [number, number, string][] = [
            [0, -1, 'l'],
            [-1, 0, 'u'],
            [0, 1, 'r'],
            [1, 0, 'd'],
        ];
        const neighbors: [number, number, number, string][] = [];

        for (const [dy, dx, dir] of directions) {
            let currRow = row;
            let currCol = col;
            let dist = 0;

            while (valid(currRow + dy, currCol + dx)) {
                currRow += dy;
                currCol += dx;
                dist++;
                // Stop if we reached the hole
                if (currRow === hole[0] && currCol === hole[1]) break;
            }

            neighbors.push([currRow, currCol, dist, dir]);
        }

        return neighbors;
    }

    // Min-heap: [distance, path, row, col]
    const heap: [number, string, number, number][] = [[0, "", ball[0], ball[1]]];

    // Track visited positions
    const seen = new Set<string>();

    while (heap.length > 0) {
        // Sort heap by distance, then lexicographically by path
        heap.sort((a, b) => a[0] !== b[0] ? a[0] - b[0] : a[1].localeCompare(b[1]));
        const [currDist, path, row, col] = heap.shift()!;

        const key = `${row},${col}`;
        if (seen.has(key)) continue;

        if (row === hole[0] && col === hole[1]) return path;

        seen.add(key);

        for (const [nextRow, nextCol, dist, dir] of getNeighbors(row, col)) {
            heap.push([currDist + dist, path + dir, nextRow, nextCol]);
        }
    }

    return "impossible";
}
