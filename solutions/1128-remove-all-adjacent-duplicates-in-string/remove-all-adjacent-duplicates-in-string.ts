function removeDuplicates(s: string): string {
    const stack: string[] = [];
    for(let i = 0; i < s.length; i += 1) {

        const char = s[i];

        if(stack.length === 0 || stack[stack.length - 1] !== char) {
            stack.push(char);
        } else {
            if(stack[stack.length - 1] === char) {
                stack.pop();
            }
        }

    }
    return stack.join("");
};