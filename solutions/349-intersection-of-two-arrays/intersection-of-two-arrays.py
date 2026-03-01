class Solution:
    def intersection(self, nums1: List[int], nums2: List[int]) -> List[int]:
        
        res = []
        set_1 = set(nums1)

        for num in nums2:
            if num in set_1:
                res.append(num)
                set_1.remove(num)

        return res