type TType =
  | 'null'
  | 'undefined'
  | 'string'
  | 'number'
  | 'boolean'
  | 'symbol'
  | 'bigint'
  | 'object'
  | 'array'
  | 'function'
  | 'date'
  | 'regexp'
  | 'map'
  | 'set'
  | 'weakmap'
  | 'weakset'
  | 'error'
  | 'promise'
  | 'arraybuffer'
  | string

function getType(data: any): TType {
    if(data === null) return 'null';
    if(data === undefined) return 'undefined';

    const proto = Object.getPrototypeOf(data);

    if(proto === null) return 'null';

    return proto.constructor.name.toLowerCase();
}


type JSONValue = null | boolean | number | string | JSONValue[] | { [key: string]: JSONValue };

function areDeeplyEqual(a: JSONValue, b: JSONValue): boolean {

    if(a === b) return true;

    const [typeA, typeB] = [getType(a), getType(b)];

    if(typeA !== typeB) return false;

    if(typeA !== 'object' && typeA !== 'array') return a === b;

    const [keysA, keysB] = [Object.keys(a), Object.keys(b)];

    if(keysA.length !== keysB.length) return false;

    for(const key of keysA) {
        if(
            !Object.prototype.hasOwnProperty.call(b, key) ||
            !areDeeplyEqual(a[key], b[key])
        ) {
            return false;
        }
    }
    
    return true;
};