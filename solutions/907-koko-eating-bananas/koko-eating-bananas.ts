function minEatingSpeed(piles: number[], h: number): number {

    let left: number = 1;
    let right: number = Math.max(...piles);
    let candidate: number = 1;

    while(left <= right) {

        const mid = left + Math.floor((right - left)/2);

        let time: number = 0;

        for(let i = 0; i < piles.length; i += 1) {

            time += Math.ceil(piles[i] / mid);

        }

        // Time limit exceeded
        if(time > h) {
            // increase the rate
            left = mid + 1;
        } 
        // Under or on time
        else {
            // update the candidate
            candidate = mid;
            // try slower rate
            right = mid - 1;
        }

    }

    return candidate;
    
};