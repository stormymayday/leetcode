type JSONValue = null | boolean | number | string | JSONValue[] | { [key: string]: JSONValue };

function jsonStringify(object: JSONValue): string {
    
    // Arrays
    if(Array.isArray(object)) {
        const arrayElements = object.map((element) => jsonStringify(element));
        return `[${arrayElements.join(',')}]`;
    }

    // Plain Objects
    if(typeof object === 'object' && object !== null) {
        const objectEntries = Object.entries(object).map(([key, value]) => {
            return `"${key}":${jsonStringify(value)}`;
        });
        return `{${objectEntries.join(',')}}`;
    }

    // Strings
    if(typeof object === 'string') {
        return `"${object}"`;
    }

    // nulls, booleans, numbers
    return String(object);
}