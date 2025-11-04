class WordDictionary {
    words: string[];
    constructor() {
        this.words = [];
    }

    addWord(word: string): void {
        this.words.push(word);
    }

    search(word: string): boolean {
        for(let i = 0; i < this.words.length; i += 1) {
            // if first characters match OR first character is a wildcard
            // AND lengths match
            if((this.words[i][0] === word[0] || word[0] === '.') && this.words[i].length === word.length) {
                // check character by character
                let matchCounter: number = 1;
                for(let j = 1; j < this.words[i].length; j += 1) {
                    // if character is not a wildercard and it doesn't match
                    if(word[j] !== '.' && this.words[i][j] !== word[j]) {
                        break;
                    } else {
                        matchCounter += 1;
                    }
                }
                if(matchCounter === word.length) {
                    return true;
                }
            }
        }
        return false;
    }
}

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */