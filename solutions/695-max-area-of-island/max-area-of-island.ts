function maxAreaOfIsland(grid: number[][]): number {
  const visited = new Set<string>();
  let largest = 0;
  for(let r = 0; r < grid.length; r += 1) {
    for(let c = 0; c < grid[0].length; c += 1) {
        if(grid[r][c] === 1 && !visited.has(`${r},${c}`)) {
            // largest = Math.max(largest, dfs(grid, r, c, visited));
            largest = Math.max(largest, bfs(grid, r, c, visited));
        }
    }
  }
  return largest;
};

function bfs(grid: number[][], r:number, c: number, visited: Set<string>):number {
    const position = `${r},${c}`;
    if(visited.has(position)) {
        return 0;
    }

    visited.add(position);
    const queue = [[r, c]];
    let size = 1;
    while(queue.length > 0) {
        const [row, col] = queue.shift();
        const deltas = [[-1, 0], [1, 0], [0, -1], [0,1]];
        for(const delta of deltas) {
            const [rowDelta, colDelta] = delta;
            const neighborRow = row + rowDelta;
            const neighborCol = col + colDelta;
            const neighborPosition = `${neighborRow},${neighborCol}`;
            if(
                isInBounds(grid, neighborRow, neighborCol) === true
                && !visited.has(neighborPosition)
                && grid[neighborRow][neighborCol] === 1
            ) {
                visited.add(neighborPosition);
                size += 1;
                queue.push([neighborRow, neighborCol]);
            }
        }
    }
    return size;
}

function dfs(grid: number[][], r:number, c:number, visited: Set<string>):number {
    // Base Case: out of bounds
    if(isInBounds(grid, r, c) === false) {
        return 0;
    }

    // Base Case: water
    if(grid[r][c] === 0) {
        return 0;
    }

    // Base Case: visited
    const position = `${r},${c}`;
    if(visited.has(position)) {
        return 0;
    }

    visited.add(position);

    let size = 1;
    size += dfs(grid, r - 1, c, visited);
    size += dfs(grid, r + 1, c, visited);
    size += dfs(grid, r, c - 1, visited);
    size += dfs(grid, r, c + 1, visited);
    return size;
}

function isInBounds(grid:number[][], r: number, c: number):boolean {
    const rowInBounds: boolean = 0 <= r && r < grid.length;
    const colInBounds: boolean = 0 <= c && c < grid[0].length;
    return rowInBounds === true && colInBounds === true;
}