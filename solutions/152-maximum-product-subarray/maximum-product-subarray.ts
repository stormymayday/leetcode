function maxProduct(nums: number[]): number {
    
    const n = nums.length;

    let max = -Infinity;

    for (let i = 0; i < n; i += 1) {

        let prod = 1;

        for (let j = i; j < n; j += 1) {

            prod *= nums[j];

            max = Math.max(max, prod);

        }

    }

    return max;
};