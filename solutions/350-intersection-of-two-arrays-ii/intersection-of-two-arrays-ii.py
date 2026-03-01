class Solution:
    def intersect(self, nums1: List[int], nums2: List[int]) -> List[int]:
        
        result = []
        num_count = {}

        for num in nums1:
            if num not in num_count:
                num_count[num] = 0
            num_count[num] += 1

        for num in nums2:
            if num in num_count:
                result.append(num)
                num_count[num] -= 1
                if num_count[num] == 0:
                    del num_count[num]
        
        return result