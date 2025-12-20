function findMaxConsecutiveOnes(nums: number[]): number {

    const n = nums.length;
    let max = 0;
    let flipsAllowed = 1;
    let left = 0;
    for (let right = 0; right < n; right += 1) {

        // Stepping on a non 1 with 'right'
        if (nums[right] !== 1) {
            flipsAllowed -= 1; // can go below 0
        }

        // Make window valid
        if(flipsAllowed < 0) {

            if (nums[left] !== 1) {
                flipsAllowed += 1;
            }

            left += 1;

        }

        // Calc max (if window is valid)
        if (flipsAllowed >= 0) {
            max = Math.max(max, right - left + 1);
        }

    }

    return max;

};