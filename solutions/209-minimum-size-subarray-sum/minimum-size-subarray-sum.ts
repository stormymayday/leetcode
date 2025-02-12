function minSubArrayLen(target: number, nums: number[]): number {
        if (!nums.length) {
            return 0;
        }

        let minLength = Infinity;
        let left = 0;
        let windowSum = 0;

        for (let right = 0; right < nums.length; right++) {
            if (nums[right] >= target) {
                return 1;
            }

            windowSum += nums[right];

            while (windowSum >= target) {
                
                minLength = Math.min(minLength, right - left + 1);

                windowSum -= nums[left];

                left++;
            }
        }

        return minLength === Infinity ? 0 : minLength;
    }