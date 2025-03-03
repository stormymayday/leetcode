function merge(arr1, arr2) {
    const result = [];

    let i = 0;
    let j = 0;

    while(i < arr1.length && j < arr2.length) {
        if(arr1[i] < arr2[j]) {
            result.push(arr1[i]);
            i++;
        } else {
            result.push(arr2[j]);
            j++
        }
    }

    while(i < arr1.length) {
        result.push(arr1[i]);
        i++;
    }

    while(j < arr2.length) {
        result.push(arr2[j]);
        j++
    }

    return result;
}
function sortArray(nums: number[]): number[] {

    if(nums.length <= 1) {
        return nums;
    }

    const mid = Math.floor(nums.length / 2);
    const left = sortArray(nums.slice(0, mid));
    const right = sortArray(nums.slice(mid));

    return merge(left, right);
    
};