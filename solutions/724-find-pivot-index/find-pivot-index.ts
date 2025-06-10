function pivotIndex(nums: number[]): number {
    const n = nums.length;
    const prefixSums = [];
    const postfixSums = [];

    let total = 0;
    for(let i = 0; i < n; i += 1) {
        total += nums[i];
        prefixSums.push(total);
    }

    total = 0;
    for(let i = n - 1; i >= 0; i -= 1) {
        total += nums[i];
        postfixSums[i] = total;
    }

    for(let i = 0; i < n; i += 1) {
        const prefixSum = i > 0 ? prefixSums[i - 1] : 0;
        const postfixSum = i < n - 1 ? postfixSums[ i + 1] : 0;
        if(prefixSum === postfixSum) {
            return i;
        }
    }

    return -1;
};