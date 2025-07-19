function combinationSum(candidates: number[], target: number): number[][] {
    const res: number[][] = [];
    const combo: number[] = [];
    function helper(index: number, sum: number): void {
        if(index === candidates.length) {
            return;
        }

        if(sum > target) {
            return;
        }

        if(sum === target) {
            res.push([...combo]);
            return;
        }
        

        combo.push(candidates[index]);

        helper(index, sum + candidates[index]);

        combo.pop();
        
        helper(index + 1, sum);
    }
    helper(0, 0);
    return res;
};