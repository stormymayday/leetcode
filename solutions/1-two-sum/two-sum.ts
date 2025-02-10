function twoSum(nums: number[], target: number): number[] {

    if(!nums.length) {
        return [];
    }

    const freqMap = {};

    for(const [index, value] of nums.entries()) {

        const diff = target - value;

        if(freqMap[value] !== undefined) {
            return [index, freqMap[value]];
        } else {
            freqMap[diff] = index;
        }
    }
    
};