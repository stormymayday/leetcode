function permuteUnique(nums: number[]): number[][] {
    const n = nums.length;
    const numCount = new Map();
    for(const num of nums) {
        if(!numCount.has(num)) {
            numCount.set(num, 0);
        }
        numCount.set(num, numCount.get(num) + 1);
    }
    const res: number[][] = [];
    const curr: number[] = [];
    function helper() {
        if(curr.length === n) {
            res.push([...curr]);
            return;
        }
        for(const [num, count] of numCount.entries()) {
            if(count > 0) {
                curr.push(num);
                numCount.set(num, numCount.get(num) - 1);

                helper();

                curr.pop();
                numCount.set(num, numCount.get(num) + 1);
            }
        }
    }
    helper();
    return res;
};