function permute(nums: number[]): number[][] {
    if(nums.length === 0) {
        return [[]];
    }

    const first = nums[0];
    const partialPerms = permute(nums.slice(1));
    const fullPerms = [];
    for(const partialPerm of partialPerms) {
        for(let i = 0; i <= partialPerm.length; i += 1) {
            fullPerms.push([
                ...partialPerm.slice(0, i),
                first,
                ...partialPerm.slice(i)
            ]);
        }
    }

    return fullPerms;
};