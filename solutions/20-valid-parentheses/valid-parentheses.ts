function isValid(s: string): boolean {
    // If the string is empty
    if (s.length === 0) {
        // it's valid
        return true;
    }

    // If the length is odd
    if (s.length % 2 !== 0) {
        // Cannot valid
        return false;
    }

    // Mapping closing to opening
    const parens = {
        ")": "(",
        "}": "{",
        "]": "[",
    };

    // Stack to track closing parentheses
    const stack = [];

    for (let i = 0; i < s.length; i++) {

        const currentParen = s[i];

        // If it's a closing parenthesis
        if (parens[currentParen] !== undefined) {

            // If the stack is empty
            if (stack.length === 0) {
                // It's invalid
                return false;
            }

            // Remove the last opening paren from the stack
            const poppedParen = stack.pop();

            // Check if the current paren matches the last opening one
            if (parens[currentParen] !== poppedParen) {
                return false;
            }
            
        } else {
            // push to stack
            stack.push(currentParen);
        }
    }

    // stack should be empty at the end (no leftover opening parens)
    return stack.length === 0;
}