function removeDuplicates(nums: number[]): number {

    let left = 0;
    for(let right = 1; right < nums.length; right += 1) {

        if(nums[right] !== nums[right - 1]) {
            left += 1;
            nums[left] = nums[right];
        }

    }

    return left + 1; 
    
};