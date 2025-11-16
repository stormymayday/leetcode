function isPerfectSquare(num: number): boolean {

    let left: number = 1;
    let right: number = num;

    while(left <= right) {

        const mid = left + Math.floor((right - left) / 2);
        const midSquare = mid * mid;

        if(midSquare === num) {
            return true;
        } else if(midSquare < num) {
            left = mid + 1;
        } else if(midSquare > num) {
            right = mid - 1;
        }

    }

    return false;
    
};