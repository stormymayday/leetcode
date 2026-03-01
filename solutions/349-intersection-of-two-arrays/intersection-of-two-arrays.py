class Solution:
    def intersection(self, nums1: List[int], nums2: List[int]) -> List[int]:

        set_1 = set(nums1)
        set_2 = set(nums2)

        return list(set_1.intersection(set_2))