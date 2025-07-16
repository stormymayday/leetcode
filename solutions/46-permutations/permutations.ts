function permute(nums: number[]): number[][] {
    const n = nums.length;
    const picked = new Array(n).fill(false);
    const res: number[][] = [];
    const curr: number[] = [];
    (function helper():void {
        if(curr.length === n) {
            res.push([...curr]); // O(n)
            return;
        }
        for(let i = 0; i < n; i += 1) {
            if(picked[i] === false) {
                picked[i] = true;
                curr.push(nums[i]);

                helper();

                curr.pop();
                picked[i] = false;
            }
        }
    }());
    return res;
};