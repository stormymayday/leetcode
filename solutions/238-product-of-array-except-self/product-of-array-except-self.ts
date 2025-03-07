function productExceptSelf(nums: number[]): number[] {
    const prefixArray = [];
    const postfixArray = new Array(nums.length);

    // Calculate products of all elements to the left of each element
    let prefix = 1;
    for(let i = 0; i < nums.length; i++) {
        prefixArray.push(prefix);
        prefix *= nums[i];
    }

    // Calculate products of all elements to the right of each element
    // Store directly at the index
    let postfix = 1;
    for(let i = nums.length - 1; i >= 0; i--) {
        postfixArray[i] = postfix;
        postfix *= nums[i];
    }

    // Now the indices align correctly
    let result = [];
    for(let i = 0; i < nums.length; i++) {
        result.push(prefixArray[i] * postfixArray[i]);
    }
    return result;
}