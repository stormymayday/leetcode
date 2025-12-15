function maxProduct(nums: number[]): number {

    const n = nums.length;
    
    let max = -Infinity;
    let prod = 1;

    for(let i = 0; i < n; i += 1) {

        if(nums[i] === 0) {
            max = Math.max(max, 0);
            prod = 1;
            continue;
        }

        prod *= nums[i];
        max = Math.max(max, prod);

    }

    prod = 1;
    for(let i = n - 1; i >= 0; i -= 1) {

        if(nums[i] === 0) {
            max = Math.max(max, 0);
            prod = 1;
            continue;
        }

        prod *= nums[i];
        max = Math.max(max, prod);

    }

    return max;

};