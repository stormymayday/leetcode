class Solution:
    def intersection(self, nums1: List[int], nums2: List[int]) -> List[int]:
        
        res = []
        set_1 = set(nums1)
        set_2 = set(nums2)

        for num in set_1:
            if num in set_2:
                res.append(num)

        return res