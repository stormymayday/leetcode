/**
 * Returns a sorted array of squared values from the input sorted array.
 * This solution uses a two-pointer approach working from both ends toward the middle,
 * placing the largest squared values first.
 * 
 * @param nums A sorted array of integers (can contain negative numbers)
 * @return A sorted array of squares of the input values in ascending order
 */
function sortedSquares(nums: number[]): number[] {
    // Initialize result array with zeros to match the input array length
    const result = new Array(nums.length).fill(0);
    
    // Initialize two pointers: left at the beginning and right at the end of the array
    let left = 0;
    let right = nums.length - 1;
    
    // We'll fill the result array from the end (largest values) to the beginning
    let resultIndex = nums.length - 1;
    
    // Continue until the pointers meet or cross
    // The condition is left <= right (not just <) to ensure we process the middle element
    // when the array has odd length or when left and right pointers meet at the same index
    while(left <= right) {
        // Compare absolute values to determine which value is larger when squared
        if(Math.abs(nums[left]) < Math.abs(nums[right])) {
            // The right value has larger absolute value
            // Square it and place it at the current result position
            result[resultIndex] = nums[right] * nums[right];
            // Move the right pointer inward
            right--;
        } else {
            // The left value has larger or equal absolute value
            // Square it and place it at the current result position
            result[resultIndex] = nums[left] * nums[left];
            // Move the left pointer inward
            left++;
        }
        // Move to the next result position (going from right to left)
        resultIndex--;
    }
    
    // Return the sorted array of squared values
    return result;
};