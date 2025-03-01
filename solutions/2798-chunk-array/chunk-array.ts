type JSONValue = null | boolean | number | string | JSONValue[] | { [key: string]: JSONValue };
type Obj = Record<string, JSONValue> | Array<JSONValue>;

function chunk(arr: Obj[], size: number): Obj[][] {

    const result = [];
    let chunk = [];

    for(let i = 0; i < arr.length; i++) {
        chunk.push(arr[i]);
        if(chunk.length === size) {
            result.push(chunk);
            chunk = [];
        }
    }

    if(chunk.length > 0) {
        result.push(chunk);
    }

    return result;
    
};
