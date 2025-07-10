function permute(nums: number[]): number[][] {
    function helper(index) {
        if(index === nums.length) {
            return [[]];
        }
        const fullPerms = [];
        const partialPerms = helper(index + 1);
        for(const perm of partialPerms) {
            for(let i = 0; i <= perm.length; i += 1) {
                const copy = [...perm];
                copy.splice(i, 0, nums[index]);
                fullPerms.push(copy);
            }
        }
        return fullPerms;
    }
    return helper(0);
};