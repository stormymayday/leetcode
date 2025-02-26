/**
 Do not return anything, modify s in-place instead.
 */
function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function reverseString(s: string[]): void {

    function reverse(left, right) {
        if(left < right) {
            swap(s, left, right)
            reverse(left + 1, right - 1);
        }
    }

    reverse(0, s.length - 1);

};