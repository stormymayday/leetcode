function twoSum(numbers: number[], target: number): number[] {
    // Initialize two pointers - one at the start and one at the end of the array
    let left = 0;
    let right = numbers.length - 1;
    // Iterate until pointers meet
    while (left < right) {
        // Sums to the target!
        if (numbers[left] + numbers[right] === target) {
            // Return both indices (adding 1 to convert to 1-indexed)
            return [left + 1, right + 1];
        } else if (numbers[left] + numbers[right] > target) {
            // Sum is too large
            // Need a smaller value
            // Since array is sorted, moving right pointer left will decrease the sum
            right--;
        } else {
            // Otherwise, sum is too small
            // Need a larger value
            // Since array is sorted, moving left pointer right will increase the sum
            left++;
        }
    }
}