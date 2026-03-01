class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:

        num_to_idx = {}

        for idx, num in enumerate(nums):
            difference = target - num
            if difference in num_to_idx:
                return [num_to_idx[difference], idx]
            num_to_idx[num] = idx