function canConstruct(ransomNote: string, magazine: string): boolean {

    if(magazine.length < ransomNote.length) {
        return false;
    }

    const freqMap = {};

    for(const char of magazine) {
        if(freqMap[char]) {
            freqMap[char]++;
        } else {
            freqMap[char] = 1;
        }
    }

    for(const char of ransomNote) {

        if(!freqMap[char]) {
            return false;
        }
        freqMap[char]--;
    }

    return true;

};