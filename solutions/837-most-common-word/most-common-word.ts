function mostCommonWord(paragraph: string, banned: string[]): string {
    const lowercaseWords = paragraph
        .toLowerCase()
        .replace(/[^a-z0-9]/g, " ")
        .split(/\s+/)
        .filter(word => word.length > 0);

    const hashMap = {};
    const hashSet = new Set(banned);

    for (const word of lowercaseWords) {
        if (hashMap[word] === undefined) {
            hashMap[word] = 1;
        } else {
            hashMap[word]++;
        }
    }

    let max = 0;
    let word = "";

    for (const key in hashMap) {
        if (hashMap[key] > max && !hashSet.has(key)) {
            max = hashMap[key];
            word = key;
        }
    }

    return word;
}