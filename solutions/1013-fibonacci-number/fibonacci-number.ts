function fib(n: number): number {

    const memo = { 
        '0': 0,
        '1': 1,
    };

    function f(x: number) {
        if(memo[x] !== undefined) {
            return memo[x];
        } else {
            memo[x] = f(x - 1) + f(x - 2);
            return memo[x];
        }
    }

    return f(n);

};