function findMaxAverage(nums: number[], k: number): number {

    let maxAvg = -Infinity;
    let currSum = 0;
    let left = 0;
    for(let right = 0; right < nums.length; right += 1) {

        currSum += nums[right];

        if(right - left + 1 > k) {
            currSum -= nums[left];
            left += 1;
        }

        if(right - left + 1 === k) {
            maxAvg = Math.max(maxAvg, currSum / k);
        }

    }

    return maxAvg;
    
};