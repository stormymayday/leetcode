function missingNumber(nums: number[]): number {
    
    const set = new Set<number>(nums);

    let missing: number;

    for(let i = 0; i <= nums.length; i += 1) {
        
        if(!set.has(i)) {
            missing = i;
            break;
        }

    }

    return missing;


};