function change(amount: number, coins: number[], i: number = 0, memo: Record<string, number> = {}): number {
    const key = `${amount},${i}`;

    if(key in memo) {
        return memo[key];
    }

    // Base Case: amount reduced to 0
    if(amount === 0) {
        return 1;
    }

    // Base Case 2: index out of bounds or amount is below 0
    if(i >= coins.length || amount < 0) {
        return 0;
    }

    // include current coin (index stays the same)
    const include = change(amount - coins[i], coins, i, memo);
    // exclude current coint (index moves to the next)
    const exclude = change(amount, coins, i + 1, memo);

    // Caching
    memo[key] = include + exclude;

    return memo[key];
};