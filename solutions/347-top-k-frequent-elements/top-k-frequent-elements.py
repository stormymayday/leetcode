import heapq

class Solution:
    def topKFrequent(self, nums: list[int], k: int) -> list[int]:
        
        n = len(nums)

        freq_count = {}

        for i in range(n):

            curr_num = nums[i]

            if curr_num not in freq_count:
                freq_count[curr_num] = 0
            
            freq_count[curr_num] += 1
        
        min_pq = []

        for key, count in freq_count.items():

            if len(min_pq) < k:
                heapq.heappush(min_pq, (count, key))
            else:
                if count > min_pq[0][0]:
                    heapq.heappop(min_pq)
                    heapq.heappush(min_pq, (count, key))
        
        res: list[int] = []

        for i in range(0, k):
            (count, key) = heapq.heappop(min_pq)
            res.append(key)

        return res