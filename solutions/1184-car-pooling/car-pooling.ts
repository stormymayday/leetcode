function carPooling(trips: number[][], capacity: number): boolean {
    
    // 1. sort by start
    trips.sort((a, b) => a[1] - b[1]);

    // 2. Naive Priority Queue
    const minPQ: [number, number, number][] = []; // [passengers, from , to]

    let currCap = 0;
    for(let i = 0; i < trips.length; i += 1) {

        const [currPass, currFrom, currTo] = trips[i];

        currCap += currPass;

        minPQ.push([currPass, currFrom, currTo]);
        minPQ.sort((a, b) => a[2] - b[2]); // sort by 'to'

        while(minPQ.length > 0 && currFrom >= minPQ[0][2]) {
            const [prevCap, prevFrom, prevTo] = minPQ.shift();
            currCap -= prevCap;
        }

        if(currCap > capacity) {
            return false;
        }

    }

    return true;

};