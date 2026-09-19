class NumArray:

    def __init__(self, nums: list[int]):
        self.prefix_sums = [0]
        
        current_running_sum = 0
        for num in nums:
            current_running_sum += num
            self.prefix_sums.append(current_running_sum)

    def sumRange(self, left: int, right: int) -> int:
        return self.prefix_sums[right + 1] - self.prefix_sums[left]

        


# Your NumArray object will be instantiated and called as such:
# obj = NumArray(nums)
# param_1 = obj.sumRange(left,right)