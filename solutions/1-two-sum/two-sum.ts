function twoSum(nums: number[], target: number): number[] {
    
    const hashMap = {};

    for(let i = 0; i < nums.length; i++) {
        const difference = target - nums[i];
        if(hashMap[difference] !== undefined) {
            return [i, hashMap[difference]];
        } else {
            hashMap[nums[i]] = i;
        }
    }

};