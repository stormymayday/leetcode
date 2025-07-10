function combinationSum(candidates: number[], target: number): number[][] {
    const res = [];
    const combo = [];
    let curSum  = 0;
    function helper(index) {
        if(curSum === target) {
            res.push([...combo]);
            return;
        }
        if(curSum > target) {
            return;
        }
        if(index === candidates.length) {
            return;
        }

        combo.push(candidates[index]);
        curSum += candidates[index];
        helper(index);

        combo.pop();
        curSum -= candidates[index];

        helper(index + 1);

    }
    helper(0);
    return res;
};