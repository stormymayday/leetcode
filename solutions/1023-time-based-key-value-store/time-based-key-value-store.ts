class TimeMap {

    store: { [key: string]: Array<[string, number]>};

    constructor() {
        this.store = {};
    }

    set(key: string, value: string, timestamp: number): void {

        if(this.store[key] === undefined) {
            this.store[key] = [];
        }

        this.store[key].push([value, timestamp]);
        
    }

    get(key: string, timestamp: number): string {

        let result = "";

        if(this.store[key] === undefined) {
            return result;
        } else {

            const values = this.store[key];

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