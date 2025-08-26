function carPooling(trips: number[][], capacity: number): boolean {

    trips.sort((a, b) => a[1] - b[1]);
    
    for(let i = 0; i < trips.length; i += 1) {

        let currPassengers = trips[i][0];

        for(let j = 0; j < i; j += 1) {

            if(trips[j][2] > trips[i][1]) {
                currPassengers += trips[j][0];
            }

        }

        if(currPassengers > capacity) {
            return false;
        }

    }

    return true;

};