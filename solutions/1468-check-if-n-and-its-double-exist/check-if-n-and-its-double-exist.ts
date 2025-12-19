function checkIfExist(arr: number[]): boolean {

    const n = arr.length;

    const set = new Set<number>();
    
    for(let i = 0; i < n; i += 1) {
        if(set.has(arr[i] * 2) || set.has(arr[i] / 2)) {
            return true;
        }
        set.add(arr[i]);
    }

    return false;

};