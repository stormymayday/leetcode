function productExceptSelf(nums: number[]): number[] {
    // Holds the product of all non-zero numbers
    let product = 1;
     // Counts the number of zeroes in the array
    let zeroCount = 0;
    // First Pass - Calculate Product and Zero Count
    for(let i = 0; i < nums.length; i++) {
        if(nums[i] === 0) {
            // Count zeroes
            zeroCount++;
        } else {
             // Multiply non-zero numbers
            product *= nums[i];
        }
    }
    // Edge Case - More than One Zero
    if(zeroCount > 1) {
        // If there are more than one zero, the entire result array will be all zeroes
        // because any product excluding any element will include a zero.
        return new Array(nums.length).fill(0);
    }
    // Second Pass - Construct the Result Array
    const result = [];
    for(let i = 0; i < nums.length; i++) {
        // If there is exactly one zero
        if(zeroCount > 0) {
            if(nums[i] === 0) {
                // The product will be non-zero only at the index where the zero is present
                result[i] = product;
            } else {
                // All other indices will be zero
                result[i] = 0;
            }
        } else {
            // If there are no zeroes
            // The result at each index is the product of all elements divided by the current element
            result.push(product / nums[i]);
        }
    }
    return result;
};