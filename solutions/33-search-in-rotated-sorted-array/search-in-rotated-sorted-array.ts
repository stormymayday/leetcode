function search(nums: number[], target: number): number {

    // Phase 1: Find minIdx (Pivot Point)
    let left: number = 0;
    let right: number = nums.length - 1;
    let minIdx: number = 0;
    while (left <= right) {

        if (nums[left] <= nums[right]) {
            if (nums[minIdx] > nums[left]) {
                minIdx = left;
            }
            break;
        }

        const mid = left + Math.floor((right - left) / 2);

        minIdx = mid;

        if (nums[mid] > nums[right]) {
            left = mid + 1;
        }
        // nums[mid] <= nums[right]
        else {
            right = mid - 1;
        }

    }

    // Phase 2: Run Binary Search
    if(target >= nums[minIdx] && target <= nums[nums.length - 1]) {
        left = minIdx;
        right = nums.length - 1;
    } else {
        left = 0;
        right = minIdx;
    }
    while(left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        if(target < nums[mid]) {
            right = mid - 1;
        } else if(target > nums[mid]) {
            left = mid + 1;
        } else {
            return mid;
        }
    }
    return -1;

};