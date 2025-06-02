function coinChange(coins: number[], amount: number): number {
    
    const result = helper(amount, coins);

    if(result === Infinity) {
        return -1;
    } else {
        return result;
    }

    function helper(amount: number, coins: number [], memo: Record<number, number> = {}): number {
        if(amount in memo) {
            return memo[amount];
        }

        if(amount === 0) {
            return 0;
        }
        if(amount < 0) {
            return Infinity;
        }
        let min = Infinity;
        for(const coin of coins) {
            const numCoins = 1 + helper(amount - coin, coins, memo);
            min = Math.min(min, numCoins);
        }

        memo[amount] = min;
        return min;
    }

};