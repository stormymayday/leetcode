type F = () => Promise<any>;

async function promisePool(functions: F[], n: number): Promise<any> {
    
    let index = 0;

    const startNextPromise = async () => {
        if(index < functions.length) {
            await functions[index++]();
            return startNextPromise();
        }
    };

    const tasks = [];

    for(let i = 0; i < n && i < functions.length; i++) {
        tasks.push(startNextPromise());
    }

    await Promise.all(tasks);

};

/**
 * const sleep = (t) => new Promise(res => setTimeout(res, t));
 * promisePool([() => sleep(500), () => sleep(400)], 1)
 *   .then(console.log) // After 900ms
 */