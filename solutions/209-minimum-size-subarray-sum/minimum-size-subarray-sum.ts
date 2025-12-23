function minSubArrayLen(target: number, nums: number[]): number {

    let min = Infinity;

    let left = 0;
    let currSum = 0;
    for(let right = 0; right < nums.length; right += 1) {

        currSum += nums[right];

        while(currSum - nums[left] >= target) {
            currSum -= nums[left];
            left += 1;
        }

        if(currSum >= target) {
            min = Math.min(min, right - left + 1);
        }

    }

    return min === Infinity ? 0 : min;
    
};