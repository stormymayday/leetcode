function shortestBridge(grid: number[][]): number {
    // Step 1: find the first island and record it's coordinates
    let firstIsland = null;
    outer: for(let r = 0; r < grid.length; r++) {
        for(let c = 0; c < grid[0].length; c++) {
            // matrixDFS
            if(grid[r][c] === 1) {
                firstIsland = matrixDFS(grid, r, c, new Set());
                break outer;
            }
        }
    }

    // Step 2: BFS for the second island, count and return the distance
    return matrixBFS(grid, firstIsland) - 1;
    };

    function isInBounds(grid, r, c) {
    const rowInBounds = 0 <= r && r < grid.length;
    const colInBounds = 0 <= c && c < grid[0].length;
    return rowInBounds && colInBounds;
    }

    function matrixDFS(grid, r, c, visited) {
    // Base Case 1: Out of bounds
    if(!isInBounds(grid, r, c)) {
        return visited;
    }

    // Base Case 2: Water
    if(grid[r][c] === 0) {
        return visited;
    }

    // Base Case 3: Visited
    const position = `${r},${c}`;
    if(visited.has(position)) {
        return visited;
    }

    // Record current position
    visited.add(position);

    // Explore Up, Down, Left, Right
    matrixDFS(grid, r - 1, c, visited);
    matrixDFS(grid, r + 1, c, visited);
    matrixDFS(grid, r, c - 1, visited);
    matrixDFS(grid, r, c + 1, visited);

    // Return 'visited' set
    return visited;
};

function matrixBFS(grid, firstIslandPositions) {

  const queue = [];
  const visited = new Set(firstIslandPositions);

  // Enqueueing First Island coordinates
  for(const position of firstIslandPositions) {
    const[r, c] = position.split(',').map(Number);
    queue.push({row: r, col: c, distance: 0});
  }

  // BFS Logic
  while(queue.length > 0) {

    const {row, col, distance} = queue.shift();
    
    // Check if coordinates point to a 'Land' and not in the set
    const position = `${row},${col}`;
    if(grid[row][col] === 1 && !firstIslandPositions.has(position)) {
      return distance;
    }

     // Explore 4 directions (Up, Down, Left, Right)
    const deltas = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    for(const delta of deltas) {
      const [rowDelta, colDelta] = delta;
      const neighborRow = row + rowDelta;
      const neighborCol = col + colDelta;
      const position = `${neighborRow},${neighborCol}`;
      if(
        isInBounds(grid, neighborRow, neighborCol) 
        && !visited.has(position)
      ) {
        visited.add(position);
        queue.push({row: neighborRow, col: neighborCol, distance: distance + 1});
      } 
    }
  }
}