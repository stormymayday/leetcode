function findMaxAverage(nums: number[], k: number): number {
    
    let maxAverage = -Infinity;
    let left = 0;
    let currSum = 0;
    for(let right = 0; right < nums.length; right += 1) {

        currSum += nums[right];

        if(right - left + 1 > k) {
            currSum -= nums[left];
            left += 1;
        }

        if(right - left + 1 === k) {
            maxAverage = Math.max(maxAverage, currSum / k);
        }

    }

    return maxAverage;

};