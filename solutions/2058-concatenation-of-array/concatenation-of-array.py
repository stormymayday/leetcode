class Solution:
    def getConcatenation(self, nums: list[int]) -> list[int]:
        
        res = []

        for i in range(0, 2):
            for num in nums:
                res.append(num)
        
        return res