function productExceptSelf(nums: number[]): number[] {

    const n = nums.length;

    const res: number[] = new Array(n).fill(1);

    // First Pass: Prefix Products (Left to Right)
    let prefixProduct = 1;
    for(let i = 0; i < n; i += 1) {
        // 1. Multiply prefixProduct with value at res[i]
        res[i] *= prefixProduct;
        // 2. Multiply prefixProduct with value at nums[i]
        prefixProduct *= nums[i];
    }

    // Second Pass: Postfix Products (Right to Left)
    let postfixProduct = 1;
    for(let i = n - 1; i >= 0; i -= 1) {
        // 1. Multiply postfixProduct with value at res[i]
        res[i] *= postfixProduct;
        // 2. Multiply postfixProduct with value at nums[i]
        postfixProduct *= nums[i];
    }

    return res;
    
};