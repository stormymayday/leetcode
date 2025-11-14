function mySqrt(x: number): number {

    let left: number = 0;
    let right: number = x;
    let candidate: number = 0;

    while(left <= right) {

        const middle = left + Math.floor((right - left) / 2);

        // Note: compare against the x
        if((middle * middle) > x) {
            right = middle - 1;
        } else if((middle * middle) < x) {
            candidate = middle;
            left = middle + 1;
            // candidate = middle;
        } else {
            return middle;
        }

    }

    return candidate;
    
};