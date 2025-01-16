type P = Promise<number>

function mergeResults(res1: number, res2: number): number {
    try {
        if (typeof res1 === 'number' && typeof res2 === 'number') {
            return res1 + res2;
        }
        throw ('Unsupported data types');
    } catch {
        throw ('Unsupported data types');
    }
}

async function addTwoPromises(promise1: P, promise2: P): P {

    // let unresolved = 2;
    // let res1;
    // let res2;

    return new Promise((resolve, reject) => {

        let unresolved = 2;
        let res1;
        let res2;

        function helper() {
            if (unresolved === 0) {
                resolve(mergeResults(res1, res2));
            }
        }

        promise1.then((result) => {
            res1 = result;
            unresolved--;
            helper();
        }).catch(reject);

        promise2.then((result) => {
            res2 = result;
            unresolved--;
            helper();
        }).catch(reject);

    });

};

/**
 * addTwoPromises(Promise.resolve(2), Promise.resolve(2))
 *   .then(console.log); // 4
 */