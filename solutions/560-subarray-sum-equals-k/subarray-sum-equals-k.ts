function subarraySum(nums: number[], k: number): number {
    let count = 0;
    const differences = { 0: 1 };
    let prefixSum = 0;
    for(const num of nums) {
        prefixSum += num;
        const difference = prefixSum - k;
        if(difference in differences) {
            count += differences[difference];
        }
        if(prefixSum in differences) {
            differences[prefixSum] += 1;
        } else {
            differences[prefixSum] = 1;
        }
    }
    return count;
};