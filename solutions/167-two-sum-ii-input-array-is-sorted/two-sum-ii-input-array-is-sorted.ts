function twoSum(numbers: number[], target: number): number[] {
    // Initialize two pointers: left starting at the beginning and right at the end of the array
    let left = 0;
    let right = numbers.length - 1;

    // Iterate while the left pointer is less than the right pointer
    while (left < right) {
        // Check if the sum of the numbers at the left and right pointers equals the target
        if (numbers[left] + numbers[right] === target) {
            // Return the 1-based indices of the two numbers
            return [left + 1, right + 1];
        }
        // If the sum is greater than the target, move the right pointer to the left
        else if (numbers[left] + numbers[right] > target) {
            right--;
        }
        // If the sum is less than the target, move the left pointer to the right
        else {
            left++;
        }
    }

    // If no valid pair is found, return an empty array
    return [];
}