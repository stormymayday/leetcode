function combinationSum(candidates: number[], target: number): number[][] {
    const res = [];
    const combo = [];
    let curSum = 0;
    (function helper(index: number):void {
        // Base Case 1
        if(curSum === target) {
            res.push([...combo]);
            return;
        }
        // Base Case 2
        if(curSum > target) {
            return;
        }
        // Base Case 3
        if(index === candidates.length) {
            return;
        }

        // Include
        combo.push(candidates[index]);
        curSum += candidates[index];
        helper(index); // stay on current

        // Backtrack
        combo.pop();
        curSum -= candidates[index];

        // Exclude (move to the next)
        helper(index + 1);
    }(0))
    return res;
};