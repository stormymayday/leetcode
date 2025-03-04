function fib(n: number): number {
    // Handle base cases
    if (n < 2) return n;

    // Create a DP table to store Fibonacci numbers
    const dp: number[] = new Array(n + 1);
    
    // Initialize base cases in the table
    dp[0] = 0;
    dp[1] = 1;
    
    // Build the Fibonacci sequence bottom-up
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    // Return the nth Fibonacci number
    return dp[n];
}