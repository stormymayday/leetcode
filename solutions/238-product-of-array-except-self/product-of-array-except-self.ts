function productExceptSelf(nums: number[]): number[] {
    const n = nums.length;
    const result = new Array(n);

    let prefix = 1;
    for(let i  = 0; i < n; i += 1) {
        result[i] = prefix;
        prefix *= nums[i];
    }

    let postfix = 1;
    for(let i = n - 1; i >= 0; i -= 1) {
        result[i] *= postfix;
        postfix *= nums[i]
    }

    return result;

};