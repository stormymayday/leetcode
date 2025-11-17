function findMin(nums: number[]): number {

    let left: number = 0;
    let right: number = nums.length - 1;
    let candidate: number = 0;

    while (left <= right) {

        const mid: number = left + Math.floor((right - left) / 2);

        // update candidate
        if (nums[mid] < nums[candidate]) {
            candidate = mid;
        }

        // value at 'mid' is greater than OR equals to value at 'left'
        if (nums[mid] >= nums[right]) {
            // discard left?
            left = mid + 1;
        }
        // value at 'mid' is less than value at 'left'
        else if (nums[mid] < nums[left]) {
            // discard right
            right = mid - 1;
        }
        // value at 'left' is smaller than value at 'right'
        // - remaining search space is sorted
        else if (nums[left] < nums[right]) {
            // update candidate
            if (nums[left] < nums[candidate]) {
                candidate = left;
            }
            // and exit
            break;
        }

    }

    return nums[candidate];

};