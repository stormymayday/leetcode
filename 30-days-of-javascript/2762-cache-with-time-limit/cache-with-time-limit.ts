class TimeLimitedCache {

    cache;
    
    constructor() {
        this.cache = {};
    }
    
    set(key: number, value: number, duration: number): boolean {

        const entry = this.cache[key];

        if(entry) {
            clearTimeout(this.cache[key].timeoutId);
        }

        const timeoutId = setTimeout(() => {
            delete this.cache[key];
        }, duration);

        this.cache[key] = { value, timeoutId };

        return Boolean(entry);
        
    }
    
    get(key: number): number {
        if(this.cache[key]) {
            return this.cache[key].value;
        } else {
            return -1;
        }
    }
    
    count(): number {
        return Object.keys(this.cache).length;
    }
}

/**
 * const timeLimitedCache = new TimeLimitedCache()
 * timeLimitedCache.set(1, 42, 1000); // false
 * timeLimitedCache.get(1) // 42
 * timeLimitedCache.count() // 1
 */