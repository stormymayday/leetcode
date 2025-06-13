function uniquePathsWithObstacles(grid: number[][], row: number = 0, col: number = 0, memo: Record<string, number> = {}): number {
    
    const key = `${row},${col}`;

    if(key in memo) {
        return memo[key];
    }

    if(row === grid.length || col === grid[0].length || grid[row][col] === 1) {
        return 0;
    }

    if(row === grid.length - 1 && col === grid[0].length - 1) {
        return 1;
    }

    memo[key] = uniquePathsWithObstacles(grid, row + 1, col, memo) + uniquePathsWithObstacles(grid, row, col + 1, memo);
    return memo[key];
};
