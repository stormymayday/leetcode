type F = (...args: number[]) => void

function debounce(fn: F, t: number): F {
    
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    return function(this: unknown, ...args: any[]) {
        
        if(timeoutId !== null) {
            clearTimeout(timeoutId);
        }

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