from typing import List

class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        
        freqMap = {}
        for i in range(len(nums)):
            curr_num = nums[i]
            if curr_num not in freqMap:
                freqMap[curr_num] = 1
            else:
                freqMap[curr_num] += 1
        
        buckets: List[int][int] = []
        for i in range(len(nums) + 1):
            buckets.append([])
        
        for num, count in freqMap.items():
            buckets[count].append(num)
        
        res = []
        for i in range(len(buckets) - 1, -1, -1):
            bucket = buckets[i]
            for j in range(len(bucket)):
                num = bucket[j]
                res.append(num)
                if len(res) >= k:
                    return res

        return res