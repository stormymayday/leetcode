type Fn = (...params: any[]) => Promise<any>;

function timeLimit(fn: Fn, t: number): Fn {

    return async function (...args) {

        return new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
                reject("Time Limit Exceeded");
            }, t);
            fn(...args).then((result) => {
                resolve(result);
            }).catch(reject).finally(() => {
                clearTimeout(timeoutId)
            });

        });

    }
};

/**
 * const limited = timeLimit((t) => new Promise(res => setTimeout(res, t)), 100);
 * limited(150).catch(console.log) // "Time Limit Exceeded" at t=100ms
 */