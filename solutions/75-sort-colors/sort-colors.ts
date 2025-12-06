/**
 Do not return anything, modify nums in-place instead.
 */
function sortColors(nums: number[]): void {

    const pivot = 1;

    let left = 0;
    let mid = 0;
    let right = nums.length - 1;
    while (mid <= right) {

        // Checking if value at mid is less than pivot
        if (nums[mid] < pivot) {
            swap(nums, left, mid);
            left += 1;
            mid += 1;

        }
        // Checking if value at mid is greater than pivot
        else if (nums[mid] > pivot) {
            swap(nums, right, mid);
            right -= 1;
            // Edge Case: don't advance the 'mid' pointer if swapped with 'right'!
            // Otherwise, if mid moves after swap, 'one' can remain inthe 'zeroes' partition!
            // mid += 1;
        }
        // otherwise, advance 'mid'
        else {
            mid += 1;
        }

    }

};

function swap(arr: number[], i: number, j: number): void {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}