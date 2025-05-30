function minPathSum(grid: number[][], r: number = 0, c: number = 0, memo: Record<string, number> = {}): number {
    // Current position
    const position = `${r},${c}`;

    // Base Case 1: Check position in memo
    if(position in memo) {
        return memo[position];
    }

    // Base Case 2: Out of bounds
    if(r === grid.length || c === grid[0].length) {
        return Infinity;
    }

    // Base Case 3: Reached the end
    if(r === grid.length - 1 && c === grid[0].length - 1) {
        return grid[r][c];
    }

    const right = minPathSum(grid, r + 1, c, memo);
    const down = minPathSum(grid, r, c + 1, memo);

    // Caching the min value for current position
    memo[position] = grid[r][c] + Math.min(right, down);

    return memo[position];
};