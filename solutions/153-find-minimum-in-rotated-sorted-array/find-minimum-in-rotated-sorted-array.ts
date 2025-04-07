function findMin(nums: number[]): number {
    
    // Initialize result with the first element as a starting point
    // No particular reason for it
    let result = nums[0];

    // Set up binary search boundaries
    let left = 0;
    let right = nums.length - 1;

    while(left <= right) {
        
        // If true, we are in a sorted portion already
        if(nums[left] < nums[right]) {
            // then the minimum is at the left pointer
            result = Math.min(result, nums[left]);
            break;
        }

        // Calculate middle index
        const mid = Math.floor((left+right)/2);
        // Keep track of the minimum value seen so far
        result = Math.min(result, nums[mid]);
        // Determine which half to search next:
        if(nums[mid] >= nums[left]) {
            // If we are in the LEFT we want to search RIGHT
            // Beceause, the LEFT portion will always have values that are greater than in the RIGHT portion
            left = mid + 1;
        } else {
            // If we are in the RIGHT we want to search LEFT in order to find potentially even smaller value
            right = mid - 1;
        }

    }

    return result;
};