function climbStairs(n: number, memo: Record<number, number> = {}): number {

    if(n in memo) {
        return memo[n];
    }

    if(n < 0) {
        return 0;
    }
    if(n === 0) {
        return 1;
    }

    memo[n] = climbStairs(n - 2, memo) + climbStairs(n - 1, memo);

    return memo[n];
};