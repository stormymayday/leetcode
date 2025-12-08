/**
 Do not return anything, modify nums in-place instead.
 */
function nextPermutation(nums: number[]): void {
    
    let swapIdx = -1;

    // 1. Going backwards, looking a smaller element the left of curr
    for(let i = nums.length - 1; i >= 1; i -= 1) {
        if(nums[i] > nums[i - 1]) {
            // this will be swap index 
            swapIdx = i - 1;
            break;
        }

    }

    // Edge Case: if array was strictly in descending order
    if(swapIdx === - 1) {
        // reverse the whole array
        nums.reverse();
        return;
    }

    // Otherwise, we found a swap index

    // 2. Need to find the smallest element greater than one at swap index and swap
    // We can do it going backwards again
    for(let i = nums.length - 1; i > swapIdx; i -= 1) {
        if(nums[i] > nums[swapIdx]) {
            const temp = nums[i];
            nums[i] = nums[swapIdx];
            nums[swapIdx] = temp;
            break;
        }
    }

    // 3. Reverse the array after the swap index
    let left = swapIdx + 1;
    let right = nums.length - 1;
    while(left < right) {
        const temp = nums[left];
        nums[left] = nums[right];
        nums[right] = temp;
        left += 1;
        right -= 1;
    }

};