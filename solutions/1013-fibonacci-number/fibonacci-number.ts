function fib(n: number): number {
    if(n < 2) {
        return n;
    }

    let a = 0;
    let b = 1;

    for(let i = 2; i <= n; i++) {
        // Store the current value of b in a temporary variable
        const temp = b;
        // Update b with the sum of a and b
        b = a + b;
        // Set a to the previous value of b (stored in temp)
        a = temp;
    }

    return b;
};