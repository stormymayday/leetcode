function findPeakElement(nums: number[]): number {

    // Edge Case: single element
    if(nums.length === 1) {
        return 0; // return index 0
        // according to the problem description 'out of bounds values' are treated as -Infinity
    }

    // First element is greater than second
    // Note: Due to first edge case, we are guaranteed more than 1 element
    if(nums[0] > nums[1]) {
        return 0;
    }

    // Last element is greater than second to last
    if(nums[nums.length - 1] > nums[nums.length - 2]) {
        return nums.length - 1;
    }

    // Linear Scan until we find first 'peak'
    for(let i = 1; i < nums.length - 1; i += 1) {
        if(nums[i] > nums[i - 1] && nums[i] > nums[i + 1]) {
            return i;
        }
    }
    
};