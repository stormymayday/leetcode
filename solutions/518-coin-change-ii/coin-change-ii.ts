function change(amount: number, coins: number[], i: number = 0, memo: Map<string, number> = new Map()): number {
    const key = `${amount},${i}`;
    
    if (memo.has(key)) {
        return memo.get(key)!;
    }
    
    if (amount === 0) {
        return 1;
    }
    
    if (i >= coins.length || amount < 0) {
        return 0;
    }
    
    // Two choices: include current coin or skip it
    const include = change(amount - coins[i], coins, i, memo);
    const exclude = change(amount, coins, i + 1, memo);
    
    const result = include + exclude;
    memo.set(key, result);
    
    return result;
}