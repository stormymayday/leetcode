function longestOnes(nums: number[], k: number): number {

    let result = 0;

    if(k > nums.length) {
        return result;
    }

    let left = 0;
    let right = 0;
    let kCount = k;
    while(right < nums.length) {

        if(nums[right] === 0) {
            kCount--;
        }

        // while(kCount < 1) {
        while(kCount < 0) {

            // move left over
            left++;

            // if it steps over 0, inrement count
            if(nums[left - 1] !== undefined && nums[left - 1] === 0) {
                kCount++;
            }

        }

        
        result = Math.max(result, right - left + 1);

        right++;

    }

    return result;
    
};