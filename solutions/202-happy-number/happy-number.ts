function isHappy(n: number): boolean {
    
    const seen = new Set<number>();

    function helper(num: number): boolean {

        const sum: number = sumSquaresOfDigits(num);

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

function sumSquaresOfDigits(num: number): number {
    let sum = 0;
    while(num > 0) {
        const digit = num % 10;
        sum += digit * digit;
        num = Math.floor(num / 10);
    }
    return sum;
}