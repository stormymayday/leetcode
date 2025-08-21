function carPooling(trips: number[][], capacity: number): boolean {
    // sort by 'from'
    trips.sort((a, b) => a[1] - b[1]);

    for(let i = 0; i < trips.length; i += 1) {
        const [cap, from, to] = trips[i];
        let currCap = cap;
        for(let j = 0; j < i; j += 1) {
            const [prevCap, prevFrom, prevTo] = trips[j];
            if(prevTo > from) {
                currCap += prevCap;
            }
        }
        if(currCap > capacity) {
            return false;
        }
    }
    return true;
};