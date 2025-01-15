type JSONValue = null | boolean | number | string | JSONValue[] | { [key: string]: JSONValue };
type Obj = Record<string, JSONValue> | JSONValue[]

function isEmpty(obj: Obj): boolean {

    if(obj == null) {
        return true;
    }

    if(Array.isArray(obj) || typeof obj === 'string') {
        return obj.length === 0;
    }

    if(obj instanceof Map || obj instanceof Set) {
        return obj.size === 0;
    }

    const prototype = Object.getPrototypeOf(obj);
    if(prototype === null || prototype === Object.prototype) {
        return Object.keys(obj).length === 0;
    }

    return true;
    
};