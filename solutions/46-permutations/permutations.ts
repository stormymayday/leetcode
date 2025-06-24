function permute(nums: number[]): number[][] {
    if(nums.length === 0) {
        return [[]];
    }

    const first = nums[0];
    const permsWithoutFirst = permute(nums.slice(1));
    const fullPerms = [];
    for(const perm of permsWithoutFirst) {
        // Inserting 'first' at every index
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