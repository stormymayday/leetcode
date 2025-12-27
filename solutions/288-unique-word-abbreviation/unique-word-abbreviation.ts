class ValidWordAbbr {

    abbrs: Map<string, Set<string>>;

    constructor(dictionary: string[]) {
        
        this.abbrs = new Map<string, Set<string>>();

        for(let i = 0; i < dictionary.length; i += 1) {

            const key = this.getKey(dictionary[i]);

            if(!this.abbrs.has(key)) {
                this.abbrs.set(key, new Set<string>());
            }
            this.abbrs.get(key).add(dictionary[i]);

        }

    }

    isUnique(word: string): boolean {
        
        const key = this.getKey(word);

        if(!this.abbrs.has(key) || (this.abbrs.get(key).has(word) && this.abbrs.get(key).size === 1)) {
            return true;
        } else {
            return false;
        }

    }

    getKey(str: string): string {

        const res: string[] = [];

        let count = str.length - 2 - 1 + 1;

        res.push(str[0]);

        if(str.length > 2) {
            res.push(`${count}`);
        }

        res.push(str[str.length - 1]);

        return res.join("");

    }
}

/**
 * Your ValidWordAbbr object will be instantiated and called as such:
 * var obj = new ValidWordAbbr(dictionary)
 * var param_1 = obj.isUnique(word)
 */