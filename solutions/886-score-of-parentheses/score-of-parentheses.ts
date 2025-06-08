function scoreOfParentheses(s: string): number {
    const stack = [0];
    for(let i = 0; i < s.length; i += 1) {
        const current = s[i];
        if(current === "(") {
            stack.push(0);
        } else {
            const popped = stack.pop();
            if(popped === 0) {
                stack[stack.length - 1] += 1;
            } else {
                stack[stack.length - 1] += popped * 2;
            }
        }
    }
    return stack.pop();
};