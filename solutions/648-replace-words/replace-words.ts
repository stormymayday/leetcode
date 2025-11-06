function replaceWords(dictionary: string[], sentence: string): string {

    const arr = sentence.split(" ");

    for(let i = 0; i < arr.length; i += 1) {
        for(const prefix of dictionary) {
            if(isPrefixOf(prefix, arr[i]) === true) {
                arr[i] = prefix;
            }
        }
    }
        
    return arr.join(" ");
    
};

function isPrefixOf(prefix: string, word: string): boolean {
    if(prefix.length > word.length) {
        return false;
    } else {
        for(let i = 0; i < prefix.length; i += 1) {
            if(prefix[i] !== word[i]) {
                return false;
            }
        }
        return true;
    }
} 