/**
 * Returns a sorted array of squared values from the input sorted array.
 * The approach:
 * 1. First find the element with the smallest absolute value
 * 2. Start from that element and work outward in both directions
 * 3. Always pick the element with smaller absolute value next
 * 
 * @param nums A sorted array of integers (can contain negative numbers)
 * @return A sorted array of squares of the input values
 */
function sortedSquares(nums: number[]): number[] {
    // Initialize result array
    const result = [];

    // Find the element with the minimum absolute value
    let min = Infinity;
    let minIndex = 0;
    for(let i = 0; i < nums.length; i++) {
        if(min > Math.abs(nums[i])) {
            min = Math.abs(nums[i]);
            minIndex = i;
        }
    }

    // Add the square of the minimum value to our result
    result.push(nums[minIndex] * nums[minIndex]);
    
    // Initialize pointers to move outward from the minimum element
    let left = minIndex - 1;    // Pointer going left from minimum
    let right = minIndex + 1;   // Pointer going right from minimum
    
    // Process elements while both pointers are valid
    while(left >= 0 && right < nums.length) {
        // Compare absolute values and take the smaller one first
        if(Math.abs(nums[left]) < Math.abs(nums[right])) {
            result.push(nums[left] * nums[left]);
            left--;
        } else {
            result.push(nums[right] * nums[right]);
            right++;
        }
    }

    // Handle any remaining elements to the left of the minimum
    while(left >= 0) {
        result.push(nums[left] * nums[left]);
        left--;
    }

    // Handle any remaining elements to the right of the minimum
    while(right < nums.length) {
        result.push(nums[right] * nums[right]);
        right++;
    }

    // Return the sorted squares
    return result;
};