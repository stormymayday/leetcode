function removeDuplicates(nums: number[]): number {
    const mySet = new Set();

    for (let i = 0; i < nums.length; i++) {
        if (mySet.has(nums[i])) {
            // Remove duplicate in-place
            nums.splice(i, 1);  
            // Decrement i to check the new value at the same index
            i--;  
        } else {
            mySet.add(nums[i]);
        }
    }

    return nums.length;
}