type P = Promise<number>

async function addTwoPromises(promise1: P, promise2: P): P {

    return new Promise((resolve, reject) => {

        let unresolved = 2;
        let res1: number;
        let res2: number;

        if(unresolved === 0) {
            resolve(res1 + res2);
        }

        promise1.then((result) => {
            res1 = result;
            unresolved--;
            if(unresolved === 0) {
                resolve(res1 + res2);
            }
        }).catch(reject);

        promise2.then((result) => {
            res2 = result;
            unresolved--;
            if(unresolved === 0) {
                resolve(res1 + res2);
            }
        }).catch(reject);

    });
};

/**
 * addTwoPromises(Promise.resolve(2), Promise.resolve(2))
 *   .then(console.log); // 4
 */