/**
 Do not return anything, modify nums in-place instead.
 */
function sortColors(nums: number[]): void {

    // Phase 1: Move all 2s to the right
    // - left should be on '2'
    // - right should be on non '2'
    let left = 0;
    for(let right = 0; right < nums.length; right += 1) {

        if(nums[left] === 2 && nums[right] !== 2) {
            nums[left] = nums[right];
            nums[right] = 2;
            left += 1;
        }

        if(nums[left] !== 2) {
            left += 1;
        }

    }
    // Note: 'left' should be on '2' after loop ends

    // Phase 2: Move all 0s to the left (going backwards?)
    // - left should be on '0' (it's on 2 initilly)
    // - right should be on non '0'
    // - Therefore, perhaps we can 'pre' assign 'left' & 'right'?
    // - 'left' goes 1 step backwards?
    // - 'right' goes 2 step backwards?
    left = nums.length - 1;
    for(let right = nums.length - 1; right >= 0; right -= 1) {
        if(nums[left] === 0 && nums[right] !== 0) {
            nums[left] = nums[right];
            nums[right] = 0;
            left -= 1;
        }

        if(nums[left] !== 0) {
            left -= 1;
        }
    }
    
};