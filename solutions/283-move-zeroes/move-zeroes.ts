/**
 Do not return anything, modify nums in-place instead.
 */
function moveZeroes(nums: number[]): void {
    
    let left = 0;
    for(let right = 1; right < nums.length; right += 1) {

        while(left < right && nums[left] !== 0) {
            left += 1;
        }

        if(nums[left] === 0 && nums[right] !== 0) {
            nums[left] = nums[right];
            nums[right] = 0;
        }

    }


};