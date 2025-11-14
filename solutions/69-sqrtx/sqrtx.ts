function mySqrt(x: number): number {

    // Square root of 0 is 0
    // Square root of 1 is 1
    if(x < 2) {
        return x;
    }

    // let left: number = 0;
    let left: number = 1;
    let candidate: number = left;

    while(left <= x) {

        if((left * left) > x) {
            break;
        } else if((left * left) < x) {
            candidate = left;
            left += 1;
        } else {
            return left;
        }

    }

    return candidate;

};