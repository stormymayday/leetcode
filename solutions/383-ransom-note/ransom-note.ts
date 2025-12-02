function canConstruct(ransomNote: string, magazine: string): boolean {

    const hashMap = new Map<string, number>();

    for (const char of magazine) {
        hashMap.set(char, (hashMap.get(char) || 0) + 1);
    }

    for(const char of ransomNote) {
        if(!hashMap.has(char)) {
            return false;
        }
        hashMap.set(char, hashMap.get(char) - 1);
        if(hashMap.get(char) === 0) {
            hashMap.delete(char);
        }
    }

    return true;

};