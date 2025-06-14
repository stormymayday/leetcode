function tribonacci(n: number, memo: Record<number, number> = {}): number {

    if(n in memo) {
        return memo[n];
    }

    if(n == 1 || n == 2) {
        return 1;
    }

    if(n === 0) {
        return 0;
    }

    memo[n] = tribonacci(n - 3, memo) + tribonacci(n - 2, memo) + tribonacci(n - 1, memo);
    return memo[n];
};