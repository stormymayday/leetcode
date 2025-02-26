function maxSubArray(nums: number[]): number {
    return findMaxSubArray(nums, 0, nums.length - 1);
}

function findMaxSubArray(nums: number[], left: number, right: number): number {
	// Base case: single element
    if (left === right) return nums[left];

    const mid = Math.floor((left + right) / 2);
    
    // Recursive cases
    const leftMax = findMaxSubArray(nums, left, mid);
    const rightMax = findMaxSubArray(nums, mid + 1, right);
    const crossMax = maxCrossingSum(nums, left, mid, right);

    return Math.max(leftMax, rightMax, crossMax);
}

function maxCrossingSum(nums: number[], left: number, mid: number, right: number): number {
    // Find max sum on left half (including mid)
    let leftSum = -Infinity, sum = 0;
    for (let i = mid; i >= left; i--) {
        sum += nums[i];
        leftSum = Math.max(leftSum, sum);
    }

    // Find max sum on right half (excluding mid)
    let rightSum = -Infinity;
    sum = 0;
    for (let i = mid + 1; i <= right; i++) {
        sum += nums[i];
        rightSum = Math.max(rightSum, sum);
    }
		
	// Maximum subarray crossing mid
    return leftSum + rightSum;
}
