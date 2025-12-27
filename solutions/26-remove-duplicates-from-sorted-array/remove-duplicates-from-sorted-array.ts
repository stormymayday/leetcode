function removeDuplicates(nums: number[]): number {
    
    let write = 0;
    for(let read = 1; read < nums.length; read += 1) {
        if(nums[read] !== nums[write]) {
            write += 1;
            nums[write] = nums[read];
        }
    }
    return write + 1;

};