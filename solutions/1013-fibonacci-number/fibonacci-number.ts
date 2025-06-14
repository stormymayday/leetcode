function fib(n: number): number {
    if(n < 2) {
        return n;
    }

    const nums = [0, 1];
    let i = 2;
    while(i <= n) {
        const temp = nums[1];
        nums[1] = nums[0] + nums[1];
        nums[0] = temp;
        i += 1;
    }
    return nums[1];
};