function minSubArrayLen(target: number, nums: number[]): number {
    
    let result = Infinity;

    if(!nums.length) {
        return 0;
    }

    let left = 0;
    let windowSum = 0;

    for(let right = 0; right < nums.length; right++) {

        if(nums[right] >= target) {
            return 1;
        } 

        windowSum += nums[right];

        while(windowSum >= target) {

            windowSum -= nums[left];

            result = Math.min(result, right - left + 1);

            left++;

        }

    }

    return result === Infinity ? 0 : result;

};