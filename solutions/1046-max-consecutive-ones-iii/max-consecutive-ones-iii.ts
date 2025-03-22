function longestOnes(nums: number[], k: number): number {
    let result = 0;
    let numberOfKsLeft = k;
    let currentMax = 0;
    let left = 0;
    for (let right = 0; right < nums.length; right++) {
        if (nums[right] === 1) {
            currentMax = right - left + 1;
            result = Math.max(result, currentMax);
        } else if (nums[right] === 0 && numberOfKsLeft > 0) {
            
            currentMax = right - left + 1;
            result = Math.max(result, currentMax);
            numberOfKsLeft--;
        } else {
            // This means nums[right] === 0 and numberOfKsLeft === 0
            while (numberOfKsLeft === 0) {
                if (nums[left] === 0) {
                    numberOfKsLeft++;  // Restore a flip when removing a `0`
                }
                left++;
            }
            // Now we have a flip available, use it for the current zero
            numberOfKsLeft--;
            currentMax = right - left + 1;
            result = Math.max(result, currentMax);
        }
    }
    return result;
};