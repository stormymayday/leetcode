function lengthOfLongestSubstring(s: string): number {

    if(s.length < 2) {
        return s.length;
    }
    
    let max = -Infinity;

    for(let i = 0; i < s.length - 1; i += 1) {

        const set = new Set<string>();

        for(let j = i; j < s.length; j += 1) {

            if(set.has(s[j])) {
                break;
            }

            set.add(s[j]);

        }

        max = Math.max(max, set.size);
    }

    return max;

};