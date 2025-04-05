function isPerfectSquare(num: number): boolean {

    // Edge case 1: Negative numbers cannot be perfect squares in real number system
    if(num < 0) {
        return false;
    }

    // Edge case 2: Both 0 and 1 are perfect squares (0² = 0, 1² = 1)
    // Handling these separately also avoids division by zero issues
    if (num <= 1) { 
        return true;
    }

    // Initialize binary search boundaries
    let left = 1;
    // Optimization: For numbers > 1, their square root cannot be larger than num/2
    // This significantly reduces the search space for large numbers
    let right = Math.floor(num / 2);

    // Binary search loop to find if num is a perfect square
    while(left <= right) {
        // Find the middle point of our current search range
        const mid = Math.floor((left + right) / 2);
        // Calculate the square once and store it to avoid redundant computation
        const square = mid * mid;

        if(square > num) {
            // If mid² is larger than num, search in the lower half
            right = mid - 1;
        } else if(square < num) {
            // If mid² is smaller than num, search in the upper half
            left = mid + 1;
        } else {
            // If mid² equals num, we found a perfect square
            return true;
        }
    }

    // If we exit the loop without finding a perfect square, return false
    return false;

};