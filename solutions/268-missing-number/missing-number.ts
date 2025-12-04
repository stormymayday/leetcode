function missingNumber(nums: number[]): number {
    let sum: number = 0;
    let arrSum: number = 0;
    for(let i = 0; i <= nums.length; i += 1) {
        sum += i;
        if(i < nums.length) {
            arrSum += nums[i];
        }
    }
    return sum - arrSum;
};