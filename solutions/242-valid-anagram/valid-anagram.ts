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
    const freqMap2 = buildFrequencyMap(t);

    for(const [key, value] of freqMap1) {
        if(freqMap2.get(key) !== value) {
            return false;
        }
    }
    return true;
};