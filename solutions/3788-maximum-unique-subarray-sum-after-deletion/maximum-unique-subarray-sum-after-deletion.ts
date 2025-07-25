function maxSum(nums: number[]): number {
    const nonNeg: number[] = nums.filter((num) => num > 0);
    const set = new Set(nonNeg);
    if(set.size === 0) {
        return Math.max(...nums);
    } else {
        return Array.from(set).reduce((acc, curr) => acc + curr, 0);
    }
};