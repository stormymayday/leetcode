function maximumSubarraySum(nums: number[], k: number): number {
    let result = 0;

    if (nums.length < k) {
        return 0;
    }

    const hashSet = new Set<number>();

    let left = 0;
    let windowSum = 0;

    for (let right = 0; right < nums.length; right++) {
        // Ensure uniqueness by shrinking window if duplicate appears
        while (hashSet.has(nums[right])) {
            hashSet.delete(nums[left]);
            windowSum -= nums[left];
            left++;
        }

        // Add new element
        hashSet.add(nums[right]);
        windowSum += nums[right];

        // If we have a valid subarray of size k
        if (right - left + 1 === k) {
            result = Math.max(result, windowSum);

            // Remove leftmost element from window to slide right
            hashSet.delete(nums[left]);
            windowSum -= nums[left];
            left++;
        }
    }

    return result;
}
