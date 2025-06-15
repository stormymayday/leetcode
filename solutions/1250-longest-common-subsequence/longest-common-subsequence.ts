function longestCommonSubsequence(text1: string, text2: string, p1: number = 0, p2: number = 0, memo: Record<string, number> = {}): number {
    
    const key = `${p1}.${p2}`;

    if(key in memo) {
        return memo[key];
    }

    if(p1 === text1.length || p2 === text2.length) {
        return 0;
    }

    if(text1[p1] === text2[p2]) {
        memo[key] = 1 + longestCommonSubsequence(text1, text2, p1 + 1, p2 + 1, memo);
    } else {
        const moveP1 = longestCommonSubsequence(text1, text2, p1 + 1, p2, memo);
        const moveP2 = longestCommonSubsequence(text1, text2, p1, p2 + 1, memo);
        memo[key] = Math.max(moveP1, moveP2);
    }

    return memo[key];
};