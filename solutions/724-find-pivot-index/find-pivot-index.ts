function pivotIndex(nums: number[]): number {
    
    // Adding extra zeron at the start
    // The rest are prefixSums
    const prefixSums = new Array(nums.length + 1).fill(0);
    let prefixSum = 0;
    for(let i = 0; i < nums.length; i += 1) {
        prefixSum += nums[i];
        prefixSums[i + 1] = prefixSum;
    }

    for(let i = 0; i < nums.length; i += 1) {

        // Note: prefixSums has an extra 0 at the start
        let leftSum = prefixSums[i];

        // Subtracting prefixSum at the next index from the total sum to get the 'rightSum'
        let rightSum = prefixSums[prefixSums.length - 1] - prefixSums[i + 1];

        if(leftSum === rightSum) {
            return i;
        }
    }
    return -1;

};