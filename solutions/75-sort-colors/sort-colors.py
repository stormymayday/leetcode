class Solution:
    def sortColors(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        
        left, mid, right = 0, 0, len(nums) - 1

        while mid <= right:
            curr_num = nums[mid]

            if curr_num == 0:
                temp = nums[left]
                nums[left] = nums[mid]
                nums[mid] = temp
                left += 1
                mid += 1
            elif curr_num == 1:
                mid += 1
            else:
                temp = nums[mid]
                nums[mid] = nums[right]
                nums[right] = temp
                right -= 1