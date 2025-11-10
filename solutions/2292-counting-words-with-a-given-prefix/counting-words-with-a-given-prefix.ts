function prefixCount(words: string[], pref: string): number {

    let count: number = 0;

    for(const word of words) {
        if(word.startsWith(pref)) {
            count += 1;
        }
    }

    return count;
    
};