class MapSum {
    map: Map<string, number>;
    constructor() {
        this.map = new Map();
    }

    insert(key: string, val: number): void {
        this.map.set(key, val);
    }

    sum(prefix: string): number {
        let sum: number = 0;
        for(const [key, value] of this.map.entries()) {
            if(this.isPrefixOf(prefix, key) === true) {
                sum += value;
            }
        }
        return sum;
    }

    isPrefixOf(prefix: string, word: string): boolean {
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
}

/**
 * Your MapSum object will be instantiated and called as such:
 * var obj = new MapSum()
 * obj.insert(key,val)
 * var param_2 = obj.sum(prefix)
 */