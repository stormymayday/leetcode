function missingNumber(nums: number[]): number {
    
    const numSet = new Set<number>(nums);

    let missingNum = -Infinity;

    for(let i = 0; i < nums.length; i += 1) {
        if(!numSet.has(i)) {
            missingNum = i;
            break;
        }
    }

    return missingNum === -Infinity ? nums.length : missingNum;

};