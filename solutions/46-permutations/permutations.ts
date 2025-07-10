function permute(nums: number[]): number[][] {
    const n = nums.length;
    const numCount = new Map();
    for(const num of nums) {
        numCount.set(num, 1);
    }
    const res = [];
    const perm = [];
    function helper() {
        if(perm.length === n) {
            res.push([...perm]);
            return;
        }
        for(const [num, count] of numCount.entries()) {
            if(count > 0) {
                perm.push(num);
                numCount.set(num, count - 1);
                helper();

                perm.pop();
                numCount.set(num, count);
            }
        }
    }
    helper();
    return res;
};