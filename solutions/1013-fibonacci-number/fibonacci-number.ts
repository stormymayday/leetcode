function fib(n: number, memo: Record<number, number> = {}): number {
    // Base Case: memo fetching
    if(n in memo) {
        return memo[n];
    }

    // Base Case: if number is less than 2
    if(n < 2) {
        return n;
    }

    // Recursive Step
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo); // Caching
    return memo[n];
};