function buildFrequencyMap(str: string):Map<string, number> {
    const map = new Map();
    for(let i = 0; i < str.length; i++) {
        const char = str[i];
        map.set(char, (map.get(char) || 0) + 1);
    }
    return map;
}
function isAnagram(s: string, t: string): boolean {
    // Edge Case: different length
    if(s.length !== t.length) {
        return false;
    }

    const freqMap1 = buildFrequencyMap(s);

    for(const char of t) {
        if(!freqMap1.has(char)) {
            return false;
        } else {
            freqMap1.set(char, freqMap1.get(char) - 1);
            if(freqMap1.get(char) === 0) {
                freqMap1.delete(char);
            }
        }
    }
    return true;
};