function longestPalindromeSubseq(s: string, left:number = 0, right: number = s.length -1, memo: Record<string, number> = {}): number {
    const key = `${left},${right}`;

    // Base Case 1: memo fetching
    if(key in memo) {
        return memo[key];
    }
    
    // Base Case 2: single character
    if(left === right) {
        return 1;
    }

    // Base Case 3: pointers crossed / empty string
    if(left > right) {
        return 0;
    }

    // Recursive Step
    if(s[left] === s[right]) {
        // If characters match
        // Make 1 recursive call moving both pointers towards each other
        // Add 2 to the result
        memo[key] = 2 + longestPalindromeSubseq(s, left + 1, right - 1, memo);
    } else {
        // Otherwise
        // Make 2 recursive calls and take maximum
        memo[key] = Math.max(
            // skip 'left' character
            longestPalindromeSubseq(s, left + 1, right, memo),
            // skip 'right' character
            longestPalindromeSubseq(s, left, right - 1, memo)
        )
    }

    return memo[key];
};