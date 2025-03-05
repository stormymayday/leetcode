function productExceptSelf(nums: number[]): number[] {
    const prefixArray = [];
    const postfixArray = [];
    const result = [];
    
    // Calculate prefix products (product of all elements to the LEFT)
    let prefix = 1;
    for (let i = 0; i < nums.length; i++) {
        prefixArray.push(prefix);
        prefix *= nums[i];
    }
    
    // Calculate postfix products (product of all elements to the RIGHT)
    let postfix = 1;
    for (let i = nums.length - 1; i >= 0; i--) {
        postfixArray[i] = postfix;
        postfix *= nums[i];
    }
    
    // Multiply prefix and postfix products
    for (let i = 0; i < nums.length; i++) {
        result.push(prefixArray[i] * postfixArray[i]);
    }
    
    return result;
}
