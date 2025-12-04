/**
 Do not return anything, modify nums in-place instead.
 */
function rotate(nums: number[], k: number): void {

  if(k === nums.length || k === 0) {
    return;
  }

  k = k % nums.length;

  reverse(nums, 0, nums.length - k - 1);
  reverse(nums, nums.length - k, nums.length - 1);
  reverse(nums, 0, nums.length - 1);

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