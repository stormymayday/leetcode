function lengthOfLongestSubstring(s: string): number {

    const charToIdx = new Map<string, number>();
    let maxLength = 0;
    let left = 0;
    for(let right = 0; right < s.length; right += 1) {

        const char = s[right];
        
        // char is in the map already
        if(charToIdx.has(char)) {
            
            // check if left is smaller than char idx
            // issue?
            if(left <= charToIdx.get(char)) {
                // we need shrink window by moving the 'left' pointer
                // left = right;
                left = charToIdx.get(char) + 1;
            }

            // Update the index of this character
            charToIdx.set(char, right);


        } 
        // add char to the map
        else {
            charToIdx.set(char, right);
        }

        maxLength = Math.max(maxLength, right - left + 1);

    }
    
    return maxLength;
};