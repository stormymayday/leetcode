/**
 Do not return anything, modify s in-place instead.
 */
function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
function reverseString(s: string[]): void {

    function helper(left, right) {
        // Base Case
        if(left >= right) {
            return;
        }
        // Otherwise, we shall recurse:
        // 1. swap
        swap(s, left, right);
        // 2. recurse call
        helper(left + 1, right - 1);
    }

    
    helper(0, s.length - 1);
    
};