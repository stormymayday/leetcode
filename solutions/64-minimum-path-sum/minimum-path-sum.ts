function minPathSum(grid: number[][], r: number = 0, c: number = 0, memo: Record<string, number> = {}): number {
    const position = `${r},${c}`;

    // Base Case: memo fetching
    if(position in memo) {
        return memo[position];
    }

    // Base Case: out of bounds
    if(r === grid.length || c === grid[0].length) {
        return Infinity;
    }

    // Base Case: finish
    if(r === grid.length - 1 && c === grid[0].length - 1) {
        return grid[r][c];
    }

    // Recursive Step
    const down = minPathSum(grid, r + 1, c, memo);
    const right = minPathSum(grid, r, c + 1, memo);

    memo[position] = grid[r][c] + Math.min(down, right);
    return memo[position];
};