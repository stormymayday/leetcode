function maxProfit(prices: number[]): number {

    let max = 0;

    let left = 0;
    for(let right = 1; right < prices.length; right += 1) {

        max = Math.max(max,prices[right] - prices[left]);

        if(prices[right] < prices[left]) {
            left = right;
        }

    }

    return max;
    
};