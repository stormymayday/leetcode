function removeDuplicates(nums: number[]): number {

    const uniques = new Set(nums);

    let idx = 0;
    for(const unique of uniques) {
        nums[idx] = unique;
        idx += 1;
    }

    return uniques.size;
    
};