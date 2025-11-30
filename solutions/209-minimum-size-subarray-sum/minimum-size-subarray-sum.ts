function minSubArrayLen(target: number, nums: number[]): number {

    let minLength = Infinity;
    let left = 0;
    let sum = 0;

    for (let right = 0; right < nums.length; right += 1) {

        // adding to the sum
        sum += nums[right];

        while (sum >= target) {
            minLength = Math.min(minLength, right - left + 1);
            sum -= nums[left];
            left += 1;
        }

    }

    return minLength === Infinity ? 0 : minLength;

};