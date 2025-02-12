function isAnagram(s: string, t: string): boolean {

    if(s.length !== t.length) {
        return false;
    }

    const freqMap = {};

    for(const char of s) {
        freqMap[char] = (freqMap[char] || 0) + 1;
    }

    for(const char of t) {
        if(!freqMap[char]) {
            return false;
        }
        freqMap[char]--;
    }

    return true;
    
};