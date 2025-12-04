function singleNumber(nums: number[]): number {
    
    const hashMap = new Map<number, number>();
    
    for(let i = 0; i < nums.length; i += 1) {
        hashMap.set(nums[i], (hashMap.get(nums[i]) || 0) + 1);
    }

    for(const [key, value] of hashMap.entries()) {
        if(value === 1) {
            return key;
        }
    }

};