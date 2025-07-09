function combinationSum(candidates: number[], target: number): number[][] {
    const result: number[][] = [];
    const curCombo: number[] = [];
    let curSum = 0;
    function helper(index:number):void {
        // Base Case 1: index out of bounds
        if(index === candidates.length) {
            return;
        }

        // Base Case 2: curSum is greater than target
        if(curSum > target) {
            return;
        }
        
        // Base Case 3: found the combination!
        if(curSum === target) {
            // copy curCombo
            result.push([...curCombo]);
            return;
        }

        // 1. Including current candidate
        curCombo.push(candidates[index]);
        curSum += candidates[index];
        helper(index); // index stays the same! (we can re-use candidates)

        // 2. Backtracking
        curCombo.pop();
        curSum -= candidates[index];

        // 3. Excluding current candidate
        helper(index + 1); // index moves forward
    }
    helper(0);
    return result;
};