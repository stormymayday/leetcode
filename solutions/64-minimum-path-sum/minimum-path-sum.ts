function minPathSum(grid: number[][], r: number = 0, c: number = 0, memo: Record<string, number> = {}): number {
    
    const key = `${r},${c}`;

    if(key in memo) {
        return memo[key];
    }

    if(r === grid.length || c === grid[0].length) {
        return Infinity;
    }

    if(r === grid.length -1 && c === grid[0].length - 1) {
        return grid[r][c];
    }

    let min = Infinity;
    const down = minPathSum(grid, r + 1, c, memo);
    const right = minPathSum(grid, r, c + 1, memo);
    min = Math.min(min, grid[r][c] + Math.min(down, right));
    memo[key] = min;
    return min;
};