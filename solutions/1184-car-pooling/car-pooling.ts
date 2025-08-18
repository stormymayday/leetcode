function carPooling(trips: number[][], capacity: number): boolean {

    // Sort by the starting position
    trips.sort((a, b) => a[1] - b[1]);

    for(let i = 0; i < trips.length; i += 1) {

        let [currCapacity, currStart, currEnd] = trips[i];

        // Brute Force: look back at every previous trip
        for(let j = 0; j < i; j += 1) {
            let [prevCapacity, prevStart, prevEnd] = trips[j];
            // If previous trip is not finished
            if(prevEnd > currStart) {
                // increment current capacity
                currCapacity += prevCapacity;
            }
        }

        if(currCapacity > capacity) {
            // capacity has been exceeded
            return false;
        }

    }

    // It is possible to complete all trips
    return true;
};