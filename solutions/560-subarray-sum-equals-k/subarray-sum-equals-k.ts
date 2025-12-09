function subarraySum(nums: number[], k: number): number {

    let count = 0;
    const prefixSumCount = new Map<number, number>(
        [
            [0, 1]
        ]
    );
    let prefixSum = 0;
    for (let i = 0; i < nums.length; i += 1) {

        prefixSum += nums[i];
        
        // if(prefixSum === k) {
        //     count += 1;
        // }

        if(prefixSumCount.has(prefixSum - k)) {
            count += prefixSumCount.get(prefixSum - k);
        }

        prefixSumCount.set(prefixSum, (prefixSumCount.get(prefixSum) || 0) + 1)
    }

    return count;

};