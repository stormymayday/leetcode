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

    for(const char of t) {
        if(freqMap1[char] === undefined) {
            return false;
        } else {
            freqMap1[char]--;
            if(freqMap1[char] === 0) {
                delete freqMap1[char];
            }
        }
    }
    return true;

    // if(Object.keys(freqMap1).length === 0) {
    //     return true;
    // } else {
    //     return false;
    // }
    
};