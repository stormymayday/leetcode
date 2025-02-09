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

        if(freqMap[char] > 0) {
            freqMap[char]--;
            if(freqMap[char] === 0) {
                delete freqMap[char];
            }
        }
    }

    if(Object.keys(freqMap).length === 0) {
        return true;
    } else {
        return false;
    }
    
};