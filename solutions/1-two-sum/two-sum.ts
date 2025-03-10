function twoSum(nums: number[], target: number): number[] {
    // Edge Case: If the array has fewer than 2 elements
    if (nums.length < 2) {
        // A valid pair is not possible
        return [];
    }

    // Initialize an empty hash map to store values and their indices
    const hashMap = {};

    // Iterate through the array
    for (let i = 0; i < nums.length; i++) {
        // Calculate the difference needed to reach the target
        const difference = target - nums[i];

        // Check if the difference is not in the hash map
        if (hashMap[difference] === undefined) {
            // If not, store the current value's index in the hash map
            // Key = current value, Value = current index
            hashMap[nums[i]] = i;
        } else {
            // If the difference exists, return the indices of the current value and the matching pair
            return [i, hashMap[difference]];
        }
    }

    // Return empty array if no valid pair was found after iterating through the array
    return [];
};