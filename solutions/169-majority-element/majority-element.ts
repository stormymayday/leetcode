function majorityElement(nums: number[]): number {

    const frequencyMap = new Map<number, number>();

    for(let i = 0; i < nums.length; i += 1) {
        frequencyMap.set(nums[i], (frequencyMap.get(nums[i]) || 0) + 1);
    }

    let maxCount = 0;
    let res = 0;
    for(const [key, value] of frequencyMap.entries()) {
        if(value > maxCount) {
            maxCount = value;
            res = key;
        }
    }
    return res;
};