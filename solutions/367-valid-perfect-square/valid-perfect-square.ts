function isPerfectSquare(num: number): boolean {
    
    for(let i = 1; i <= num; i++) {

        const square = i * i;

        if(square === num) {
            return true;
        }

        if(square > num) {
            return false;
        }

    }

    return false;

};