function prefixCount(words: string[], pref: string): number {

    let count: number = 0;

    for(const word of words) {
        if(isPrefixOf(pref, word) === true) {
            count += 1;
        }
    }

    return count;
    
};

function isPrefixOf(prefix: string, word: string): boolean {
    if(prefix.length > word.length) {
        return false;
    }

    for(let i = 0; i < prefix.length; i += 1) {
        if(prefix[i] !== word[i]) {
            return false;
        }
    }

    return true;
}