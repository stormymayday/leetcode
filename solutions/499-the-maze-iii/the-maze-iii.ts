function findShortestWay(maze: number[][], ball: number[], hole: number[]): string {

    const ROWS = maze.length;
    const COLS = maze[0].length;

    // 1. Initialize hash map for tracking distance and path of each visited position
    const visited = new Map<string, { distance: number, path: string }>(); // key -> `${row},${col}`

    // 2. Set up a priority queue where state is [row, col, path, last direction (as a character)]
    const minPQ: { state: [number, number, string, string | null], distance: number }[] = [];
    // Initialize starting position with empty path and no last direction
    minPQ.push({ state: [ball[0], ball[1], "", null], distance: 0 });

    while (minPQ.length > 0) {

        // Sort (priority queue logic)
        minPQ.sort((a, b) => {
            if (a.distance !== b.distance) {
                // Sort by distance
                return a.distance - b.distance;
            } else {
                // Sort by path lexicographically
                return a.state[2].localeCompare(b.state[2]); 
            }
        });

        const { state: [startingRow, startingCol, currentPath, lastDirChar], distance: currDist } = minPQ.shift()!;

        const currentPosition = `${startingRow},${startingCol}`;

        // If position has been visited
        if (visited.has(currentPosition)) {
            continue;
        }

        // Mark current position as visited
        visited.set(currentPosition, { distance: currDist, path: currentPath });

        // Early return when hole is reached
        if (startingRow === hole[0] && startingCol === hole[1]) {
            return currentPath;
        }

        // Explore all directions
        const deltas: [number, number, string][] = [
            [-1, 0, 'u'],   // up
            [0, 1, 'r'],   // right
            [1, 0, 'd'],   // down
            [0, -1, 'l'],  // left
        ];
        for (const [rowDelta, colDelta, dirChar] of deltas) {

            // Skip if same as last direction (can't repeat consecutive directions)
            if (dirChar === lastDirChar) {
                continue;
            }

            let currentRow = rowDelta + startingRow;
            let currentCol = colDelta + startingCol;
            let distance = 0;

            // Rolling with hole detection
            while (
                // Out of bounds check
                0 <= currentRow && currentRow < ROWS &&
                0 <= currentCol && currentCol < COLS &&
                // wall check
                maze[currentRow][currentCol] !== 1
            ) {
                distance += 1;

                // Check for the hole during rolling
                if (currentRow === hole[0] && currentCol === hole[1]) {
                    // calculate the exact distance to reach the hole
                    const totalDistance = currDist + distance;
                    const newPath = currentPath + dirChar;

                    // Add that as a new state to explore and break.
                    minPQ.push({ state: [currentRow, currentCol, newPath, dirChar], distance: totalDistance });
                    break;
                    // Eventually when that state is processed, we return the successful path.
                    
                }

                // Otherwise, continue rolling
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

                    minPQ.push({ state: [currentRow, currentCol, newPath, dirChar], distance: totalDistance });
                }
            }
        }
    }

    return "impossible";
}