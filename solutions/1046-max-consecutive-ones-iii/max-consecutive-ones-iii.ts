function longestOnes(nums: number[], k: number): number {

    if(k === nums.length) {
        return nums.length;
    }

    let result = 0;

    let kCount = k;
    let left = 0;
    for(let right = 0; right < nums.length; right++) {

        if(nums[right] === 0) {
            kCount--;
        }

        while(kCount < 0) {
            if(nums[left] === 0) {
                kCount++;
            }
            left++;
        }

        result = Math.max(result, right - left + 1);

    }

    return result;
    
};