function maximumSubarraySum(nums: number[], k: number): number {
    // Stores the maximum sum of a valid subarray
    let result = 0; 

    // If the array is smaller than k, return 0 (no valid subarray possible)
    if (nums.length < k) {
        return result;
    }

    // HashMap to track element frequencies in the window
    const freqMap: Record<number, number> = {};

    // To tracks number of unique values
    let valueCount = 0;

    // Left pointer of the sliding window
    let left = 0;

    // Stores the sum of the current window
    let windowSum = 0;

    // Iterating through the array using the right pointer
    for (let right = 0; right < nums.length; right++) {

        // Adding the current element to the window sum
        windowSum += nums[right];

        // Updating frequency map: increment count for nums[right]
        if (!freqMap[nums[right]]) {
            freqMap[nums[right]] = 1;
            valueCount++;
        } else {
            freqMap[nums[right]]++;
        }

        // If the window size exceeds k, shrink it from the left
        if (right - left + 1 > k) {
            // Remove the leftmost element from the sum
            windowSum -= nums[left];

            // Decrease its frequency
            freqMap[nums[left]]--;

            // If frequency becomes zero, remove it from the map
            if (freqMap[nums[left]] === 0) {
                delete freqMap[nums[left]];
                valueCount--;
            }

            // Move the left pointer forward
            left++; 
        }

        // Check if window size is exactly k and contains k unique elements
        if (right - left + 1 === k && valueCount === k) {
             // Update maximum sum
            result = Math.max(result, windowSum);
        }
    }

    // Return the maximum sum found
    return result; 
}
