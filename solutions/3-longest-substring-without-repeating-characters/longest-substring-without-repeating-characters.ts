function lengthOfLongestSubstring(s: string): number {

    let longest = 0;

    const currSubstring = new Set<string>();
    let left = 0;
    for(let right = 0; right < s.length; right += 1) {

        const currChar = s[right];

        while(currSubstring.has(currChar)) {

            currSubstring.delete(s[left]);
            left += 1;

        }

        currSubstring.add(currChar);

        longest = Math.max(longest, currSubstring.size);

    }

    return longest;
};