function lengthOfLongestSubstring(s: string): number {

    let charSet = new Set<string>();
    let longest = 0;
    let left = 0;
    for(let right = 0; right < s.length; right += 1) {

        while(left < s.length && charSet.has(s[right])) {
            charSet.delete(s[left]);
            left += 1;
        }

        charSet.add(s[right]);
        longest = Math.max(longest, charSet.size);

    }
    
    return longest;

};