function getCharIndex(char: string): number {
    if (char >= 'a' && char <= 'z') {
        return char.charCodeAt(0) - 'a'.charCodeAt(0);
    } else if (char >= 'A' && char <= 'Z') {
        return char.charCodeAt(0) - 'A'.charCodeAt(0) + 26;
    }
}

function isValidWindow(sArr: number[], tArr: number[]): boolean {
    for (let i = 0; i < 52; i++) {
        if (sArr[i] < tArr[i]) {
            return false;
        }
    }
    return true;
}

function minWindow(s: string, t: string): string {
    if (t.length > s.length) {
        return "";
    }

    const sCharCount = new Array(52).fill(0);
    const tCharCount = new Array(52).fill(0);

    // Populate tCharCount with frequencies of `t`
    for (let i = 0; i < t.length; i++) {
        tCharCount[getCharIndex(t[i])]++;
    }

    
   
    let minLength = Infinity;
    let minLeft = 0;
    let left = 0;

    // Expand right pointer
    for (let right = 0; right < s.length; right++) {
        const rIndex = getCharIndex(s[right]);
        sCharCount[rIndex]++;

        // Shrink window from left as long as it remains valid
        while (isValidWindow(sCharCount, tCharCount) && left <= right) {
            if (right - left + 1 < minLength) {
                minLength = right - left + 1;
                minLeft = left;
            }

            // Remove left character from window
            const lIndex = getCharIndex(s[left]);
            sCharCount[lIndex]--;
            left++;
        }
    }

    return minLength === Infinity ? "" : s.slice(minLeft, minLeft + minLength);
}