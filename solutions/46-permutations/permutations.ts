function permute(nums: number[]): number[][] {
    if(nums.length === 0) {
        return [[]];
    }
    const first = nums[0];
    const permutationsWithoutFirst = permute(nums.slice(1));
    const fullPermutations = [];
    for(const perm of permutationsWithoutFirst) {
        for(let i = 0; i <= perm.length; i += 1) {
            fullPermutations.push([...perm.slice(0, i), first, ...perm.slice(i)]);
        }
    }
    return fullPermutations;
};