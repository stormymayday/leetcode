class Logger {

    messages: Map<string, number>;

    constructor() {
        
        this.messages = new Map<string, number>();

    }

    shouldPrintMessage(timestamp: number, message: string): boolean {

        if(!this.messages.has(message) || this.messages.get(message) <= timestamp) {

            this.messages.set(message, timestamp + 10);
            return true;

        }

        return false;
        
    }
}

/**
 * Your Logger object will be instantiated and called as such:
 * var obj = new Logger()
 * var param_1 = obj.shouldPrintMessage(timestamp,message)
 */