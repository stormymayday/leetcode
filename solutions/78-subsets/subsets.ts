function subsets(nums: number[]): number[][] {
    const res: number[][] = [];
    const curr: number[] = [];
    function helper(index: number): void {
        if(index === nums.length) {
            res.push([...curr]); // O(n) for copying curr
            return;
        }

        // Choose value at this index
        curr.push(nums[index]);
        // Explore with this value
        helper(index + 1);
        // Backtrack
        curr.pop();
        // Explore without this value
        helper(index + 1);
    }
    helper(0);
    return res;
    // Time: O(n x 2^n) - n for copying curr x 2 decisions (with and without) to the power of recursion depth of n
    // Space: O(n + 2^n) - n for recursion depth + 2^n number of subsets
    // Where n - is the length of nums
};