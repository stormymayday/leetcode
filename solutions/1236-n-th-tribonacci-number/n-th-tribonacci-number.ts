function tribonacci(n: number, memo = new Map()): number {
    if(memo.has(n)) {
        return memo.get(n);
    }

    if(n === 0) {
        return 0;
    }

    if(n === 1 || n === 2) {
        return 1;
    }

    memo.set(n, tribonacci(n - 1, memo) + tribonacci(n - 2, memo) + tribonacci(n - 3, memo));
    return memo.get(n);
};