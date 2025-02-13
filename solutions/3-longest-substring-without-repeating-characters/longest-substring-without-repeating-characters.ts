function lengthOfLongestSubstring(s: string): number {

    let result = 0;

    if(!s.length) {
        return result;
    }

    const hashSet = new Set();

    let left = 0;

    for(let right = 0; right < s.length; right++) {

        while(hashSet.has(s[right])) {
            hashSet.delete(s[left]);
            left++;
        }

        hashSet.add(s[right]);
        result = Math.max(result, hashSet.size);

    }

    return result;
    
};