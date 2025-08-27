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
    const seen = new Set<string>();
    
    while (heap.length > 0) {
        // Sort heap by distance, then lexicographically by path
        heap.sort((a, b) => a[0] !== b[0] ? a[0] - b[0] : a[1].localeCompare(b[1]));
        const [currDist, path, row, col] = heap.shift()!;
        const key = `${row},${col}`;
        
        if (seen.has(key)) continue;
        if (row === hole[0] && col === hole[1]) return path;
        seen.add(key);
        
        // Get neighbors from current position (inlined)
        const directions: [number, number, string][] = [
            [0, -1, 'l'],
            [-1, 0, 'u'],
            [0, 1, 'r'],
            [1, 0, 'd'],
        ];
        
        for (const [dy, dx, dir] of directions) {
            let currRow = row;
            let currCol = col;
            let dist = 0;
            
            // Roll the ball until it hits a wall or the hole
            while (currRow + dy >= 0 && currRow + dy < ROWS && 
                   currCol + dx >= 0 && currCol + dx < COLS && 
                   maze[currRow + dy][currCol + dx] === 0) {
                currRow += dy;
                currCol += dx;
                dist++;
                // Stop if we reached the hole
                if (currRow === hole[0] && currCol === hole[1]) break;
            }
            
            heap.push([currDist + dist, path + dir, currRow, currCol]);
        }
    }
    
    return "impossible";
}