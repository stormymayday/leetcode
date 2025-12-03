function removeDuplicates(nums: number[]): number {

    const uniques = new Set<number>(nums);

    let idx = 0;
    for(const num of uniques) {
        nums[idx] = num;
        idx += 1;
    }

    return uniques.size;
};