function maxSubArray(nums: number[]): number {
    
    let max = -Infinity;
    let currMax = 0;
    for(let i = 0; i < nums.length; i += 1) {

        currMax += nums[i];

        max = Math.max(max, currMax);

        if(currMax < 0) {
            currMax = 0;
        }

    }
    return max;

};