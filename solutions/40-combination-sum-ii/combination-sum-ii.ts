function combinationSum2(candidates: number[], target: number): number[][] {
    const sorted: number[] = candidates.sort((a, b) => a - b);
    const res: number[][] = [];
    const combo: number[] = [];
    function helper(index: number, sum: number): void {
        if(sum === target) {
            res.push([...combo]);
            return;
        }
        if(sum > target) {
            return;
        }
        if(index === sorted.length) {
            return;
        }

        combo.push(sorted[index]);
        helper(index + 1, sum + sorted[index]);

        combo.pop();
        while(index + 1 < sorted.length && sorted[index] === sorted[index + 1]) {
            index += 1;
        }
        helper(index + 1, sum);
    }
    helper(0, 0);
    return res;
};