class Solution:
    def firstMissingPositive(self, nums: List[int]) -> int:
        n = len(nums)

        # Phase 1: clamp every value to [1, n]. The answer must lie in
        # [1, n+1], so anything outside [1, n] is irrelevant and gets
        # replaced with 1. Also check whether 1 itself is present.
        found_one = False
        for i in range(0, n):
            curr_num = nums[i]
            if curr_num == 1:
                found_one = True
            if curr_num <= 0 or curr_num > n:
                nums[i] = 1

        # If 1 isn't in the array, it's the smallest missing positive.
        if not found_one:
            return 1

        # Phase 2: use the array as an in-place hash set. For each value v,
        # negate nums[v-1] to mark "v is present". abs() handles values
        # that were already negated by a previous mark.
        for num in nums:
            index = abs(num) - 1
            nums[index] = abs(nums[index]) * -1

        # Phase 3: the first index left positive was never marked, so
        # that index + 1 is the first missing positive integer.
        for i in range(0, n):
            curr_num = nums[i]
            if curr_num > 0:
                return i + 1

        # All of 1..n were present, so the next integer is missing.
        return n + 1