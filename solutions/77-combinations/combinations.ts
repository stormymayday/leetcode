function combine(n: number, k: number): number[][] {
    const res: number[][] = [];
    const curr: number[] = [];
    function helper(num: number): void {
        if(curr.length === k) {
            res.push([...curr]);
            return;
        }
        if(num > n) {
            return;
        }

        // O(2^n)
        // curr.push(num);
        // helper(num + 1);
        // curr.pop();
        // helper(num + 1);

        // O(n choose k)
        for(let i = num; i <= n; i += 1) {
            curr.push(i);
            helper(i + 1);
            curr.pop();
        }
    }
    helper(1);
    return res;
};