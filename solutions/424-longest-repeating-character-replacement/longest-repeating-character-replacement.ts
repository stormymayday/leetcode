function characterReplacement(s: string, k: number): number {

    const charCount = new Map<string, number>();

    let longest = 0;
    let maxFrequency = 0;
    let left = 0;

    for(let right = 0; right < s.length; right += 1) {
        
        // add current char into the hash map
        charCount.set(s[right], (charCount.get(s[right]) || 0) + 1);
        // update max frequency
        maxFrequency = Math.max(maxFrequency, charCount.get(s[right]));

        // shrink from 'left' if the window is not valid
        if((right - left + 1) - maxFrequency > k) {
            
            // remove char at 'left'
            charCount.set(s[left], charCount.get(s[left]) - 1);

            // update max frequency
            // Not needed because going below established max will never produce a better result
            // maxFrequency = Math.max(...charCount.values());

            // not necessary but can slightly improve space complexity?
            if(charCount.get(s[left]) === 0) {
                charCount.delete(s[left]);
            }

            left += 1; // shrink window from 'left'

        }

        // update max if window is valid
        if((right - left + 1) - maxFrequency <= k) {
            longest = Math.max(longest, right - left + 1);
        }

    }

    return longest;
    
};