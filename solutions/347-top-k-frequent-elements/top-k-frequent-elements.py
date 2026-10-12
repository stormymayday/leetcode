class Solution:
    def topKFrequent(self, nums: list[int], k: int) -> list[int]:
        
        n = len(nums)

        freq_count = {}

        for i in range(n):
            curr_num = nums[i]
            if curr_num not in freq_count:
                freq_count[curr_num] = 0
            freq_count[curr_num] += 1
        
        buckets: list[list[int]] = []
        for i in range(n + 1):
            buckets.append([])
        
        for key, count in freq_count.items():
            buckets[count].append(key)
        
        res: list[int] = []

        for i in range(n, 0, -1):
            curr_bucket = buckets[i]
            for j in range(len(curr_bucket)):
                res.append(curr_bucket[j])
                if len(res) >= k:
                    return res

        return res