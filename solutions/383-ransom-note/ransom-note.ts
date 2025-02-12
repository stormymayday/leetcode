function canConstruct(ransomNote: string, magazine: string): boolean {

    if(ransomNote.length > magazine.length) {
        return false;
    }

    const freqMap = {};

    for(const char of magazine) {
        if(!freqMap[char]) {
            freqMap[char] = 1;
        } else {
            freqMap[char]++;
        }
    }

    for(const char of ransomNote) {
        if(!freqMap[char]){
            return false;
        }
        freqMap[char]--;
    }


    return true;
    
};