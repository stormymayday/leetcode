type MultiDimensionalArray = (number | MultiDimensionalArray)[];

var flat = function (arr:  MultiDimensionalArray, n: number):  MultiDimensionalArray {
    
    const res: MultiDimensionalArray = [];

    function helper(arr: MultiDimensionalArray, depth: number): void {

        for(let i = 0; i < arr.length; i += 1) {

            const curr = arr[i];

            if(Array.isArray(curr) && depth > 0) {
                helper(curr, depth - 1);
            } else {
                res.push(curr);
            }

        }

    }

    helper(arr, n);

    return res;

};