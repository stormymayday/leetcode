function missingNumber(nums: number[]): number {

    const n = nums.length;
    
    const set = new Set<number>();
    for(let i = 0; i <= n; i += 1) {
        set.add(i);
    }

    for(let i = 0; i < nums.length; i += 1) {
        
        set.delete(nums[i]);

    }

    return [...set][0];


};