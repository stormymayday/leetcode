function searchInsert(nums: number[], target: number): number {

    let left = 0;
    let right = nums.length - 1;

    while(left <= right) {
        const middle = Math.floor(left + (right - left) /2);

        if(nums[middle] === target) {
            return middle;
        } else if(nums[middle] > target) {
            right = middle - 1;
        } else {
            left = middle + 1;
        } 
    }

    // Return left as the insertion point because:
    // 1. If target is smaller than all elements, left will be 0 (insert at beginning)
    // 2. If target is larger than all elements, left will be nums.length (insert at end)
    // 3. If target falls between elements, left will point to the first element larger than target
    // In all cases, left pointer gives the correct insertion position to maintain sorted order
    return left;
    
};