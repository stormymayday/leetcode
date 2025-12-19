function removeDuplicates(nums: number[]): number {

    let i = 0; // dupe pointer

    for(let j = 1; j < nums.length; j += 1) {

        // Swap Condition
        if(nums[i] !== nums[j]) {

            i += 1; // advance first

            // the swap / (can overwrite)
            const temp = nums[i];
            nums[i] = nums[j];
            nums[j] = temp;
        }

    }

    // 'i' was pointing at last non-duplicate
    // therefore, i + 1 will be the length of non-duplicate section
    return i + 1;
    
};