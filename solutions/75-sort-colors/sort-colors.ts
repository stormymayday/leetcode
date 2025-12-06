/**
 Do not return anything, modify nums in-place instead.
 */
function sortColors(nums: number[]): void {

    const pivot = 1;

    let left = 0;
    let mid = 0;
    let right = nums.length - 1;
    while (mid <= right) {

        // if (nums[left] >= pivot && nums[mid] < pivot) {
        if (nums[mid] < pivot) {
            swap(nums, left, mid);
            left += 1;
            mid += 1;
        // } else if (nums[right] <= pivot && nums[mid] > pivot) {
        } else if (nums[mid] > pivot) {
            swap(nums, right, mid);
            right -= 1;
            // mid -= 1;
        } else {
            mid += 1;
        }

    }

};

function swap(arr: number[], i: number, j: number): void {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}