function isValid(s: string): boolean {
    const parens = {
        '(': ')',
        '{': '}',
        '[': ']'
    };
    const stack = [];
    for(let i = 0; i < s.length; i += 1) {

        if(s[i] in parens) {
            stack.push(s[i]);
        } else {
            const poppedParen = stack.pop();
            if(parens[poppedParen] !== s[i]) {
                return false;
            }
        }

    }
    return stack.length === 0;
};