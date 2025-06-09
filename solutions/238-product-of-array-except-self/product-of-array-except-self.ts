function productExceptSelf(nums: number[]): number[] {
    const n = nums.length;
    const result = new Array(n);
    const prefix = new Array(n);
    const postfix = new Array(n);

    let product = 1;
    for(let i = 0; i < n; i += 1) {
        product *= nums[i];
        prefix[i] = product;
    }

    product = 1;
    for(let i = n - 1; i >= 0; i -= 1) {
        product *= nums[i];
        postfix[i] = product;
    }

    for(let i = 0; i < n; i += 1) {
        result[i] = (prefix[i - 1] !== undefined ? prefix[i - 1] : 1) * (postfix[i + 1] !== undefined ? postfix[i + 1] : 1);
    }

    return result;
};