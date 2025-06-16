function longestPalindromeSubseq(s: string, left: number = 0, right: number = s.length - 1, memo: Record<string, number> = {}): number {
    
    const key = `${left},${right}`;

    if(key in memo) {
        return memo[key];
    }

    if(left === right) {
        return 1;
    }

    if(left > right) {
        return 0;
    }

    if(s[left] === s[right]) {
        memo[key] = 2 + longestPalindromeSubseq(s, left + 1, right - 1, memo);
    } else {
        const skipFirst = longestPalindromeSubseq(s, left + 1, right, memo);
        const skipLast = longestPalindromeSubseq(s, left, right - 1, memo);
        memo[key] = Math.max(skipFirst, skipLast);
    }

    return memo[key];
};