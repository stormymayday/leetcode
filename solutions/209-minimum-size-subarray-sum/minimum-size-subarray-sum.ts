function minSubArrayLen(target: number, nums: number[]): number {

    let minSize = Infinity;

    let currSum = 0;
    let left = 0;
    for (let right = 0; right < nums.length; right += 1) {

        currSum += nums[right];

        // window is valid
        while (left < nums.length && currSum >= target) {
            minSize = Math.min(minSize, right - left + 1);
            currSum -= nums[left];
            left += 1;
        }

    }

    return minSize === Infinity ? 0 : minSize;

};