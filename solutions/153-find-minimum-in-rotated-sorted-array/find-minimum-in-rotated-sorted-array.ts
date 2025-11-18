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
            candidate = mid;
            right = mid - 1;
        }

    }
    return nums[candidate];
    
};