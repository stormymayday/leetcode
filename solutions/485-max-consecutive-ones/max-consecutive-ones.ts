function findMaxConsecutiveOnes(nums: number[]): number {
    let max = 0;
    let currMax = 0;
    for(let i = 0; i < nums.length; i += 1) {
        if(nums[i] === 1) {
            currMax += 1;
            max = Math.max(max, currMax);
        } else {
            currMax = 0;
        }
    }
    return max;
};