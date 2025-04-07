class TimeMap {

    store: Map<string, Array<[string, number]>>;

    constructor() {
        this.store = new Map();
    }

    set(key: string, value: string, timestamp: number): void {

        if(!this.store.has(key)) {

            this.store.set(key, []);

        }

        this.store.get(key).push([value, timestamp]);
        
    }

    get(key: string, timestamp: number): string {

        let result = "";

        if(!this.store.has(key)) {
            return result;
        } else {

            const values = this.store.get(key);

            let left = 0;
            let right = values.length - 1;

            while(left <= right) {

                const mid = Math.floor((left+right)/2);

                const [value, time] = values[mid];

                // Valid time
                if(time <= timestamp) {
                    result = value;
                    left = mid + 1;
                } else {
                    // Invalid time
                    right = mid - 1;
                }

            }

            return result;

        }
        
    }
}

/**
 * Your TimeMap object will be instantiated and called as such:
 * var obj = new TimeMap()
 * obj.set(key,value,timestamp)
 * var param_2 = obj.get(key,timestamp)
 */