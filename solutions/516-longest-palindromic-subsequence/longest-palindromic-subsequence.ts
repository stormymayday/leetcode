function longestPalindromeSubseq(s: string, i: number = 0, j: number = s.length - 1, memo: Record<string, number> = {}): number {
    
    const key = `${i},${j}`;

    // Base Case: memo fetching
    if(key in memo) {
        return memo[key];
    }

    // Base Case: pointers are equal (single character)
    if(i === j) {
        return 1;
    }

    // Base Case: pointers have crossed (empty string)
    if(i > j) {
        return 0;
    }

    // Recrsive Step
    // characters match
    if(s[i] === s[j]) {
        // add two skipping both characters
        memo[key] = 2 + longestPalindromeSubseq(s, i + 1, j - 1, memo);
        
    }
    // characters don't match
    else {
        // Branch out
        const skipFirst = longestPalindromeSubseq(s, i + 1, j, memo);
        const skipLast = longestPalindromeSubseq(s, i, j - 1, memo);
        // Take maximum
        memo[key] = Math.max(skipFirst, skipLast);
    }

    return memo[key];

};