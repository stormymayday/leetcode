function decodeString(s: string): string {
    const stack = [];
    for(let i = 0; i < s.length; i += 1) {

        const char = s[i];

        if(char !== ']') {
            stack.push(char);
        } else {
            let segment = '';
            // pop until opening paren
            while(stack[stack.length - 1] !== '[') {
                segment = stack.pop() + segment;
            }
            // pope opening paren
            stack.pop();
            let digit = '';
            // pop the digit (until char cannot be converted to a number)
            while(stack.length > 0 && !isNaN(stack[stack.length - 1])) {
                digit = stack.pop() + digit;
            }
            // convert to 'digit' str a number
            const count = parseInt(digit);
            // push 'segment' 'count' number of times
            for(let n = 0; n < count; n += 1) {
                stack.push(segment);
            }
        }

    }
    return stack.join('');
};