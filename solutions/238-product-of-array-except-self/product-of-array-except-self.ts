function productExceptSelf(nums: number[]): number[] {

    // Get the length of the input array
    const length = nums.length;

    // Initialize result array with all 1s
    // This is important since we'll be multiplying values into this array
    const result = new Array(length).fill(1);

    // Step 1: Calculate products of all elements to the left of each element
    // Initialize prefix as 1 (neutral element for multiplication)
    let prefix = 1;
    // Iterate from left to right
    for(let i = 0; i < length; i++) {
        // Store the current prefix (product of all elements to the left) in result[i]
        // For the first element (i=0), this will be 1 since there are no elements to its left
        // NOTE: Both result[i] *= prefix; and result[i] = prefix; are valid here
        // since result[i] is 1 (from initialization), these operations are equivalent
        result[i] *= prefix;
        // Update prefix by including the current element for the next iteration
        prefix *= nums[i];
    }

    // At this point, result array contains products of all elements to the left of each index
    // For example, if nums = [1,2,3,4], then result = [1,1,2,6]
    
    // Step 2: Calculate products of all elements to the right and multiply with left products
    // Initialize postfix as 1 (neutral element for multiplication)
    let postfix = 1;
    // Iterate from right to left
    for(let i = length - 1; i >= 0; i--) {
        // Multiply the current result (which contains left products) by postfix (right products)
        // This gives us the product of all elements except the current one
        result[i] *= postfix;
        // Update postfix by including the current element for the next iteration
        postfix *= nums[i];
    }
    // Final result contains the product of all elements except self at each index
    return result;
    
};