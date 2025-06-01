function numSquares(n: number, memo: Record<number, number> = {}): number {
    // Base Case: memo fetching
    if(n in memo) {
        return memo[n];
    }

    // Base Case: n reduced to zero
    if(n === 0) {
        return 0;
    }

    // Recursive Step
    let minSquares = Infinity;
    for(let i = 1; i <= Math.sqrt(n); i += 1) {
        const square = i * i;
        const currentSquares = 1 + numSquares(n - square, memo);
        minSquares = Math.min(minSquares, currentSquares);
    }

    // Caching
    memo[n] = minSquares;

    return minSquares;
};