type Callback = (...args: any[]) => any;
type Subscription = {
    unsubscribe: () => void
}

class EventEmitter {

    events: Map<string, Set<Callback>>;

    constructor() {
        this.events = new Map();
    }
    
    subscribe(eventName: string, callback: Callback): Subscription {
        
        if(!this.events.has(eventName)) {
            this.events.set(eventName, new Set());
        }

        this.events.get(eventName).add(callback);

        return {
            unsubscribe: () => {
                this.events.get(eventName).delete(callback);
            }
        };
    }
    
    emit(eventName: string, args: any[] = []): any[] {
        if(!this.events.get(eventName)) {
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