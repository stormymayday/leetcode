function pivotIndex(nums: number[]): number {
    
    // Padding "left" with zero
    const prefixSums = new Array(nums.length + 1).fill(0);
    let prefixSum = 0;
    for(let i = 0; i < nums.length; i += 1) {
        prefixSum += nums[i];
        prefixSums[i + 1] = prefixSum;
    }

    for(let i = 0; i < nums.length; i += 1) {
        // Note: prefixSums is 1 element longer
        // Therefore, i is one step back
        let leftSum = prefixSums[i];

        let rightSum = prefixSums[prefixSums.length - 1] - prefixSums[i + 1];

        if(leftSum === rightSum) {
            return i;
        }
    }
    return -1;

};