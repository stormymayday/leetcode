function longestOnes(nums: number[], k: number): number {
    // Two pointers to define the sliding window
    let left = 0; 
    let right = 0; 

    // Iterate through the array using the right pointer
    while (right < nums.length) {
        
        // If the current element is 0, we "flip" it by decreasing k
        if (nums[right] === 0) {
            k--;
        }

        // If k is negative, it means we have flipped more 0s than allowed
        // We need to shrink the window from the left
        if (k < 0) {
            // If the element at `left` is 0, restoring it gives us back a flip
            if (nums[left] === 0) {
                k++;
            }
            // Move the left pointer forward to maintain a valid window
            left++;
        }

        // Expand the window by moving the right pointer
        right++;
    }

    // The length of the longest valid window found
    return right - left;
}