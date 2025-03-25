function lengthOfLongestSubstring(s: string): number {

    let result = 0;

        const set = new Set();

        let left = 0;
        let right = 0;
        while(right < s.length) {

            const currentChar = s[right];

            if(!set.has(currentChar)) {
                set.add(currentChar);
            } else {

                while(set.has(currentChar)) {
                    set.delete(s[left]);
                    left++;
                }

                set.add(currentChar);

            }

            result = Math.max(result, set.size);
            right++;

        }

        return result;
    
};