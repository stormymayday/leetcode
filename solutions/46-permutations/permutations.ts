function permute(nums: number[]): number[][] {
    const n: number = nums.length;
    const picked: boolean[] = new Array(n).fill(true);
    const res: number[][] = [];
    const curr: number[] = [];
    function helper() {
        if(curr.length === n) {
            res.push([...curr]); // O(n) for copying curr
            return;
        }
        for(let i = 0; i < nums.length; i += 1) {
            // If current value was not pickeded
            if(picked[i] === true) {
                // choose current
                picked[i] = false;
                curr.push(nums[i]);

                // explore with current
                helper();

                // backtrack
                picked[i] = true;
                curr.pop();
            }
        }
    }
    helper();
    return res;
    // Time: O(n x n!) - n for copying curr and n! for generating permutations
    // Space: O(n + n!) - n for recursion stack and n! for storing permutations
    // where n is the length of nums
};