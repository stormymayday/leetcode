function removeDuplicates(nums: number[]): number {
    let write = 1;
    for (let read = 1; read < nums.length; read += 1) {
        if(nums[read] !== nums[read - 1]) {
            nums[write] = nums[read];
            write += 1;
        }
    }
    return write;
};