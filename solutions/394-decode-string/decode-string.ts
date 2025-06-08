function decodeString(s: string): string {
    const stack = [];
    for(let i = 0; i < s.length; i += 1) {
        const currentChar = s[i];

        if(currentChar !== ']') {
            stack.push(currentChar);
        } else {
            let segment = '';
            while(stack[stack.length - 1] !== '[') {
                segment = stack.pop() + segment;
            }
            stack.pop();
            let digit = '';
            while(stack.length > 0 && !isNaN(stack[stack.length - 1])) {
                digit = stack.pop() + digit;
            }
            const count = parseInt(digit, 10);
            for(let k = 0; k < count; k += 1) {
                stack.push(segment);
            }
        }
    }
    return stack.join('');
};