class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        
        n = len(prices)
        profit = 0

        for i in range(1, n):
            curr_profit = prices[i] - prices[i - 1]
            if curr_profit > 0:
                profit += curr_profit
            
        return profit