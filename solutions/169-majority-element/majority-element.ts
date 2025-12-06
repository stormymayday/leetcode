function majorityElement(nums: number[]): number {

    const frequencyMap = new Map<number, number>();
    let maxCount = 0;
    let res = 0;
    for (let i = 0; i < nums.length; i += 1) {
        frequencyMap.set(nums[i], (frequencyMap.get(nums[i]) || 0) + 1);
        if (frequencyMap.get(nums[i]) > maxCount) {
            maxCount = frequencyMap.get(nums[i]);
            res = nums[i];
        }
    }
    return res;
};