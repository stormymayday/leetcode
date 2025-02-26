/**
 Do not return anything, modify nums in-place instead.
 */
function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
function reverse(arr, i, j) {
    while(i < j) {
        swap(arr, i, j);
        i++;
        j--;
    }
}
function rotate(nums: number[], k: number): void {

    const pivotPoint = k % nums.length;

    // reverse array
    reverse(nums, 0, nums.length - 1);

    // reverse left (up to pivot point EXCLUDING)
    reverse(nums, 0, pivotPoint - 1);

    // reverse right (from pivot INCLUDING to the end)
    reverse(nums, pivotPoint, nums.length - 1);
    
};