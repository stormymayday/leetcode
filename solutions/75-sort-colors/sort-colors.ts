/**
 Do not return anything, modify nums in-place instead.
 */
function sortColors(nums: number[]): void {

    const pivot = 1;

    // Forward Pass: Place all items smaller than the pivot
    let left = 0;
    for (let right = 0; right < nums.length; right += 1) {
        // Note: value at left must be greater than or EQUAL to pivot!
        if(nums[left] >= pivot && nums[right] < pivot) {
            const temp = nums[left];
            nums[left] = nums[right];
            nums[right] = temp;
        }
        // We need to store items less than 'pivot' on the left
        // Therefore, if value at left pointer is smaller than pivot, we can move on (forward)
        if(nums[left] < pivot) {
            left += 1;
        }
    }

    // Backwards Pass: Place all items greater than the pivot
    left = nums.length - 1;
    for (let right = nums.length - 1; right >= 0; right -= 1) {
        // Optimization: if the 'right' pointer encounteres value less than pivot
        // We have entered the 'sorted' portion from Forward Pass
        // if(nums[right] < pivot) {
        //     break;
        // }

        // Note: value at 'left' must be less than or EQUAL to pivot
        if(nums[left] <= pivot && nums[right] > pivot) {
            const temp = nums[left];
            nums[left] = nums[right];
            nums[right] = temp;
        }

        // If value is greater than pivot
        // We can move 'left' towards the start
        if(nums[left] > pivot) {
            left -= 1;
        }
    }

};