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

    memo[key] = uniquePaths(m - 1, n, memo) + uniquePaths(m, n - 1, memo);

    return memo[key];
};