function pivotIndex(nums: number[]): number {
    let total = 0;
    for(let i = 0; i < nums.length; i += 1) {
        total += nums[i];
    }

    let leftSum = 0;
    for(let i = 0; i < nums.length; i += 1) {
        const rightSum = total - nums[i] - leftSum;
        if(leftSum === rightSum) {
            return i;
        }
        leftSum += nums[i];
    }

    return -1;
};