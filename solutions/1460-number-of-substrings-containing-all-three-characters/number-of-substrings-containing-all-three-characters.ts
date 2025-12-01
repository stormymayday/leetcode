function numberOfSubstrings(s: string): number {

    let count = 0;

    const charCount = new Map<string, number>();
    let left = 0;
    for(let right = 0; right < s.length; right += 1) {

        charCount.set(s[right], (charCount.get(s[right]) || 0) + 1);

        while(charCount.has("a") && charCount.has("b") && charCount.has("c")) {

            count += s.length - right;

            charCount.set(s[left], charCount.get(s[left]) - 1);

            if(charCount.get(s[left]) === 0) {
                charCount.delete(s[left]);
            }

            left += 1;

        }

    }

    return count;
    
};