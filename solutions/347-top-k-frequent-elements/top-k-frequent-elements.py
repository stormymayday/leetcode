import heapq
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
            
        min_pq = []
        for num, count in freqMap.items():
            if len(min_pq) < k:
                heapq.heappush(min_pq, (count, num))
            else:
                if count > min_pq[0][0]:
                    heapq.heappop(min_pq)
                    heapq.heappush(min_pq, (count, num))
        
        res = []
        while len(min_pq) > 0:
            (count, num) = heapq.heappop(min_pq)
            res.append(num)

        return res