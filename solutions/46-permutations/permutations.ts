function permute(nums: number[]): number[][] {
    // Base case: Input array is empty
    if(nums.length === 0) {
        // an array containing one empty permutation.
        return [[]];
    }

    // Recursive  Step
    // Take the first element from the array
    const first = nums[0];

    // Get all permutations of the remaining elements
    const permsWithoutFirst = permute(nums.slice(1));

    const fullPerms = [];
    // Iterate over the permutations without first
    for(const perm of permsWithoutFirst) {
        // Iterate over every INDEX of the permutation
        for(let i = 0; i <= perm.length; i += 1) {
            fullPerms.push([
                ...perm.slice(0, i), // everything before current index
                first, // insert first AT the current index
                ...perm.slice(i) // everything after current index
            ]);
        }
    }
    return fullPerms;
};