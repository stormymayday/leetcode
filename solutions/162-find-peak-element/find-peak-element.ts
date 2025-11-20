function findPeakElement(nums: number[]): number {

    // Edge Cases: 1. There is only 1 element, 2. leftmost element is a peak
    if (nums.length === 1 || nums[0] > nums[1]) {
        return 0;
    }

    // 3. rightmost element is a peak
    if (nums[nums.length - 1] > nums[nums.length - 2]) {
        return nums.length - 1;
    }

    // Starting left and right moving inwards by 1
    let left = 1;
    let right = nums.length - 1;

    while(left <= right) {

        const mid = left + Math.floor((right - left)/2);

        // Exit Condition: mid is peak
        if(nums[mid - 1] < nums[mid] && nums[mid] > nums[mid + 1]) {
            return mid;
        }

        // Otherwise, always go to the 'higher' side
        if(nums[mid] > nums[mid - 1]) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }

    }

};