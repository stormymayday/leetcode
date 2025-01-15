type MultiDimensionalArray = (number | MultiDimensionalArray)[];

var flat = function (arr: MultiDimensionalArray, n: number): MultiDimensionalArray {

    const result = [];

    function helper(arr, depth) {

        for (let i = 0; i < arr.length; i++) {

            if (Array.isArray(arr[i]) && depth !== 0) {
                helper(arr[i], depth - 1);
            } else {
                result.push(arr[i]);
            }

        }

        return result;

    }

    return helper(arr, n);

};