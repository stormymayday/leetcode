type F = (...args: number[]) => void

function debounce(fn: F, t: number): F {

    let timeoutId;

    return function (...args) {

        clearTimeout(timeoutId)

        timeoutId = setTimeout(() => {
            // fn.apply(this, args);
            fn.call(this, ...args);
        }, t);

    }
};

/**
 * const log = debounce(console.log, 100);
 * log('Hello'); // cancelled
 * log('Hello'); // cancelled
 * log('Hello'); // Logged at t=100ms
 */