function majorityElement(nums: number[]): number {

    const n = nums.length;
    const frequencyMap = new Map<number, number>();
    let maxCount = 0;
    let res = 0;
    for (let i = 0; i < n; i += 1) {

        frequencyMap.set(nums[i], (frequencyMap.get(nums[i]) || 0) + 1);

        const count = frequencyMap.get(nums[i]);

        if(count > Math.floor(n / 2)) {
            res = nums[i];
            break;
        }


        if (count > maxCount) {
            maxCount = count;
            res = nums[i];
        }
    }
    return res;
};