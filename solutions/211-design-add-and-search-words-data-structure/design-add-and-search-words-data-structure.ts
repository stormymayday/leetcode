class WordDictionary {
    words: string[];
    constructor() {
        this.words = [];
    }

    addWord(word: string): void {
        this.words.push(word);
    }

    search(word: string): boolean {
        let hasDots: boolean = false;
        for(let i = 0; i < word.length; i += 1) {
            if(word[i] === '.') {
                hasDots = true;
                break;
            }
        }
        if(hasDots === false) {
            return this.words.includes(word);
        } 
        // word has dots
        else {
            // meat and potates
            // iterate over each word in the dict
            for(const dictWord of this.words) {
                // if lengths are different, skip
                if(dictWord.length !== word.length) {
                    continue;
                } else {
                    // compare char by char
                    let match: boolean = true;
                    for(let i = 0; i < word.length; i += 1) {
                        if(word[i] !== '.' && word[i] !== dictWord[i]) {
                            // character missmatch
                            match = false;
                            break;
                        }
                    }
                    if(match === true) {
                        return true;
                    } 
                }
            }
            // no match found
            return false;
        }
    }
}

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */