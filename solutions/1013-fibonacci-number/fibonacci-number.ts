function memoize(fn: Function) {
    const cache: Record<string, number> = {};
    return function(...args: number[]) {
        const key = args.join(',');
        if(cache[key] !== undefined) {
            return cache[key];
        } else {
            const result = fn.apply(this, args);
            cache[key] = result;
            return result;
        }
    }
}

const fib = memoize(function fib(n: number) {
    if (n < 2) {
        return n;
    }
    return fib(n - 1) + fib(n - 2);
});