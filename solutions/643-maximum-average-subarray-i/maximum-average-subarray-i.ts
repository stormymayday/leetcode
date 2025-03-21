function findMaxAverage(nums: number[], k: number): number {
    
    let maxAverage = -Infinity;
    
    if(k > nums.length) {
        return 0;
    }

    let left = 0;
    let windowMax = 0;
    for(let right = 0; right < nums.length; right++) {

        windowMax += nums[right];

        if(right - left + 1 === k) {
            // calc max average
            maxAverage = Math.max(maxAverage, windowMax/k);

            windowMax -= nums[left];

            // shift left
            left++;

        } else {
            continue;
        }

    }

    return maxAverage;
};