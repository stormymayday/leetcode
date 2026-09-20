class Solution:
    def productExceptSelf(self, nums: list[int]) -> list[int]:

        n = len(nums)

        prefix = [1] * n
        prefix_prod = 1
        for i in range(0, n):
            prefix_prod *= nums[i]
            prefix[i] = prefix_prod
        
        postfix = [1] * n
        postfix_prod = 1
        for i in range(n - 1, -1, -1):
            postfix_prod *= nums[i]
            postfix[i] = postfix_prod

        result = []
        for i in range(0, n):
            before = 1 if i - 1 < 0 else prefix[i - 1]
            after = 1 if i + 1 >= n else postfix[i + 1]
            result.append(before * after)

        return result  


        