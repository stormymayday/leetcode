function checkIfExist(arr: number[]): boolean {

    const n = arr.length;
    
    for(let i = 0; i < n; i += 1) {

        for(let j = 0; j < n; j += 1) {

            if(i !== j && arr[i] === (arr[j] * 2)) {
                return true;
            }

        }

    }

    return false;

};