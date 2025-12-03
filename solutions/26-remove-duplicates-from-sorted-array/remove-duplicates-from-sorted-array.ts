function removeDuplicates(nums: number[]): number {
    
    const uniques = [...new Set(nums)];

    for (let i = 0; i < uniques.length; i += 1) {

        nums[i] = uniques[i];

    }

    return uniques.length;
};