function uniquePaths(m: number, n: number, memo:Record<string, number> = {}): number {
    
    const key1 = `${m},${n}`;

    if(key1 in memo) {
        return memo[key1];
    }

    if(m === 1 && n === 1) {
        return 1;
    }
    if(m === 0 || n === 0) {
        return 0;
    }

    memo[key1] = uniquePaths(m - 1, n, memo) + uniquePaths(m, n - 1, memo);
    return memo[key1];
};