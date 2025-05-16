function isAnagram(s: string, t: string): boolean {

    if(s.length !== t.length) {
        return false;
    }

    const freqMap1 = {};
    for(const char of s) {
        if(freqMap1[char] === undefined) {
            freqMap1[char] = 1;
        } else {
            freqMap1[char]++;
        }
    }

    const freqMap2 = {};
    for(const char of t) {
        if(freqMap2[char] === undefined) {
            freqMap2[char] = 1;
        } else {
            freqMap2[char]++;
        }
    }

    for(const key in freqMap1) {
        const value = freqMap1[key];
        if(freqMap2[key] !== value) {
            return false;
        }
    }
    return true;
    
};