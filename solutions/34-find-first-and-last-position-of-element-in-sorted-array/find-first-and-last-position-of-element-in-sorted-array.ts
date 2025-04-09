function modifiedBinarySearch(nums: number[], target: number, leftBias: boolean): number {

    let left = 0;
    let right = nums.length - 1;

    // Initialize result index to -1 (not found)
    let result = -1;
    
    while(left <= right) {

        const mid = Math.floor((left+right)/2);
        
        if(target > nums[mid]) {
            left = mid + 1;
        } else if(target < nums[mid]) {
            right = mid - 1;
        } else {

            // Target found at the current position
            // Store the current match
            result = mid;
            
            if(leftBias) {
                // For leftmost occurrence: continue searching in the left half
                // This allows us to find earlier occurrences if they exist
                right = mid - 1;
            } else {
                // For rightmost occurrence: continue searching in the right half
                // This allows us to find later occurrences if they exist
                left = mid + 1;
            }
        }
    }
    // Return the biased position (or -1 if not found)
    return result;
}

function searchRange(nums: number[], target: number): number[] {
    // Edge Case: empty array
    if(nums.length === 0) {
        return [-1, -1];
    }

    // Find the leftmost occurrence with leftBias=true
    const left = modifiedBinarySearch(nums, target, true);
    
    // Find the rightmost occurrence with leftBias=false
    const right = modifiedBinarySearch(nums, target, false);

    return [left, right];
}