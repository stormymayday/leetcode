function uniquePaths(m: number, n: number, memo: Record<string, number> = {}): number {
    
    const key1 = `${m},${n}`;
    const key2 = `${n},${m}`;

    if(key1 in memo) {
        return memo[key1];
    }

    if(key2 in memo) {
        return memo[key2];
    }

    if(m === 0 || n === 0) {
        return 0;
    }

    if(m === 1 && n === 1) {
        return 1;
    }

    const paths = uniquePaths(m - 1, n, memo) + uniquePaths(m, n - 1, memo);
    memo[key1] = paths;
    memo[key2] = paths;
    return paths;
};