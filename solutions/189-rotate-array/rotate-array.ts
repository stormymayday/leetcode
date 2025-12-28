/**
 Do not return anything, modify nums in-place instead.
 */
function rotate(nums: number[], k: number): void {
    
    const n = nums.length;
    k = k % n;

    if(n === 1 || k === 0) {
        return;
    }

    // Note: indices are inclusive
    reverse(nums, 0, n - k - 1);
    reverse(nums, n - k, n - 1);
    reverse(nums, 0, n - 1);

};

function reverse(arr: number[], left: number, right: number): void {
    while(left < right) {
        const temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;
        left += 1;
        right -= 1;
    }
}