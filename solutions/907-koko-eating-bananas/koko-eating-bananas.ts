function minEatingSpeed(piles: number[], h: number): number {

    // let min: number = Math.min(...piles);
    let min: number = 1;
    let max: number = Math.max(...piles);
    let candidate: number = max;

    while (min <= max) {

        const mid = min + Math.floor((max - min) / 2);
        // candidate = mid;

        let time: number = 0;
        for (let i = 0; i < piles.length; i += 1) {
            time += Math.ceil(piles[i] / mid);
        }

        // If we went over the time limit
        if (time > h) {
            // increase
            min = mid + 1;
        } 
        // we were under or on time
        else {
            candidate = mid;
            max = mid - 1;
        }
    }

    return candidate;

};