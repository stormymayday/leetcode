function search(nums: number[], target: number): number {
    
    let left = 0;
    let right = nums.length - 1;
    while(left < right) {
        const mid = Math.floor((left+right)/2);
        if(nums[mid] > nums[right]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }

    const minIndex = left;

    if(minIndex === 0) {
        left = 0;
        right = nums.length - 1;
    } else if(target >= nums[0] && target <= nums[minIndex - 1]) {
        left = 0;
        right = minIndex - 1;
    } else if(target >= nums[minIndex] && target <= nums[nums.length - 1]) {
        left = minIndex;
        right = nums.length - 1;
    } else {
        return -1;
    }

    while(left <= right) {
        const mid = Math.floor((left+right)/2);
        if(nums[mid] > target) {
            right = mid - 1;
        } else if(nums[mid] < target) {
            left = mid + 1;
        } else {
            return mid;
        }
    }

    return -1;

};