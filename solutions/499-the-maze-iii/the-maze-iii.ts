function findShortestWay(maze: number[][], ball: number[], hole: number[]): string {
    const ROWS = maze.length;
    const COLS = maze[0].length;

    // Track best state (distance + path) for each position
    const bestStates = new Map<string, { distance: number, path: string }>();

    // Priority queue state: [row, col, path, lastDirection]
    type StateData = [number, number, string, number];
    
    // Use array with proper sorting instead of priority encoding
    const queue: {state: StateData, distance: number}[] = [];

    // Initialize: starting position with empty path and no last direction
    queue.push({state: [ball[0], ball[1], "", -1], distance: 0});

    // Directions ordered lexicographically with direction IDs
    const deltas: [number, number, string, number][] = [
        [1, 0, 'd', 0],   // down
        [0, -1, 'l', 1],  // left
        [0, 1, 'r', 2],   // right
        [-1, 0, 'u', 3]   // up
    ];

    while (queue.length > 0) {
        // Proper lexicographic sorting
        queue.sort((a, b) => {
            if (a.distance !== b.distance) {
                return a.distance - b.distance; // Distance first
            }
            return a.state[2].localeCompare(b.state[2]); // Then lexicographic path
        });

        const { state: [startingRow, startingCol, currentPath, lastDir], distance: currDist } = queue.shift()!;

        // Use position key instead of 2D array indexing
        const posKey = `${startingRow},${startingCol}`;

        // Enhanced skip logic for lexicographic ordering
        if (bestStates.has(posKey)) {
            const existing = bestStates.get(posKey)!;
            if (existing.distance < currDist ||
                (existing.distance === currDist && existing.path <= currentPath)) {
                continue;
            }
        }

        // Update best state for this position
        bestStates.set(posKey, { distance: currDist, path: currentPath });

        // Early return when hole is reached
        if (startingRow === hole[0] && startingCol === hole[1]) {
            return currentPath;
        }

        // Explore all directions
        for (const [rowDelta, colDelta, dirChar, dirId] of deltas) {
            // Skip if same as last direction (can't repeat consecutive directions)
            if (dirId === lastDir) continue;

            let currentRow = rowDelta + startingRow;
            let currentCol = colDelta + startingCol;
            let distance = 0;

            // Rolling with hole detection
            while (
                0 <= currentRow && currentRow < ROWS &&
                0 <= currentCol && currentCol < COLS &&
                maze[currentRow][currentCol] !== 1
            ) {
                distance += 1;

                // Check for hole DURING rolling
                if (currentRow === hole[0] && currentCol === hole[1]) {
                    const totalDistance = currDist + distance;
                    const newPath = currentPath + dirChar;
                    
                    queue.push({state: [currentRow, currentCol, newPath, dirId], distance: totalDistance});
                    break; // Stop rolling when we hit the hole
                }

                // Continue rolling
                currentRow += rowDelta;
                currentCol += colDelta;
            }

            // Handle normal stopping (when didn't hit hole)
            if (!(currentRow === hole[0] && currentCol === hole[1])) {
                if (distance > 0) { // Only if we actually moved
                    // Step back to last valid position
                    currentRow -= rowDelta;
                    currentCol -= colDelta;

                    const totalDistance = currDist + distance;
                    const newPath = currentPath + dirChar;
                    
                    queue.push({state: [currentRow, currentCol, newPath, dirId], distance: totalDistance});
                }
            }
        }
    }

    return "impossible";
}