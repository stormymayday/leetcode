function debounce<F extends (...args: any[]) => void> (
    fn: F,
    delay: number
): (...args: Parameters<F>) => void {

    let timerId: ReturnType<typeof setTimeout> | null = null;
    
    return function(this: unknown, ...args: Parameters<F>) {

        if(timerId !== null) {
            clearTimeout(timerId);
        }

        timerId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
        
    }
};

/**
 * const log = debounce(console.log, 100);
 * log('Hello'); // cancelled
 * log('Hello'); // cancelled
 * log('Hello'); // Logged at t=100ms
 */