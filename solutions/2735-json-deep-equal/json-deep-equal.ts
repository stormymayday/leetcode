type JSONValue = null | boolean | number | string | JSONValue[] | { [key: string]: JSONValue };

function areDeeplyEqual(o1: JSONValue, o2: JSONValue): boolean {
    if(Object.is(o1, o2)) {
        return true;
    }

    const bothObjects = Object.prototype.toString.call(o1) === '[object Object]' && Object.prototype.toString.call(o2) === '[object Object]';
    const bothArrays = Array.isArray(o1) && Array.isArray(o2);
    
    if(!bothObjects && !bothArrays) {
        return false;
    }

    // TypeScript needs to know these are objects/arrays after the checks above
    const obj1 = o1 as { [key: string]: JSONValue } | JSONValue[];
    const obj2 = o2 as { [key: string]: JSONValue } | JSONValue[];

    // Check length
    if(Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false;
    }

    // Check keys/values recursively
    for(const key in obj1) {
        if(!areDeeplyEqual(obj1[key], obj2[key])) {
            return false;
        }
    }

    return true;
}