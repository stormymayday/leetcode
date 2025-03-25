function lengthOfLongestSubstring(s: string): number {

    let result = 0;

        const set = new Set();

        let left = 0;
        for(let right = 0; right < s.length; right++) {

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

        }

        return result;
    
};