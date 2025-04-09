function binarySearch(nums: number[], leftIndex: number, rightIndex: number, target: number): number {
    let left = leftIndex;
    let right = rightIndex;
    while(left <= right) {
        const mid = Math.floor((left+right)/2);
        if(target > nums[mid]) {
            left = mid + 1;
        } else if(target < nums[mid]) {
            right = mid - 1;
        } else {
            return mid;
        }
    }
    return -1;
}

function searchRange(nums: number[], target: number): number[] {

    // Edge Case: empty array
    if(nums.length === 0) {
        return [-1, -1];
    }

    // Find any occurrence of the target first
    const initialPosition = binarySearch(nums, 0, nums.length - 1, target);

    // If target not found at all, return [-1, -1]
    if(initialPosition === -1) {
        return [-1, -1];
    } else {
        // Find leftmost occurrence by repeatedly searching in the left portion
        let currentLeftSearch = initialPosition;
        let leftmostPosition = currentLeftSearch;
        while(currentLeftSearch !== -1) {
            // Save the current position as the leftmost known position
            leftmostPosition = currentLeftSearch;
            // Search for target in the portion to the left of the current position
            currentLeftSearch = binarySearch(nums, 0, currentLeftSearch - 1, target);
        }

        // Find rightmost occurrence by repeatedly searching in the right portion
        let currentRightSearch = initialPosition;
        let rightmostPosition = currentRightSearch;
        while(currentRightSearch !== -1) {
            // Save the current position as the rightmost known position
            rightmostPosition = currentRightSearch;
            // Search for target in the portion to the right of the current position
            currentRightSearch = binarySearch(nums, currentRightSearch + 1, nums.length - 1, target);
        }

        // Return the range as [leftmost, rightmost] positions
        return [leftmostPosition, rightmostPosition];
    }
    
};