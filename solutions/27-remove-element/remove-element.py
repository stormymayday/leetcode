class Solution:
    def removeElement(self, nums: List[int], val: int) -> int:
        
        write_ptr = 0

        for read_ptr in range(0, len(nums)):
            if nums[read_ptr] == val:
                continue
            nums[write_ptr] = nums[read_ptr]
            write_ptr += 1

        return write_ptr