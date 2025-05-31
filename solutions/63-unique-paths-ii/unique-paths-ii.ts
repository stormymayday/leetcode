function uniquePathsWithObstacles(grid: number[][], r: number = 0, c: number = 0, memo: Record<string, number> = {}): number {
    const position = `${r},${c}`;

    // Base Case 1: Memo fetching
    if(position in memo) {
        return memo[position];
    }

    // Base Case 2: Out of bounds or walls
    if(r === grid.length
        || c === grid[0].length
        || grid[r][c] === 1
    ) {
        return 0;
    }

    // Base Case 3: Finish
    if(r === grid.length -1 && c === grid[0].length - 1) {
        return 1;
    }

    // Recursive Step
    memo[position] = uniquePathsWithObstacles(grid, r + 1, c, memo) + uniquePathsWithObstacles(grid, r, c + 1, memo);
    return memo[position];
};