function search(nums: number[], target: number): number {
    let left: number = 0;
    let right: number = nums.length -1;
    while(left <= right) {

        // Note: Might not matter for JavaScript (64-bit floating-point numbers)
        const mid: number = Math.floor(left + (right - left) / 2);

        if(target > nums[mid]) {
            left = mid + 1;
        } else if(target < nums[mid]) {
            right = mid - 1;
        } else {
            return mid; // need to return index
        }

    }
    return -1;
};