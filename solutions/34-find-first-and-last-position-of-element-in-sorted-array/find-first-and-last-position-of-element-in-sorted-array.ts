function searchRange(nums: number[], target: number): number[] {

    // Phase 1: First Occurence / Exact Lower Bound
    const lb = exactLowerBound(nums, target);

    if(lb === -1) {
        // Exit if there is not first occurrence
        return [-1, -1];
    } else {
        // Phase 2: Last Occurence / Exact Upper Bound 
        return [lb, exactUpperBound(nums, target)];
    }
    
};

function exactLowerBound(nums: number[], target: number): number {
    let left = 0;
    let right = nums.length - 1;
    let candidate = -1;
    while(left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        // Looking for the smallest index where value is equal to 'target
        if(nums[mid] === target) {
            // potential candidate
            candidate = mid;
            // look for even smaller candidate
            right = mid - 1;
        } else if(nums[mid] > target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return candidate;
}

function exactUpperBound(nums: number[], target: number): number {
    let left = 0;
    let right = nums.length - 1;
    let candidate = -1;
    while(left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        // Looking for the smallest index where value is equal to 'target
        if(nums[mid] === target) {
            // potential candidate
            candidate = mid;
            // look for even larger candidate
            left = mid + 1;
        } else if(nums[mid] > target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return candidate;
}