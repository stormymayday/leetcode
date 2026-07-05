class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        
        majority_el = {
            "el": float("-inf"),
            "count": 0
        }

        count_map = {}

        for i in range(len(nums)):
            curr_el = nums[i]
            if curr_el not in count_map:
                count_map[curr_el] = 1
            else:
                count_map[curr_el] += 1
            curr_count = count_map[curr_el]
            if curr_count > majority_el["count"]:
                majority_el["el"] = curr_el
                majority_el["count"] = curr_count

        return majority_el["el"]
