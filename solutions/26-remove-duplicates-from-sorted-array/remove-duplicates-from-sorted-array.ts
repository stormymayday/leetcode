function removeDuplicates(nums: number[]): number {
    let curr = 0;
    let index = 0;
    while(curr < nums.length - 1) {
        // duplicate
        if(nums[curr] === nums[curr + 1]) {
            // index stays
            // curr moves forward
            curr += 1;
        }
        // not a duplicate 
        else {
            // move index one spot (to a duplicate spot)
            index += 1;
            // overwrite
            nums[index] = nums[curr + 1];
            // move curr one spot
            curr += 1;
        }
    }
    return index + 1;
};