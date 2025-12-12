function majorityElement(nums: number[]): number[] {

    const n = nums.length;

    const majority = Math.floor(n / 3);

    const res = new Set<number>();

    const freqMap = new Map<number, number>();

    for (let i = 0; i < n; i += 1) {

        freqMap.set(nums[i], (freqMap.get(nums[i]) || 0) + 1);

        if (freqMap.get(nums[i]) > majority) {
            res.add(nums[i]);
            if(res.size === 2) {
                // There can be no more than 2 majority elements
                break;
            }
        }

    }

    return Array.from(res);
};