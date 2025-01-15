type MultiDimensionalArray = (number | MultiDimensionalArray)[];

var flat = function (arr:  MultiDimensionalArray, n: number):  MultiDimensionalArray {
    
    const flatArray = [];

    function helper(array, depth) {

        for(let i = 0; i < array.length; i++) {
            if(Array.isArray(array[i]) && depth !== 0) {
                helper(array[i], depth - 1);
            } else {
                flatArray.push(array[i]);
            }
        }

        return flatArray;
    }

    return helper(arr, n);

};