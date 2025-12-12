function majorityElement(nums: number[]): number[] {

    const n = nums.length;

    const res = new Set<number>();

    const freqMap = new Map<number, number>();

    for (let i = 0; i < n; i += 1) {

        freqMap.set(nums[i], (freqMap.get(nums[i]) || 0) + 1);

        if (freqMap.get(nums[i]) > n / 3) {
            res.add(nums[i]);
        }

    }

    return Array.from(res);
};