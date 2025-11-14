function mySqrt(x: number): number {

    let left: number = 0;
    let right: number = x;
    let candidate: number = 0;

    while(left <= right) {

        const mid = left + Math.floor((right - left) / 2);

        if((mid * mid) > x) {
            // we went to far
            // everything to the right of 'mid' will be guaranteed to be too high
            // therefore, discard right
            right = mid - 1;
        } else if((mid * mid) < x) {
            // Square is below 'x', which means it's a potential candidate
            candidate = mid;
            // everything to the left of 'mid' will be guaranteed to be too low
            // therefore, discard left
            left = mid + 1;
        } else {
            // mid square is an exact match, return immediately
            return mid;
        }

    }

    return candidate;
    
};