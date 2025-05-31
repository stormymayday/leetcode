function numSquares(n: number, memo: Record<number, number> = {}): number {
    
    // Memo Base Case
    if(n in memo) {
        return memo[n];
    }

    // Base Case
    if(n === 0) {
        return 0;
    }

    // Recursive Step
    let minSquares = Infinity;
    for(let i = 1; i <= Math.sqrt(n); i += 1) {
        const square = i * i;
        minSquares = Math.min(minSquares, 1 + numSquares(n - square, memo));
    }

    // Caching
    memo[n] = minSquares;
    return minSquares;
};