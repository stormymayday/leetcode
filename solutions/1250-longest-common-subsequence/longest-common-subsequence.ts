function longestCommonSubsequence(str1: string, str2: string, p1: number = 0, p2: number = 0, memo: Record<string, number> = {}): number {
    const key = `${p1},${p2}`;

    if(key in memo) {
        return memo[key];
    }

    if(p1 === str1.length || p2 === str2.length) {
        return 0;
    }

    if(str1[p1] === str2[p2]) {
        memo[key] = 1 + longestCommonSubsequence(str1, str2, p1 + 1, p2 + 1, memo);
    } else {
        memo[key] = Math.max(
            longestCommonSubsequence(str1, str2, p1 + 1, p2, memo),
            longestCommonSubsequence(str1, str2, p1, p2 + 1, memo),
        );
    }

    return memo[key];
    
};