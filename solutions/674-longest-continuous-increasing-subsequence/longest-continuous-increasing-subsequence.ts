function findLengthOfLCIS(nums: number[]): number {

    let result = 0;

    let left = 0;
    for(let right = 0; right < nums.length; right++) {

        const currentNum = nums[right];

        if(nums[right - 1] !== undefined && nums[right] <= nums[right - 1]) {
            left = right;
        }
        
        result = Math.max(result, right - left + 1);

    }

    return result;
    
};