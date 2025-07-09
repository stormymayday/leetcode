function permute(nums: number[]): number[][] {
    function helper(index: number):number[][] {
        // Base Case
        if(index === nums.length) {
            return [[]];
        }

        const fullPerms = [];
        const partialPerms = helper(index + 1);
        for(const perm of partialPerms) {
            // iterating over every index of 'perm'
            for(let i = 0; i <= perm.length; i += 1) {
                // 1. Create copy of perm array
                const copy = [...perm]; // using speard operator
                // const copy = perm.slice(); // using Array.slice()
                // const copy = Array.from(perm); // usiing Array.from()
        
                // 2. insert value at 'index' into every position of 'perm'
                // - starting at 'i'
                // - delete '0' items
                // - insert 'items' value at 'index'
                copy.splice(i, 0, nums[index]);

                // 3. push result into 'fullPerms'
                fullPerms.push(copy);
            }
        }
        return fullPerms;
    }
    return helper(0);
};