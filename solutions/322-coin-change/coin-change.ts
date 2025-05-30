function coinChange(coins: number[], amount: number): number {
   const result = helper(amount, coins);
   if(result === Infinity) {
    return -1;
   } else {
    return result;
   }
};

function helper(amount, coins, memo: Record<number, number> = {}) {

    if(amount in memo) {
        return memo[amount];
    }

    if(amount === 0) {
        return 0;
    }

    if(amount < 0) {
        return Infinity;
    }

    let minCoins = Infinity;
    for(const coin of coins) {
        const numCoins = helper(amount - coin, coins, memo) + 1;
        minCoins = Math.min(minCoins, numCoins);
    }

    memo[amount] = minCoins;
    return minCoins;
}