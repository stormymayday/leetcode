function findDisappearedNumbers(nums: number[]): number[] {

    const uniques = new Set<number>(nums);

    const missing: number[] = [];
    for(let i = 1; i <= nums.length; i += 1) {
        if(!uniques.has(i)) {
            missing.push(i);
        }
    }
    return missing;    
};