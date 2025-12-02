function characterReplacement(s: string, k: number): number {

    const charCount = new Map<string, number>();

    let longest = 0;

    let left = 0;

    for(let right = 0; right < s.length; right += 1) {

        charCount.set(s[right], (charCount.get(s[right]) || 0) + 1);

        if((right - left + 1) - Math.max(...charCount.values()) > k) {

            charCount.set(s[left], charCount.get(s[left]) - 1);

            if(charCount.get(s[left]) === 0) {
                charCount.delete(s[left]);
            }

            left += 1;

        }

        // issue is here
        // this is too 
        if((right - left + 1) - Math.max(...charCount.values()) <= k) {
            longest = Math.max(longest, right - left + 1);
        }

    }

    return longest;
    
};