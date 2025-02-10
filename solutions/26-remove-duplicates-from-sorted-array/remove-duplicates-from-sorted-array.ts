function removeDuplicates(nums: number[]): number {

    const mySet = new Set();

    // Iterate in reverse order to avoid index shift issues when splicing
    for (let i = nums.length - 1; i >= 0; i--) {
        if (mySet.has(nums[i])) {
            // Remove duplicate in-place
            nums.splice(i, 1); 
        } else {
            // Add unique number to set
            mySet.add(nums[i]); 
        }
    }

    return nums.length; // Return new length of modified array
    
};