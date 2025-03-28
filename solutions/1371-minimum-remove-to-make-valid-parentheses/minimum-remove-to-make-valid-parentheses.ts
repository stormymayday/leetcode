function minRemoveToMakeValid(s: string): string {

    // convert into an array
    const arr = s.split("");

    const stack = [];

    // first pass
    for(let i = 0; i < arr.length; i++) {

        const currentChar = arr[i];

        // if its a right paren && stack is empty
        if(currentChar === ')' && stack.length === 0) {
            // convert into an empty string
            arr[i] = "";
        } else if(currentChar === ')' && stack.length !== 0) {
            // if its a right paren (and stack is not empty)
            // pop the stack
            stack.pop();
        } else if(currentChar === '(') {
            // if it is a left paren
            // push index on top of the stack
            stack.push(i);
        }
    }
    
    // second pass (stray left paren indexes)
    while(stack.length > 0) {
        const index = stack.pop();
        arr[index] = "";
    }

    return arr.join("");
};