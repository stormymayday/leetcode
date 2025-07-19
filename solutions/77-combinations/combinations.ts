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

        for(let i = num; i <= n; i += 1) {
            combo.push(i);
            helper(i + 1);
            combo.pop();
        }
    }
    helper(1);
    return res;
};