function lengthOfLongestSubstring(s: string): number {
   
    let max = 0;
    const charIdx = new Map<string, number>();
    let left = 0;
    for(let right = 0; right < s.length; right += 1) {

        if(charIdx.has(s[right]) && charIdx.get(s[right]) >= left) {

            left = charIdx.get(s[right]) + 1;

        }

        charIdx.set(s[right], right);

        max = Math.max(max, right - left + 1);
        
    }

    return max;

};