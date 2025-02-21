function merge(arr1: number[], arr2: number[]): number[] {

    const result = [];

    let i = 0;
    let j = 0;

    while(i < arr1.length && j < arr2.length) {

        if(arr1[i] < arr2[j]) {

            result.push(arr1[i]);
            i++;

        } else {

            result.push(arr2[j]);
            j++;

        }

    }

    while(i < arr1.length) {
        result.push(arr1[i]);
        i++;
    }

    while(j < arr2.length) {
        result.push(arr2[j]);
        j++;
    }


    return result;

}

function sortArray(nums: number[]): number[] {

    if(nums.length <= 1) {
        return nums;
    }
    
    let middle = Math.floor(nums.length/2);
    let left = sortArray(nums.slice(0, middle));
    let right = sortArray(nums.slice(middle));

    return merge(left, right);
    
};