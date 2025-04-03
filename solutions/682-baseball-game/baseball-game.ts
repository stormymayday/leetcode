function calPoints(operations: string[]): number {

    // Stack to keep track of scores
    const stack = [];

    for(let i = 0; i < operations.length; i++) {

        const operation = operations[i];

        if(operation === 'C') {

            // 'C' means invalidate the previous score - simply remove the last element
            stack.pop();

        } else if(operation === 'D') {

            // 'D' means the next score is double the previous score
            // FIXED: Previously, stack.pop() * 2 was used which incorrectly removed the last element
            // Correct approach: Access the last element without removing it, then double it
            stack.push(2 * stack[stack.length - 1]);

        } else if(operation === '+') {

            // '+' means the next score is the sum of the two previous scores
            // FIXED: Previously, stack.pop() + stack.pop() was used which:
            //   1. Removed both elements from the stack (they should remain)
            //   2. Added them
            
            // Temporarily remove the top element
            const top = stack.pop();
            // Calculate sum (top + the element now at the top)
            const newTop = top + stack[stack.length - 1];
            // Restore the original top element
            stack.push(top);
            // Push the new sum
            stack.push(newTop);

        } else {
            // If it's a number, convert string to integer and add to stack
            stack.push(parseInt(operation));
        }
    }

    // Calculate the sum of all scores in the stack
    return stack.reduce((sum, acc) => {
        return sum + acc;
    }, 0);
    
};