class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        
        n = len(nums)

        if n == 0:
            return -100000000

        maj_el = nums[0]
        count = 1

        for i in range(1, n):
            curr_el = nums[i]

            if curr_el != maj_el:
                count -= 1
                if count < 0:
                    maj_el = curr_el
                    count = 1
            else:
                count += 1

        return maj_el