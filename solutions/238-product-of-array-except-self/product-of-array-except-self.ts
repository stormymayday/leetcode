function productExceptSelf(nums: number[]): number[] {
    // Initialize variables to track total product and count of zeros
    let product = 1;
    let zeroes = 0;
    
    // Calculate product of all non-zero elements and count zeros
    for(const num of nums) {
        if(num !== 0) {
            // multiply
            product *= num;
        } else {
            // increment zero count and move to the next number
            zeroes++;
        }
    }
    
    // If there are multiple zeros, all results will be 0
    // (since each product will include at least one zero)
    if(zeroes > 1) {
        return new Array(nums.length).fill(0);
    }
    
    const result = [];
    
    // Case when exactly one zero exists in the array
    if(zeroes > 0) {
        for(let i = 0; i < nums.length; i++) {
            if(nums[i] !== 0) {
                // For non-zero elements, result will be 0 (since it includes the zero)
                result[i] = 0;
            } else {
                // For the zero element, result is product of all other elements
                result[i] = product;
            }
        }
    } else {
        // Case when no zeros exist
        // For each element, divide total product by current element
        for(let i = 0; i < nums.length; i++) {
            result.push(product / nums[i]);
        }
    }
    
    return result;
}