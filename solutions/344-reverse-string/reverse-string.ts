/**
 Do not return anything, modify s in-place instead.
 */
function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
function reverseString(s: string[]): void {

    let left = 0;
    let right = s.length - 1;

    while(left < right) {
        swap(s, left, right);
        left++;
        right--;
    }
    
};