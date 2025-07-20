function subsetsWithDup(nums: number[]): number[][] {
    const sorted: number[] = nums.sort((a, b) => a - b);
    const res: number[][] = [];
    const subset: number[] = [];
    function helper(index: number): void {
        if(index === sorted.length) {
            res.push([...subset]);
            return;
        }
        subset.push(sorted[index]);
        helper(index + 1);
        subset.pop();
        while(index + 1 < nums.length && sorted[index] === sorted[index + 1]) {
            index += 1;
        }
        helper(index + 1);
    } 
    helper(0);
    return res;
};