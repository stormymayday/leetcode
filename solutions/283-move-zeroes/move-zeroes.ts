/**
 Do not return anything, modify nums in-place instead.
 */
function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
function moveZeroes(nums: number[]): void {

    let left = 0;

    for(let right = 0; right < nums.length; right++) {
        // if not zero
        if(nums[right] !== 0) {
            // swap
            swap(nums, left, right);
            // increment left
            left++;
        }

    }
    
};