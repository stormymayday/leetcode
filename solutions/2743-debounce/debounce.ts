type F = (...args: number[]) => void

function debounce(fn: F, t: number): F {

    let intervalId;

    return function (...args) {

        const lastCall = Date.now();

        clearInterval(intervalId)

        intervalId = setInterval(() => {

            if (Date.now() - lastCall >= t) {
                // fn.call(this, ...args);
                fn.apply(this, args);
                clearInterval(intervalId);
            }

        }, 1);

    }
};

/**
 * const log = debounce(console.log, 100);
 * log('Hello'); // cancelled
 * log('Hello'); // cancelled
 * log('Hello'); // Logged at t=100ms
 */