function scoreOfParentheses(s: string): number {
    const stack = [0];
    for(let i = 0; i < s.length; i += 1) {
        const paren = s[i];
        if(paren === '(') {
            stack.push(0);
        } else {
            const poppedNum = stack.pop();
            if(poppedNum === 0) {
                stack[stack.length - 1] += 1;
            } else if(poppedNum > 0) {
                stack[stack.length - 1] += poppedNum * 2;
            }
        }
    }
    return stack.pop();
};