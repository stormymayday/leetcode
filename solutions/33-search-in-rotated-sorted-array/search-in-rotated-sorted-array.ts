function search(nums: number[], target: number): number {
    
    // Phase 1: find min idx / pivot
    let minIdx = findMin(nums);

    // Phase 2: figure out which portion the target can be in and run Binary Search on it
    let left = 0;
    let right = nums.length - 1;
    if(target >= nums[minIdx] && target <= nums[right]) {
        left = minIdx;
    } else {
        right = minIdx - 1;
    }
    while(left <= right) {
        const mid = left + Math.floor((right - left)/2);
        if(nums[mid] === target) {
            return mid;
        } else if(nums[mid] > target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return -1;

};

function findMin(nums: number[]): number {

    let left = 0;
    let right = nums.length - 1;
    let candidate = 0;
    while(left <= right) {

        const mid = left + Math.floor((right - left)/2);

        // search space is sorted
        if(nums[left] <= nums[right]) {
            if(nums[left] < nums[candidate]) {
                candidate = left;
            }
            break;
        }

        if(nums[mid] > nums[right]) {
            left = mid + 1;
        } else {
            // this is a candidate for 'min'
            candidate = mid;
            right = mid - 1;
        }

    }
    return candidate;
    
};