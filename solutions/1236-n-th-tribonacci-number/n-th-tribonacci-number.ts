function tribonacci(n: number, memo: Record<number, number> = {}): number {

    if(n in memo) {
        return memo[n];
    }

    if(n === 1 || n === 2) {
        return 1;
    }

    if(n === 0) {
        return 0;
    }

    let sum = 0;
    for(let i = 1; i <= 3; i += 1) {
        sum += tribonacci(n - i, memo);
    }
    memo[n] = sum;
    return sum;
};