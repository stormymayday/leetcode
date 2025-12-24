function isHappy(n: number): boolean {
    
    const seen = new Set<number>();

    function helper(num: number): boolean {

        const sum: number = sumSquaresOfDigits(getDigits(num));

        if(sum === 1) {
            return true;
        } else {
            if(seen.has(sum)) {
                return false;
            } else {
                seen.add(sum);
                return helper(sum);
            }
        }

    }

    return helper(n);

};

function getDigits(n: number): number[] {
    return String(n).split("").map(Number);
}

function sumSquaresOfDigits(digits: number[]): number {
    let sum = 0;
    for(const digit of digits) {
        sum += digit * digit;
    }
    return sum;
}