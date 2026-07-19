type F = (...args: number[]) => void

function debounce(fn: F, t: number): F {

    let id = null;
    
    return function(this, ...args) {

        if(id !== null) clearTimeout(id);

        id = setTimeout(() => {
            fn.apply(this, args);
        }, t);
        
    }
};

/**
 * const log = debounce(console.log, 100);
 * log('Hello'); // cancelled
 * log('Hello'); // cancelled
 * log('Hello'); // Logged at t=100ms
 */