function twoSum(nums: number[], target: number): number[] {
        const freqMap = {};

        for (const [index, value] of nums.entries()) {
            const difference = target - value;

            if (freqMap[value] !== undefined) {
                return [freqMap[value], index];
            } else {
                freqMap[difference] = index;
            }
        }
    }