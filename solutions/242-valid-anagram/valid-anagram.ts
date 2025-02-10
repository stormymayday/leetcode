function isAnagram(s: string, t: string): boolean {

    if(s.length !== t.length) {
        return false;
    }

    const freqMap = {};

    for(const char of s) {
        if(freqMap[char]) {
            freqMap[char]++;
        } else {
            freqMap[char] = 1;
        }
    }

    for(const char of t) {
        if(!freqMap[char]) {
            return false;
        }
        freqMap[char]--;
    }

    return true;
    
};