function subarraySum(nums: number[], k: number): number {
    let count = 0;
    const prefixSums = { 0: 1};
    let prefixSum = 0;
    for(const num of nums) {
        prefixSum += num;
        const difference = prefixSum - k;
        if(difference in prefixSums) {
            count += prefixSums[difference];
        }
        if(prefixSum in prefixSums) {
            prefixSums[prefixSum] += 1;
        } else {
            prefixSums[prefixSum] = 1;
        }
    }
    return count;
};