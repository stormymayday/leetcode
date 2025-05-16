function twoSum(nums: number[], target: number): number[] {
    
    const hashMap = new Map();

    for(let i = 0; i < nums.length; i++) {
        
        const difference = target - nums[i];

        if(hashMap.has(difference)) {
            return [i, hashMap.get(difference)];
        } else {
            hashMap.set(nums[i], i);
        }
    }

};