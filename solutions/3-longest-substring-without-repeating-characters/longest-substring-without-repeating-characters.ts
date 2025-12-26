function lengthOfLongestSubstring(s: string): number {
   
    let max = 0;

    for(let i = 0; i < s.length; i += 1) {

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