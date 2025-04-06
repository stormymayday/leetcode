function minEatingSpeed(piles: number[], h: number): number {

    // Left (min) must be 1
    let left = 1;
    // Right (max) is the largest element
    let right = Math.max(...piles);
    // Initialize speed to the max for now
    let bananasPerHour = right;

    while(left <= right) {

        const middleEatingSpeed = Math.floor((left + right)/2);
        let currentTotalTime = 0;

        for(let i = 0; i < piles.length; i++) {

            currentTotalTime = currentTotalTime + Math.ceil(piles[i]/middleEatingSpeed);

        }

        if(currentTotalTime <= h) {
            // Current total time is less than max allowed time
            // Therefore, it's a possible answer
            bananasPerHour = middleEatingSpeed;
            // Slow down
            right = middleEatingSpeed - 1;
        } else {
            // Current total time is greater than max allowed time
            // Speed up
            left = middleEatingSpeed + 1;
        }

    }

    return bananasPerHour;
    
};