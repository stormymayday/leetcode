function maxProduct(nums: number[]): number {

    const n = nums.length;
    
    let max = -Infinity;

    // First Pass: Prefix Product
    let prod = 1;
    for(let i = 0; i < n; i += 1) {
        
        // Edge Case: a zero
        if(nums[i] === 0) {
            max = Math.max(max, 0); // zero could be the max if all vals are negative
            prod = 1; // reset and continue
            continue;
        }

        prod *= nums[i];
        max = Math.max(max, prod);

    }

    // Second Pass: Postfix Product
    prod = 1;
    for(let i = n - 1; i >= 0; i -= 1) {

        // Edge Case: a zero
        if(nums[i] === 0) {
            max = Math.max(max, 0); // zero could be the max if all vals are negative
            prod = 1; // reset and continue
            continue;
        }

        prod *= nums[i];
        max = Math.max(max, prod);

    }

    return max;

};