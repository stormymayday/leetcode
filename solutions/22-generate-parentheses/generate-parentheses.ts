function generateParenthesis(n: number): string[] {
    const res: string[] = [];
    const curr: string[] = [];
    function helper(open: number, closed: number): void {
        if(open === n && closed === n) {
            res.push(curr.join(""));
            return;
        }
        if(open < n) {
            curr.push("(");
            helper(open + 1, closed);
            curr.pop();
        }
        if(open > closed) {
            curr.push(")");
            helper(open, closed + 1);
            curr.pop();
        }
    }
    helper(0,0);
    return res;
};