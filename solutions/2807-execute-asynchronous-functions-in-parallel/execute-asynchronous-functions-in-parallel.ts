type Fn<T> = () => Promise<T>

function promiseAll<T>(functions: Fn<T>[]): Promise<T[]> {

    return new Promise((resolve, reject) => {

        let unresolved = functions.length;
        const results = new Array(functions.length);

        if(unresolved === 0) {
            resolve(results);
            return;
        }

        functions.forEach((fn, index) => {

            fn().then((result) => {

                results[index] = result;
                unresolved--;
                if(unresolved === 0) {
                    resolve(results);
                }

            }).catch(reject);

        })

    });
    
};

/**
 * const promise = promiseAll([() => new Promise(res => res(42))])
 * promise.then(console.log); // [42]
 */