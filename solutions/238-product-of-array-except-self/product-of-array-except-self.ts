function productExceptSelf(nums: number[]): number[] {
    const n = nums.length;
    const result = new Array(n);

    let product = 1;
    const prefix = new Array(n);
    for(let i = 0; i < n; i += 1) {
        product *= nums[i];
        prefix[i] = product;
    }
    
    product = 1;
    const postfix = new Array(n);
    for(let i = n - 1; i >= 0; i -= 1) {
        product *= nums[i];
        postfix[i] = product;
    }

    for(let i = 0; i < n; i += 1) {
        const product = (i > 0 ? prefix[i - 1] : 1) * (i < n - 1 ? postfix[i + 1] : 1);
        result[i] = product;
    }

    return result;
};