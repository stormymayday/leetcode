function characterReplacement(s: string, k: number): number {

    const charCount = new Map<string, number>();

    let longest = 0;
    let maxFrequency = 0;
    let left = 0;

    for(let right = 0; right < s.length; right += 1) {

        charCount.set(s[right], (charCount.get(s[right]) || 0) + 1);
        maxFrequency = Math.max(maxFrequency, charCount.get(s[right]));

        if((right - left + 1) - maxFrequency > k) {

            charCount.set(s[left], charCount.get(s[left]) - 1);

            // how do we update max frequency here

            if(charCount.get(s[left]) === 0) {
                charCount.delete(s[left]);
            }

            left += 1;

        }

        // this maxFrequency might be invalid
        if((right - left + 1) - maxFrequency <= k) {
            longest = Math.max(longest, right - left + 1);
        }

    }

    return longest;
    
};