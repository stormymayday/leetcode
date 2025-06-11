function subarraySum(nums: number[], k: number): number {
    let count = 0;
    const prefixSums = [];
    let sum = 0;
    for(const num of nums) {
        sum += num;
        prefixSums.push(sum);
    }
    const differences = { 0: 1 };
    for(const sum of prefixSums) {
        const difference = sum - k;
        if(difference in differences) {
            count += differences[difference];
        }
        if(sum in differences) {
            differences[sum] += 1;
        } else {
            differences[sum] = 1;
        }
    }
    return count;
};