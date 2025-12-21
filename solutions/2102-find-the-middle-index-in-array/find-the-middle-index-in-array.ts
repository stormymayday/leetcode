function findMiddleIndex(nums: number[]): number {
    
    const totalSum = nums.reduce((acc, curr) => acc + curr, 0);

    let prefixSum = 0;

    for (let i = 0; i < nums.length; i += 1) {

        if (totalSum - (2 * prefixSum) === nums[i]) {
            return i;
        }

        prefixSum += nums[i];

    }

    return -1;
};