interface ToBeOrNotToBe {
    toBe: (val: any) => boolean;
    notToBe: (val: any) => boolean;
};

function expect(value: any): ToBeOrNotToBe {

    return {
        toBe(val: any): boolean {
            if (val === value) {
                return true;
            } else {
                throw new Error('Not Equal');
            }
        },
        notToBe(val: any): boolean {
            if (val !== value) {
                return true;
            } else {
                throw new Error('Equal');
            }
        },
    };
    
};

/**
 * expect(5).toBe(5); // true
 * expect(5).notToBe(5); // throws "Equal"
 */