function isValid(s: string): boolean {
    // Handle edge case of empty string - considered valid
    if (s.length === 0) {
        return true;
    }

    // Handle edge case of single character - always invalid for brackets
    if (s.length === 1) {
        return false;
    }

    // Mapping of opening brackets to their corresponding closing brackets
    const parens = {
        "(": ")",
        "{": "}",
        "[": "]",
    };

    // Stack to keep track of opening brackets
    const stack: string[] = [];

    // Iterate through each character in the string
    for (let i = 0; i < s.length; i++) {
        const currentParen = s[i];

        // If current character is an opening bracket
        if (parens[currentParen] !== undefined) {
            // Push opening bracket onto the stack
            stack.push(currentParen);
        } else {
            // If we encounter a closing bracket with an empty stack,
            // it means we have a closing bracket without a matching opening bracket
            if (stack.length === 0) {
                return false;
            }

            // Remove the last opening bracket from the stack
            const poppedParen = stack.pop()!;

            // Check if the current closing bracket matches 
            // the expected closing bracket for the last opening bracket
            if (parens[poppedParen] !== currentParen) {
                return false;
            }
        }
    }

    // Ensure all opening brackets have been matched
    // (stack should be empty at the end)
    return stack.length === 0;
}