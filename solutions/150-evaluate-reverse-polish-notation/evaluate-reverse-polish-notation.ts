function evalRPN(tokens: string[]): number {
    const stack: number[] = [];

    for (const token of tokens) {
        if (token === '+') {
            // Addition
            const num1 = stack.pop();
            const num2 = stack.pop();
            stack.push(num2 + num1);
        } else if (token === '-') {
            // Subtraction: Pop the last two operands, subtract num1 from num2, and push the result.
            const num1 = stack.pop();
            const num2 = stack.pop();
            stack.push(num2 - num1);
        } else if (token === '*') {
            // Multiplication
            const num1 = stack.pop();
            const num2 = stack.pop();
            stack.push(num2 * num1);
        } else if (token === '/') {
            // Division: Pop the last two operands, divide num2 by num1, and push the integer result.
            const num1 = stack.pop()!;
            const num2 = stack.pop()!;
            // Math.trunc() is used to perform integer division. 
            // It removes the decimal part of the result, effectively rounding towards zero.
            stack.push(Math.trunc(num2 / num1));
        } else {
            // If the token is not an operator, it's an operand (a number).
            // parseInt() is used to convert the string token into an integer.
            stack.push(parseInt(token));
        }
    }

    // After processing all tokens, the final result is the only remaining element on the stack.
    return stack.pop();
}