/**
 * Find the shortest distance for a ball to roll from start to destination in a maze
 * @param {number[][]} maze - 2D array where 0 = empty space, 1 = wall
 * @param {number[]} start - [row, col] starting position
 * @param {number[]} dest - [row, col] destination position
 * @return {number} - shortest distance, or -1 if impossible
 */
function shortestDistance(maze, start, dest) {
    // Initialize distance matrix with infinity (JavaScript equivalent of Integer.MAX_VALUE)
    const distance = Array(maze.length).fill(null).map(() => 
        Array(maze[0].length).fill(Infinity)
    );
    
    // Set starting position distance to 0
    distance[start[0]][start[1]] = 0;
    
    // Run Dijkstra's algorithm
    dijkstra(maze, start, distance);
    
    // Return result: -1 if unreachable, otherwise the shortest distance
    return distance[dest[0]][dest[1]] === Infinity ? -1 : distance[dest[0]][dest[1]];
}

/**
 * Dijkstra's algorithm implementation for the maze problem
 * @param {number[][]} maze - the maze grid
 * @param {number[]} start - starting position
 * @param {number[][]} distance - distance matrix to be filled
 */
function dijkstra(maze, start, distance) {
    // Direction vectors: right, left, up, down
    const dirs = [[0, 1], [0, -1], [-1, 0], [1, 0]];
    
    // Priority queue implemented with array and sorting
    // Each element: [row, col, distance]
    const queue = [];
    queue.push([start[0], start[1], 0]);
    
    while (queue.length > 0) {
        // Sort queue by distance (3rd element) and get the minimum
        queue.sort((a, b) => a[2] - b[2]);
        const [currentRow, currentCol, currentDist] = queue.shift();
        
        // Skip if we've already found a shorter path to this position
        if (distance[currentRow][currentCol] < currentDist) {
            continue;
        }
        
        // Try all four directions
        for (const [dirRow, dirCol] of dirs) {
            let x = currentRow + dirRow;
            let y = currentCol + dirCol;
            let count = 0;
            
            // Roll the ball until it hits a wall or boundary
            while (x >= 0 && y >= 0 && x < maze.length && y < maze[0].length && maze[x][y] === 0) {
                x += dirRow;
                y += dirCol;
                count++;
            }
            
            // Step back to the last valid position (before hitting wall/boundary)
            const stopRow = x - dirRow;
            const stopCol = y - dirCol;
            
            // If we found a shorter path to this stopping position
            const newDistance = distance[currentRow][currentCol] + count;
            if (newDistance < distance[stopRow][stopCol]) {
                distance[stopRow][stopCol] = newDistance;
                queue.push([stopRow, stopCol, newDistance]);
            }
        }
    }
}
