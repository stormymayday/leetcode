function findPeakElement(nums: number[]): number {

    let left = 0;
    let right = nums.length - 1;

    while(left <= right) {

        const mid = left + Math.floor((right - left)/2);

        // 'mid' is greater than w/e is to it's 'left' AND 'right'
        if(
            ((mid - 1 >= 0 ? nums[mid - 1] : -Infinity) < nums[mid]) &&
            ((mid + 1 < nums.length ? nums[mid + 1] : -Infinity) < nums[mid])
        ) {
            return mid;
        } 
        // 'left' is greater than mid
        else if(
            (mid - 1 >= 0 ? nums[mid - 1] : -Infinity) > nums[mid]
        ) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }

    }
    
};