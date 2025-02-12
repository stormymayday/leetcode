function twoSum(nums: number[], target: number): number[] {

    if(!nums.length) {
        return [];
    }

    const freqMap = {};

    for(const [index, value] of nums.entries()) {

        const difference = target - value;

        if(freqMap[difference] !== undefined) {
            return [index, freqMap[difference]];
        } else {
            freqMap[value] = index;
        }

    }

    return [];
    
};