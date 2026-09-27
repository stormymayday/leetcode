class Solution:
    def firstMissingPositive(self, nums: list[int]) -> int:
        
        n = len(nums)
        found_one = False

        for i in range(0, n):
            curr_num = nums[i]
            if curr_num == 1:
                found_one = True
            if curr_num <= 0 or curr_num > n:
                nums[i] = 1
        
        if found_one == False:
            return 1
        
        for i in range(0, n):
            index = abs(nums[i]) - 1
            nums[index] = abs(nums[index]) * -1
        
        for i in range(0, n):
            if nums[i] > 0:
                return i + 1
        
        return n + 1