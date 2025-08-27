function findShortestWay(maze: number[][], ball: number[], hole: number[]): string {

    const ROWS = maze.length;
    const COLS = maze[0].length;

    // For tracking distance and path of each visited position
    const visited = new Map<string, { distance: number, path: string }>();

    // Priority minPQ state: [row, col, path, lastDirection]
    type StateData = [number, number, string, number];
    const minPQ: { state: StateData, distance: number }[] = [];

    // Initialize: starting position with empty path and no last direction
    minPQ.push({ state: [ball[0], ball[1], "", -1], distance: 0 });

    while (minPQ.length > 0) {

        // Sorting with tie-breaking
        minPQ.sort((a, b) => {
            if (a.distance !== b.distance) {
                return a.distance - b.distance; // Distance first
            }
            return a.state[2].localeCompare(b.state[2]); // Then lexicographic path
        });

        const { state: [startingRow, startingCol, currentPath, lastDir], distance: currDist } = minPQ.shift()!;

        const currentPosition = `${startingRow},${startingCol}`;

        // Skip logic for lexicographic ordering
        if (visited.has(currentPosition)) {
            const existing = visited.get(currentPosition);
            if (existing.distance < currDist ||
                (existing.distance === currDist && existing.path <= currentPath)) {
                continue;
            }
        }

        // Mark current position as visited
        visited.set(currentPosition, { distance: currDist, path: currentPath });

        // Early return when hole is reached
        if (startingRow === hole[0] && startingCol === hole[1]) {
            return currentPath;
        }

        // Explore all directions
        // Directions ordered lexicographically with direction IDs
        const deltas: [number, number, string, number][] = [
            [-1, 0, 'u', 3],   // up
            [0, 1, 'r', 2],   // right
            [1, 0, 'd', 0],   // down
            [0, -1, 'l', 1],  // left
        ];
        for (const [rowDelta, colDelta, dirChar, dirId] of deltas) {

            // Skip if same as last direction (can't repeat consecutive directions)
            if (dirId === lastDir) {
                continue;
            }

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

                    minPQ.push({ state: [currentRow, currentCol, newPath, dirId], distance: totalDistance });
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

                    minPQ.push({ state: [currentRow, currentCol, newPath, dirId], distance: totalDistance });
                }
            }
        }
    }

    return "impossible";
}