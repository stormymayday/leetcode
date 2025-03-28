function minRemoveToMakeValid(s: string): string {
    // Convert the string to an array for easy manipulation
    const arr = s.split('');
    
    // Stack to keep track of indices of open parentheses
    const stack = [];

    // First pass through the array
    for(let i = 0; i < arr.length; i++) {
        const currentChar = arr[i];

        // If current character is an open parenthesis, 
        // push its index onto the stack
        if(currentChar === '(') {
            stack.push(i);
        } 
        // If current character is a closing parenthesis with no matching open parenthesis
        // (stack is empty), mark this closing parenthesis for removal
        else if(currentChar === ')' && stack.length === 0) {
            arr[i] = "";
        } 
        // If current character is a closing parenthesis and there's a matching open parenthesis
        // Remove the most recent open parenthesis from the stack
        else if(currentChar === ')' && stack.length !== 0) {
            stack.pop();
        }
    }

    // Second pass: remove any unmatched open parentheses
    // Any indices remaining in the stack are indices of open parentheses 
    // without corresponding closing parentheses
    while(stack.length !== 0) {
        // Remove these unmatched open parentheses by setting them to empty string
        const index = stack.pop();
        arr[index] = "";
    }

    // Join the array back into a string, effectively removing marked characters
    return arr.join("");
}