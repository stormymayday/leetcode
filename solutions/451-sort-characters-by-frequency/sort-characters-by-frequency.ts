function frequencySort(s: string): string {

    const freqMap = {};
    // Count frequencies
    for(const char of s) {
        if(!(char in freqMap)) {
            freqMap[char] = 0;
        }
        freqMap[char] += 1;
    }

    const buckets = new Map(); // maps occurence (number) to characters (as an array)
    // Organize chars into buckets by frequency
    for(const char in freqMap) {
        const count = freqMap[char];
        if(!buckets.has(count)) {
            buckets.set(count, []);
        }
        buckets.get(count).push(char);
    }

    const result = [];
    for(let i = s.length; i > 0; i--) {
        if(buckets.has(i)) {
            const bucket = buckets.get(i);
            for(const char of bucket) {
                for(let j = i; j > 0; j--) {
                    result.push(char);
                }
            }
        }
    }

    return result.join("");
};