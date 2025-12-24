function isHappy(n: number): boolean {

    const seen = new Set<number>();

    while (!seen.has(n)) {
        seen.add(n);
        n = sumSquaresOfDigits(n);
        if (n === 1) {
            return true;
        }
    }

    return false;

};

function sumSquaresOfDigits(num: number): number {
    let sum = 0;
    while (num > 0) {
        const digit = num % 10; // Get the rightmost digit
        sum += digit * digit;
        num = Math.floor(num / 10); // Remove the rightmost digit
    }
    return sum;
}