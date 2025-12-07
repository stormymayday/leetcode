function maxProfit(prices: number[]): number {

    let maxDiff = 0;

    let left = 0;
    for(let right = 1; right < prices.length; right += 1) {

        if(prices[right] > prices[left]) {
            maxDiff = Math.max(maxDiff, prices[right] - prices[left]);
        } else {
            left = right;
        }

    }

    return maxDiff;
    
};