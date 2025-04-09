function binarySearch(nums: number[], leftIndex: number, rightIndex: number, target: number): number {
    let left = leftIndex;
    let right = rightIndex;
    while(left <= right) {
        const mid = Math.floor((left+right)/2);
        if(target > nums[mid]) {
            left = mid + 1;
        } else if(target < nums[mid]) {
            right = mid - 1;
        } else {
            return mid;
        }
    }
    return -1;
}

function searchRange(nums: number[], target: number): number[] {

    // Edge Case: empty array
    if(nums.length === 0) {
        return [-1, -1];
    }

    const firstPosition = binarySearch(nums, 0, nums.length - 1, target);

    if(firstPosition === -1) {
        return [-1, -1];
    } else {

        let startPosition = firstPosition;
        let tempLeft = startPosition;
        while(startPosition !== -1) {
            tempLeft = startPosition;
            startPosition = binarySearch(nums, 0, startPosition - 1, target);
        }

        let endPosition = firstPosition;
        let tempRight = endPosition;
        while(endPosition !== -1) {
            tempRight = endPosition;
            endPosition = binarySearch(nums, endPosition + 1, nums.length - 1, target);
        }

        return [tempLeft, tempRight];

    }
    
};