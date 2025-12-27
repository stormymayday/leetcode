class ValidWordAbbr {

    // Maps each abbreviation to the set of original words that produce it
    // e.g., "d2r" -> Set{"deer", "door"}
    abbrs: Map<string, Set<string>>;

    constructor(dictionary: string[]) {
        
        this.abbrs = new Map<string, Set<string>>();

        // Build the abbreviation map from the dictionary
        for(let i = 0; i < dictionary.length; i += 1) {

            const key = this.getKey(dictionary[i]);

            // Initialize a new set if this abbreviation hasn't been seen
            if(!this.abbrs.has(key)) {
                this.abbrs.set(key, new Set<string>());
            }
            
            // Add the word to the set for this abbreviation
            // Set automatically handles duplicates in the dictionary
            this.abbrs.get(key).add(dictionary[i]);

        }

    }

    /**
     * Checks if a word's abbreviation is unique according to the rules:
     * - Returns true if no words in dictionary share this abbreviation
     * - Returns true if the word itself is the ONLY word with this abbreviation
     * - Returns false if other different words share this abbreviation
     */
    isUnique(word: string): boolean {
        
        const key = this.getKey(word);

        // Case 1: Abbreviation doesn't exist in dictionary -> unique
        // Case 2: Word is in dictionary AND is the only word with this abbreviation -> unique
        if(!this.abbrs.has(key) || (this.abbrs.get(key).has(word) && this.abbrs.get(key).size === 1)) {
            return true;
        } else {
            return false;
        }

    }

    /**
     * Generates the abbreviation for a word:
     * - Words with 2 or fewer characters: return as-is (e.g., "it" -> "it")
     * - Longer words: first letter + count of middle letters + last letter
     *   (e.g., "door" -> "d2r", "internationalization" -> "i18n")
     */
    getKey(str: string): string {

        const res: string[] = [];

        // Count of characters between first and last letter
        let count = str.length - 2;

        // First letter
        res.push(str[0]);

        // Middle count (only for words longer than 2 characters)
        if(str.length > 2) {
            res.push(`${count}`);
        }

        // Last letter
        res.push(str[str.length - 1]);

        return res.join("");

    }
}

/**
 * Your ValidWordAbbr object will be instantiated and called as such:
 * var obj = new ValidWordAbbr(dictionary)
 * var param_1 = obj.isUnique(word)
 */