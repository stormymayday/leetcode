function findMin(nums: number[]): number {

    let left: number = 0;
    let right: number = nums.length - 1;
    let minIdx: number = 0;

    while(left <= right) {

        if(nums[left] <= nums[right]) {
            if(nums[minIdx] > nums[left]) {
                minIdx = left;
            }
            break;
        }

        const mid = left + Math.floor((right - left) / 2);

        minIdx = mid;

        if(nums[mid] > nums[right]) {
            left = mid + 1;
        } 
        // nums[mid] <= nums[right]
        else {
            right = mid - 1;
        }

    }

    return nums[minIdx];
    
};