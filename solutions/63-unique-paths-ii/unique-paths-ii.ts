function uniquePathsWithObstacles(grid: number[][], row: number = 0, col:number = 0, memo: Record<string, number> = {}): number {
    
    const position = `${row},${col}`;

    // Memo base case
    if(position in memo) {
        return memo[position];
    }

    // Out of bounds or obstacle
    if(row === grid.length || col === grid[0].length || grid[row][col] === 1) {
        return 0;
    }

    // Reached the destination
    if(row === grid.length - 1 && col === grid[0].length - 1) {
        return 1;
    }

    // Recursive Step
    const downCount = uniquePathsWithObstacles(grid, row + 1, col, memo);
    const rightCount = uniquePathsWithObstacles(grid, row, col + 1, memo);

    // Caching the result
    memo[position] = downCount + rightCount
    return memo[position];
};