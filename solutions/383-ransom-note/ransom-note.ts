function canConstruct(ransomNote: string, magazine: string): boolean {

    const freqMap = {};

    for(const element of magazine) {
        if(freqMap[element]) {
            freqMap[element]++;
        } else {
            freqMap[element] = 1;
        }
    }

    for(const element of ransomNote) {

        if(!freqMap[element]) {
            return false;
        }

        freqMap[element]--;

    }

    return true;

};