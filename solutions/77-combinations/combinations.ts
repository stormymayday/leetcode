function combine(n: number, k: number): number[][] {
    const res: number[][] = [];
    const combo: number[] = [];
    function helper(num: number): void {
        if(combo.length === k) {
            res.push([...combo]);
            return;
        }
        if(num > n) {
            return;
        }

        combo.push(num);
        helper(num + 1);
        combo.pop();
        helper(num + 1);
    }
    helper(1);
    return res;
};