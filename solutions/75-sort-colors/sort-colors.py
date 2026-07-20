class Solution:
    def sortColors(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        n = len(nums)
        num_zeros = 0
        num_ones = 0
        num_twos = 0

        for i in range(0, n):
            curr_num = nums[i]
            if curr_num == 0:
                num_zeros += 1
            elif curr_num == 1:
                num_ones += 1
            elif curr_num == 2:
                num_twos += 1
            else:
                continue
        
        if num_zeros + num_ones + num_twos != n:
            return
        
        index = 0
        while index < n:
            if num_zeros != 0:
                nums[index] = 0
                num_zeros -= 1
            elif num_ones != 0:
                nums[index] = 1
                num_ones -= 1
            else:
                nums[index] = 2
            index += 1
        