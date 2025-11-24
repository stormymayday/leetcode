function splitArray(nums: number[], k: number): number {

    let left = Math.max(...nums);
    let right = nums.reduce((acc, num) => acc + num, 0);
    let candidate = left;

    while(left <= right) {

        const mid = left + Math.floor((right - left) / 2);

        if(isKSplitPossible(nums, k, mid) === true) {
            candidate = mid;
            // try smaller sum
            right = mid - 1;
        } else {
            left = mid + 1;
        }

    }

    return candidate;
    
};

function isKSplitPossible(nums: number[], k: number, maxSum: number): boolean {

    let numSubarrays = 1;
    let currSum = 0;

    for(let i = 0; i < nums.length; i += 1) {

        if(currSum + nums[i] <= maxSum) {
            currSum += nums[i];
        } else {
            numSubarrays += 1;
            currSum = nums[i];
        }

    }

    // Note: not numSubarrays === k
    return numSubarrays <= k;

}