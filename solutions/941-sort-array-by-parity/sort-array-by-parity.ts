function sortArrayByParity(nums: number[]): number[] {
    let left = 0;
    let right = nums.length - 1;

    while(left < right) {

        if(nums[left] % 2 === 0 && nums[right] % 2 !== 0) {
            left += 1;
            right -= 1;
        } else if(nums[left] % 2 !== 0 && nums[right] % 2 === 0) {
            const temp = nums[left];
            nums[left] = nums[right];
            nums[right] = temp;
            left += 1;
            right -= 1;
        } else if(nums[left] % 2 === 0 ) {
            left += 1;
        } else if(nums[right] % 2 !== 0) {
            right -= 1;
        }

    }

    return nums;
};