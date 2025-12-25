function containsNearbyDuplicate(nums: number[], k: number): boolean {

    const numToIdx = new Map<number, number>();

    for (let i = 0; i < nums.length; i += 1) {

        if ((numToIdx.has(nums[i]) && (i - numToIdx.get(nums[i])) <= k)) {
            return true;
        }
        numToIdx.set(nums[i], i);

    }

    return false;

};