function productExceptSelf(nums: number[]): number[] {

    const n = nums.length;

    const prefixProducts: number[] = new Array(n);
    let prefixProduct = 1;
    for(let i = 0; i < n; i += 1) {
        prefixProduct *= nums[i];
        prefixProducts[i] = prefixProduct;
    }

    const postfixProducts: number[] = new Array(n);
    let postfixProduct = 1;
    for(let i = n - 1; i >= 0; i -= 1) {
        postfixProduct *= nums[i];
        postfixProducts[i] = postfixProduct;
    }

    const res: number[] = new Array(n);
    for(let i = 0; i < res.length; i += 1) {
        const prefix = i - 1 < 0 ? 1 : prefixProducts[i - 1];
        const postfix = i + 1 < n ? postfixProducts[i + 1] : 1; 
        res[i] = prefix * postfix;
    }
    return res;
    
};