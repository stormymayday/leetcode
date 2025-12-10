function productExceptSelf(nums: number[]): number[] {

    const n = nums.length;

    const prefixProducts = new Array(n);
    const postfixProducts = new Array(n);

    // Starting with 1, (excludes the last element)
    let prefixProduct = 1;
    for(let i = 0; i < n; i++) {
        prefixProducts[i] = prefixProduct;
        prefixProduct *= nums[i];
    }

    // Starting with 1 (excludes the first element)
    let postfixProduct = 1;
    for(let i = nums.length - 1; i >= 0; i--) {
        postfixProducts[i] = postfixProduct;
        postfixProduct *= nums[i];
    }

    // Now the indices align correctly
    let result = new Array(n);
    for(let i = 0; i < n; i++) {
        result[i] = prefixProducts[i] * postfixProducts[i];
    }
    return result;
}