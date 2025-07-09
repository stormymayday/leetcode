function permute(nums: number[]): number[][] {
    if(nums.length === 0) {
        return [[]];
    }

    const current = nums[0];

    const partialPerms = permute(nums.slice(1));
    const fullPerms = [];
    for(const perm of partialPerms) {
        for(let i = 0; i <= perm.length; i += 1) {
            fullPerms.push([
                ...perm.slice(0, i),
                current,
                ...perm.slice(i)
            ]);
        }
    }
    return fullPerms;
};