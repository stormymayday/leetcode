function findMin(nums: number[]): number {

    // Edge Case: there is only one element
    if(nums.length === 1) {
        return nums[0];
    }

    let left: number = 0;
    let right: number = nums.length - 1;
    let candidate: number = 0;

    while(left <= right) {

        const mid: number = left + Math.floor((right - left) / 2);

        // value at 'mid' is greater than OR equals to value at 'left'
        // AND greater than value at 'right'
        if(nums[mid] >= nums[left] && nums[mid] >= nums[right]) {
            // update candidate
            if(nums[mid] < nums[candidate]) {
                candidate = mid;
            }
            // discard left?
            left = mid + 1;
        }
        // value at 'mid' is less than value at 'left', mid is in the 'left' half (smaller values)
        else if(nums[mid] < nums[left]) {
            // update candidate
            if(nums[mid] < nums[candidate]) {
                candidate = mid;
            }
            // discard right
            right = mid - 1;
        } 
        // value at 'left' is smaller than value at 'right'
        // - remaining search space is sorted
        else if(nums[left] < nums[right]) {
            // update candidate
            if(nums[left] < nums[candidate]) {
                candidate = left;
            }
            // and exit
            break;
        }

    }

    return nums[candidate];
    
};