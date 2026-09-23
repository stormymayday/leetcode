class Solution:
    def majorityElement(self, nums: list[int]) -> list[int]:
        
        n = len(nums)
        res = []
        freq_count = {}

        for num in nums:
            if num not in freq_count:
                freq_count[num] = 0
            
            freq_count[num] += 1
        
        for element, count in freq_count.items():
            if count > n / 3:
                res.append(element)

        return res