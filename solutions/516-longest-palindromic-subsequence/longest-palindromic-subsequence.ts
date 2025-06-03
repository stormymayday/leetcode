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
        memo[key] = Math.max(
            longestPalindromeSubseq(s, left + 1, right, memo),
            longestPalindromeSubseq(s, left, right - 1, memo)
        );
    }

    return memo[key];
};