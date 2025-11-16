function isPerfectSquare(num: number): boolean {

    let left: number = 1;
    let right: number = num;

    while(left <= right) {

        const mid = left + Math.floor((right - left) / 2);
        const double = mid * mid;

        if(double === num) {
            return true;
        } else if(double < num) {
            left = mid + 1;
        } else if(double > num) {
            right = mid - 1;
        }

    }

    return false;
    
};