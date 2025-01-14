type ToBeOrNotToBe = {
    toBe: (val: any) => boolean;
    notToBe: (val: any) => boolean;
};

function expect(val: any): ToBeOrNotToBe {

    return {
    toBe(value: any) {
        if(value === val) {
            return true;
        } else {
            throw new Error("Not Equal");
        }
    },
    notToBe(value: any) {
        if(value !== val) {
            return true;
        } else {
            throw new Error("Equal");
        }
    },
};
    
};

/**
 * expect(5).toBe(5); // true
 * expect(5).notToBe(5); // throws "Equal"
 */