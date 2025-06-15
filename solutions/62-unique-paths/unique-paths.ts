function uniquePaths(m: number, n: number, memo: Record<string, number> = {}): number {
    
    const key = `${m},${n}`;

    if(key in memo) {
        return memo[key];
    }


    if(m === 0 || n === 0) {
        return 0;
    }
    if(m === 1 && n === 1) {
        return 1;
    }

    const down = uniquePaths(m - 1, n, memo);
    const right = uniquePaths(m, n - 1, memo);
    memo[key] = down + right;
    return memo[key];
};