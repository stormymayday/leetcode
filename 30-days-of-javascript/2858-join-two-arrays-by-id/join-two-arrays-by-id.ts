type JSONValue = null | boolean | number | string | JSONValue[] | { [key: string]: JSONValue };
type ArrayType = { "id": number } & Record<string, JSONValue>;

function join(arr1: ArrayType[], arr2: ArrayType[]): ArrayType[] {
    
    const map = new Map();

    for(let i = 0; i < arr1.length; i++) {
        map.set(arr1[i].id, arr1[i]);
    }

    for(let i = 0; i < arr2.length; i++) {
        if(map.has(arr2[i].id)) {
            map.set(arr2[i].id, { ...map.get(arr2[i].id), ...arr2[i]});
        } else {
            map.set(arr2[i].id, arr2[i]);
        }
        
    }

    const result = [];
    for(const entry of map.values()) {
        result.push(entry);
    }
    return result.sort((a,b) => a.id - b.id);

};