function uniquePathsWithObstacles(grid: number[][], r:number = 0, c:number = 0, memo: Record<string, number> = {}): number {
    const key = `${r},${c}`;

    if(key in memo) {
        return memo[key];
    }

    if(
        r === grid.length ||
        c === grid[0].length ||
        grid[r][c] === 1
    ) {
        return 0;
    }

    if(r === grid.length - 1 && c === grid[0].length - 1) {
        return 1;
    }

    memo[key] = uniquePathsWithObstacles(grid, r + 1, c, memo) + uniquePathsWithObstacles(grid, r, c + 1, memo);
    
    return memo[key];
};