function longestCommonSubsequence(text1: string, text2: string, p1: number = 0, p2: number = 0, memo: Record<string, number> = {}): number {
    const key = `${p1},${p2}`;
    
    // Base Case: memo fetching
    if(key in memo) {
        return memo[key];
    }

    // Base Case: one of the strings is empty (pointer reached the end)
    if(p1 === text1.length || p2 === text2.length) {
        return 0;
    }

    // Recursive Step
    if(text1[p1] === text2[p2]) {
        // Characters match!
        // Make 1 recursive call advancing both pointers
        // Add 1 to the result (to count the match)
        memo[key] = 1 + longestCommonSubsequence(text1, text2, p1 + 1, p2 + 1, memo);
    } else {
        // Characters don't match!
        // Make 2 recursive calls, one for each string and take the max
        memo[key] = Math.max(
            // Left - advance p1 (remove first char of text1)
            longestCommonSubsequence(text1, text2, p1 + 1, p2, memo),
            // Right - advance p2 (remove first char of text2)
            longestCommonSubsequence(text1, text2, p1, p2 + 1, memo)
        )
    }
    
    return memo[key];

};