/**
 Do not return anything, modify nums in-place instead.
 */
function sortColors(nums: number[]): void {
    
    const pivot = 1;

    // Forward Pass: Place all items smaller than the pivot
    for(let i = 0; i < nums.length; i += 1) {
        for(let j = i + 1; j < nums.length; j += 1) {

            if(nums[j] < pivot) {
                const temp = nums[i];
                nums[i] = nums[j];
                nums[j] = temp;
                break;
            }

        }
    }

    // Backwards Pass: Place all items greater than the pivot
    for(let i = nums.length - 1; i >= 0; i -= 1) {
        for(let j = i - 1; j >= 0; j -= 1) {

            if(nums[j] > pivot) {
                const temp = nums[i];
                nums[i] = nums[j];
                nums[j] = temp;
                break;
            }

        }
    }

};