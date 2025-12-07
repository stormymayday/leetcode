function rearrangeArray(nums: number[]): number[] {
    const positives = [];
    const negatives = [];
    for (let i = 0; i < nums.length; i += 1) {
        if (nums[i] < 0) {
            negatives.push(nums[i]);
        } else {
            positives.push(nums[i]);
        }
    }
    
    for(let i = 0; i < nums.length / 2; i += 1) {
        nums[i * 2] = positives[i];
        nums[i * 2 + 1] = negatives[i];
    }

    return nums;
};