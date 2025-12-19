function replaceElements(arr: number[]): number[] {

    for (let i = 0; i < arr.length - 1; i += 1) {

        let maxRight = -Infinity;

        for (let j = i + 1; j < arr.length; j += 1) {

            maxRight = Math.max(maxRight, arr[j]);

        }

        arr[i] = maxRight;

    }

    arr[arr.length - 1] = -1;

    return arr;

};