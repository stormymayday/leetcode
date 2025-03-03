function search(nums: number[], target: number): number {

    function binarySearch(nums, target, left, right) {

        // Base Case 1: If pointers cross, the target is was not found
        if(left > right) {
            return -1;
        }

        const middle = Math.floor(left + (right - left) / 2);

        // Base Case 2: target is found, return index
        if(nums[middle] === target) {
            return middle;
        } 

        // Recursive Calls:
        if(nums[middle] > target) {
            // If middle is greater than taret, searching left
            return binarySearch(nums, target, left, middle - 1);
        } else {
             // If middle is less than taret, searching rigjt
            return binarySearch(nums, target, middle + 1, right);
        }

    }

    return binarySearch(nums, target, 0, nums.length - 1);

};

// The time complexity is O(log n) which is optimal for searching in a sorted array
// Space complexity is O(log n) due to the recursive call stack.