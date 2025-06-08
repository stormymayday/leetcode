function isValid(s: string): boolean {
    const parens = {
        "{": "}",
        "(": ")",
        "[": "]"
    };
    const stack = [];
    for(let i = 0; i < s.length; i += 1) {
        const currentParen = s[i];
        // Opening - push
        if(currentParen in parens) {
            stack.push(currentParen);
        } else {
            // Closing - pop & check
            const poppedParen = stack.pop();
            if(parens[poppedParen] !== currentParen) {
                return false;
            }
        }
    }
    return stack.length === 0;
};