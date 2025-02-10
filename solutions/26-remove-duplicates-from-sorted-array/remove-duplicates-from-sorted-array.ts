function removeDuplicates(nums: number[]): number {
    
    let i = 0;

    for (let j = 1; j < nums.length; j++) {
        
        if(nums[i] === nums[j]) {
            // EQUAL
            // move j forward
        } else {
            // NOT EQUAL
            // 1. move i one step forward
            i = i + 1;
            // 2. overwrite
            nums[i] = nums[j];
        }

    }

    return i+1;
}