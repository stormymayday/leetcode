type Fn = (n: number, i: number) => any

function filter(arr: number[], fn: Fn): number[] {

    const newArr: number[] = [];

    for(let i = 0; i < arr.length; i++) {
        if(fn(arr[i], i)) {
            newArr.push(arr[i]);
        }
    }

    return newArr;
    
};