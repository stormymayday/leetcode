function missingNumber(nums: number[]): number {
    const n = nums.length;
    let totalSum: number = n * (n + 1) / 2;
    let arrSum: number = 0;
    for (let i = 0; i < n; i += 1) {
        arrSum += nums[i];
    }
    return totalSum - arrSum;
};