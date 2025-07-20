function permuteUnique(nums: number[]): number[][] {
    const numCount = new Map<number, number>();
    for(let i = 0; i < nums.length; i += 1) {
        const num = nums[i];
        numCount.set(num, (numCount.get(num) || 0) + 1);
    }
    const res: number[][] = [];
    const perm: number[] = [];
    (function helper() {
        if(perm.length === nums.length) {
            res.push([...perm]);
            return;
        }
        for(const [num, count] of numCount.entries()) {
            if(count > 0) {
                perm.push(num);
                numCount.set(num, numCount.get(num) - 1);
                helper();

                perm.pop();
                numCount.set(num, numCount.get(num) + 1);
            }
        }
    }());
    return res;
};