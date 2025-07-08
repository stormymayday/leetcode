function combine(n: number, k: number): number[][] {
    const result: number[][] = [];
    const combination: number[] = [];
    function helper(i: number):void {
        if(combination.length === k) {
            result.push([...combination]);
            return;
        }
        if(i > n) {
            return;
        }
        combination.push(i);
        helper(i + 1);
        combination.pop();
        helper(i + 1);
    }
    helper(1);
    return result;   
};