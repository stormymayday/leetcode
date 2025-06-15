function coinChange(coins: number[], amount: number): number {
    const result = helper(amount, coins);
    if(result === Infinity) {
        return -1;
    } else {
        return result;
    }
};

function helper(amount: number, coins: number[], memo: Record<number, number> = {}): number {
    
    if(amount in memo) {
        return memo[amount];
    }

    if(amount < 0) {
        return Infinity;
    }

    if(amount === 0) {
        return 0;
    }

    let minCoins = Infinity;
    for(const coin of coins) {
        minCoins = Math.min(minCoins, 1 + helper(amount - coin, coins, memo));
    }
    
    memo[amount] = minCoins;
    return minCoins;
}