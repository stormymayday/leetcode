function removeDuplicates(nums: number[]): number {
    let write = 0;
    for (let read = 1; read < nums.length; read += 1) {
        if (nums[read] !== nums[write]) {
            nums[write + 1] = nums[read];
            write += 1;
        }
    }
    return write + 1;
};