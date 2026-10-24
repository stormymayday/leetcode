class Solution:
    def productExceptSelf(self, nums: list[int]) -> list[int]:

        n = len(nums)
        
        prefix_prod: list[int] = []
        curr_prod = 1
        for i in range(0, n):
            curr_prod *= nums[i]
            prefix_prod.append(curr_prod)
        
        postfix_prod: list[int] = [1 for _ in range(0, n)]
        curr_prod = 1
        for i in range(n - 1, -1, -1):
            curr_prod *= nums[i]
            postfix_prod[i] = curr_prod
        
        res: list[int] = []
        for i in range(0, n):
            before = (1 if i == 0 else prefix_prod[i - 1])
            after = (1 if i == n - 1 else postfix_prod[i + 1])
            res.append(before * after)

        return res