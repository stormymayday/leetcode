function numSquares(n: number, memo: Record<number, number> = {}): number {
    if(n in memo) {
        return memo[n];
    }

    if(n === 0) {
        return 0;
    }

    let minSquares = Infinity
    for(let i = 1; i <= Math.sqrt(n); i += 1) {
        const square = i * i;
        minSquares = Math.min(minSquares, 1 + numSquares(n - square, memo));
    }

    memo[n] = minSquares;
    return minSquares;
};