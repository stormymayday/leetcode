function removeDuplicates(nums: number[]): number {
    let left = 0;
    for(let right = 1; right < nums.length; right += 1) {
        if(nums[left] !== nums[right]) {
            nums[left + 1] = nums[right];
            left += 1;
        }
    }
    return left + 1;
};