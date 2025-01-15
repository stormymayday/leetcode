type Callback = (...args: any[]) => any;
type Subscription = {
    unsubscribe: () => void
}

class EventEmitter {

    events: Map<string, Callback[]>;

    constructor() {
        this.events = new Map();
    }
    
    subscribe(eventName: string, callback: Callback): Subscription {

        if(!this.events.has(eventName)) {
            this.events.set(eventName, []);
        }

        this.events.get(eventName).push(callback);
        
        return {
            unsubscribe: () => {
                const callbacks = this.events.get(eventName) || []
                this.events.set(eventName,
                    callbacks.filter((cb) => cb !== callback)
                );
            }
        };
    }
    
    emit(eventName: string, args: any[] = []): any[] {
        
        if(!this.events.has(eventName)) {
            return [];
        }

        const result = [];
        this.events.get(eventName).forEach((cb) => {
            result.push(cb(...args));
        });
        return result;

    }
}

/**
 * const emitter = new EventEmitter();
 *
 * // Subscribe to the onClick event with onClickCallback
 * function onClickCallback() { return 99 }
 * const sub = emitter.subscribe('onClick', onClickCallback);
 *
 * emitter.emit('onClick'); // [99]
 * sub.unsubscribe(); // undefined
 * emitter.emit('onClick'); // []
 */