type Fn = (...params: number[]) => number

function memoize(fn: Fn): Fn {

    const cache = {};
    
    return function(...args) {

        // const key = JSON.stringify(args);
        const key = `${fn.name}:${args}`;

        if(key in cache) {
            return cache[key];
        } else {
            const result = fn(...args);
            cache[key] = result;
            return result;
        }
        
    }
}


/** 
 * let callCount = 0;
 * const memoizedFn = memoize(function (a, b) {
 *	 callCount += 1;
 *   return a + b;
 * })
 * memoizedFn(2, 3) // 5
 * memoizedFn(2, 3) // 5
 * console.log(callCount) // 1 
 */