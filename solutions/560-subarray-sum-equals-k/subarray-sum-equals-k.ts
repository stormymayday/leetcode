function subarraySum(nums: number[], k: number): number {

    let count = 0;
    const prefixSumHash = new Map<number, number>(); // key: prefixSum, value: count
    let prefixSum = 0;
    for (let i = 0; i < nums.length; i += 1) {

        prefixSum += nums[i];

        if (prefixSum === k) {
            count += 1;
        }

        if (prefixSumHash.has(prefixSum - k)) {
            count += prefixSumHash.get(prefixSum - k);
        }

        prefixSumHash.set(prefixSum, (prefixSumHash.get(prefixSum) || 0) + 1);
    }
    return count;

};