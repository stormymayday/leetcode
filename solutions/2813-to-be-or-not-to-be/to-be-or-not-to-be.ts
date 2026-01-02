type ToBeOrNotToBe = {
    toBe: (val: any) => boolean;
    notToBe: (val: any) => boolean;
};

function expect(val: any): ToBeOrNotToBe {
    return {
        toBe (another: any): boolean {
            if(another === val) {
                return true;
            } else {
                throw new Error('Not Equal');
            }
        },
        notToBe (another: any): boolean {
            if(another !== val) {
                return true;
            } else {
                throw new Error('Equal');
            }
        }
    }
};

/**
 * expect(5).toBe(5); // true
 * expect(5).notToBe(5); // throws "Equal"
 */