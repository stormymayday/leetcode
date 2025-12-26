function lengthOfLongestSubstring(s: string): number {
   
    let max = 0;
    const set = new Set<string>();
    let left = 0;
    for(let right = 0; right < s.length; right += 1) {

        while(set.has(s[right])) {
            set.delete(s[left]);
            left += 1;
        }

        set.add(s[right]);

        max = Math.max(max, set.size);

    }

    return max;

};