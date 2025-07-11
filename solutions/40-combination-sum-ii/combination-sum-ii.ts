function combinationSum2(candidates: number[], target: number): number[][] {
    const n: number = candidates.length;
    const sorted: number[] = candidates.sort((a, b) => a - b);
    const res: number[][] = [];
    const combo: number[] = [];
    let curSum: number = 0;
    function helper(index: number):void {
        // Base Case 1: target reached
        if(curSum === target) {
            res.push([...combo]);
            return;
        }

        // Base Case 2: curSum too big or index out of bounds
        if(curSum > target || index === n) {
            return;
        }

        // Include
        combo.push(sorted[index]);
        curSum += sorted[index];
        helper(index + 1); // move forward (cannot reuse)

        // Backtrack
        combo.pop();
        curSum -= sorted[index];

        // Skip All and Exclude
        while(index + 1 < n && sorted[index] === sorted[index + 1]) {
            index += 1;
        }
        helper(index + 1);
    }
    helper(0);
    return res;
};