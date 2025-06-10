function subarraySum(nums: number[], k: number): number {
    let count = 0;
    let currSum = 0;
    const prefixSums = { 0: 1};
    for(const num of nums) {
        currSum += num;
        const diff = currSum - k;
        if(diff in prefixSums) {
            count += prefixSums[diff];
        }
        if(currSum in prefixSums) {
            prefixSums[currSum] += 1;
        } else {
            prefixSums[currSum] = 1;
        }
    }
    return count;
};