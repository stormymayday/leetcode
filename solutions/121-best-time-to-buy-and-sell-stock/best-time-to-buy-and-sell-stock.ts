function maxProfit(prices: number[]): number {
     // Tracks overall maximum profit
    let maxProfit = 0;
    // Points to current minimum price (buy day)    
    let left = 0;             
    
    for (let right = 1; right < prices.length; right++) {
         // Holds profit for current buy-sell pair
        let profit = 0;
        
        if (prices[left] > prices[right]) {
            // If we find a lower price, update our buy position
            left = right;
        } else {
            // If current price is higher than our buy price,
            // calculate the potential profit
            profit = prices[right] - prices[left];
        }
        
        // Update max profit if we found a better opportunity
        maxProfit = Math.max(maxProfit, profit);
    }

    return maxProfit;
}