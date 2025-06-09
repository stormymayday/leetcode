function pivotIndex(nums: number[]): number {
    let total = 0;
    const prefixSums = [0];
    for(let i = 0; i < nums.length; i += 1) {
        total += nums[i];
        prefixSums.push(total);
    }

    for(let i = 0; i < nums.length; i += 1) {
        const leftSum = prefixSums[i];
        const rightSum = prefixSums[nums.length] - prefixSums[i + 1];
        if(leftSum === rightSum) {
            return i;
        }
    }

    return -1;
};