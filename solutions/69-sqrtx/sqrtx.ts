function mySqrt(x: number): number {

    let left: number = 0;
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