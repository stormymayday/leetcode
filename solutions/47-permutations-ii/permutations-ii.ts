function permuteUnique(nums: number[]): number[][] {
    const n = nums.length;
    const numCount = new Map();
    for(const num of nums) {
        numCount.set(num, (numCount.get(num) || 0) + 1);
    }
    const res = [];
    const perm = [];
    function helper(index) {
        if(perm.length === n) {
            res.push([...perm]);
            return;
        }
        if(index === n) {
            return;
        }
        for(const [num, count] of numCount.entries()) {
            if(count > 0) {
                perm.push(num);
                numCount.set(num, count - 1);
                helper(index + 1);

                perm.pop();
                numCount.set(num, count);
            }
        }
    }
    helper(0);
    return res;
};