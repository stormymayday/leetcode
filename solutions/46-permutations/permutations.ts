function permute(nums: number[]): number[][] {
    const res: number[][] = [];
    const perm: number[] = [];
    const picked: boolean[] = new Array(nums.length).fill(false);
    function helper() {
        if(perm.length === nums.length) {
            res.push([...perm]);
            return;
        }
        for(let i = 0; i < nums.length; i += 1) {
            if(picked[i] == false) {
                picked[i] = true;
                perm.push(nums[i]);
                helper();
                picked[i] = false;
                perm.pop();
            }
        }
    }
    helper();
    return res;
};