function subarraySum(nums: number[], k: number): number {
    let count = 0;
    for(let i = 0; i < nums.length; i += 1) {
        let sum = 0;
        for(let j = i; j < nums.length; j += 1) {
            sum += nums[j];
            if(sum === k) {
                count += 1;
            }
        }
    }
    return count;
};