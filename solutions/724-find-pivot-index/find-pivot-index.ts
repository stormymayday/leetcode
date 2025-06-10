function pivotIndex(nums: number[]): number {
    const n = nums.length;
    let total = 0;
    for(let i = 0; i < n; i += 1) {
        total += nums[i];
    }

    let leftSum = 0;
    for(let i = 0; i < n; i += 1) {
        const rightSum = total - leftSum - nums[i];
        if(leftSum === rightSum) {
            return i;
        }
        leftSum += nums[i];
    }
    
    return -1;
};