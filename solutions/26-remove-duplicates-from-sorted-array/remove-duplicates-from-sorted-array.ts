function removeDuplicates(nums: number[]): number {

    let left = 0;
    let right = 1;
    while(right < nums.length) {

        if(nums[left] === nums[right]) {

            right += 1;

        } else {

            left += 1;

            nums[left] = nums[right];

        }

    }
    
    return left + 1;
};