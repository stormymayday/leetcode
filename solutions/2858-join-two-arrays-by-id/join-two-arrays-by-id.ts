type JSONValue = null | boolean | number | string | JSONValue[] | { [key: string]: JSONValue };
type ArrayType = { "id": number } & Record<string, JSONValue>;

function join(arr1: ArrayType[], arr2: ArrayType[]): ArrayType[] {

    const map = new Map();

    for(const element of arr1) {
        map.set(element.id, element);
    }

    for(const element of arr2) {
        if(map.has(element.id)) {
            map.set(element.id, {...map.get(element.id), ...element});
        } else {
            map.set(element.id, element);
        }
    }

    // return sorted array by id
    return [...map.values()].sort((a,b) => a.id - b.id);
    
};