type MultiDimensionalArray = (number | MultiDimensionalArray)[];

var flat = function (arr:  MultiDimensionalArray, n: number):  MultiDimensionalArray {

    const result = [];

    function recursiveFlatten(arr, depth) {

        for(const element of arr) {

            if(Array.isArray(element) && depth !== 0) {
                recursiveFlatten(element, depth - 1);
            } else {
                result.push(element);
            }

        }

        return result;

    }

    return recursiveFlatten(arr, n);
    
};